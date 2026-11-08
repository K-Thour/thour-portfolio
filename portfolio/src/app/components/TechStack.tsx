import React, { useRef, useEffect, useState, useMemo, useContext } from 'react';
import { motion, useInView, useReducedMotion, useReducedMotionConfig } from 'motion/react';
import { AlertTriangle, RefreshCw } from 'lucide-react';
import { ThemeContext } from '../context/ThemeContext';
import { fetchTechnologies } from '../../services/api';
import { TechStackSkeleton } from './ui/skeleton';

export interface Technology {
  name: string;
  category: string;
  iconUrl?: string | null;
}

const SMOOTH_EASE = [0.22, 1, 0.36, 1] as const;

interface TechCardProps {
  tech: Technology;
  isDark: boolean;
  shouldReduceMotion: boolean;
}

export function CinematicTechCard({ tech, isDark, shouldReduceMotion }: TechCardProps) {
  const [imgError, setImgError] = useState(false);

  return (
    <motion.div
      whileHover={shouldReduceMotion ? undefined : { y: -3, scale: 1.02 }}
      whileTap={shouldReduceMotion ? undefined : { scale: 0.98 }}
      transition={{ type: 'spring', bounce: 0, duration: 0.35 }}
      className={`relative flex-shrink-0 w-56 sm:w-64 p-4 sm:p-5 rounded-2xl border backdrop-blur-xl backdrop-saturate-[180%] transition-colors flex flex-col justify-between min-h-[140px] cursor-default select-none ${
        isDark
          ? 'bg-slate-900/60 border-white/[0.08] hover:border-white/20 shadow-lg shadow-black/20 hover:shadow-red-500/10'
          : 'bg-white/80 border-black/[0.06] hover:border-black/15 shadow-md shadow-blue-500/5 hover:shadow-blue-500/15'
      }`}
    >
      {/* Top hairline light-catcher */}
      <div
        className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-white/20 to-transparent pointer-events-none"
        aria-hidden="true"
      />

      {/* Header: Icon & Category Badge */}
      <div className="flex items-center justify-between gap-3 mb-3">
        {tech.iconUrl && !imgError ? (
          <img
            src={tech.iconUrl}
            alt={tech.name}
            onError={() => setImgError(true)}
            className="w-10 h-10 object-contain rounded-xl shrink-0"
          />
        ) : (
          <div
            data-testid={`tech-monogram-${tech.name.toLowerCase().replace(/\s+/g, '-')}`}
            className={`w-10 h-10 rounded-xl flex items-center justify-center font-bold text-sm tracking-wider uppercase border shrink-0 ${
              isDark
                ? 'bg-red-500/15 text-red-400 border-red-500/30'
                : 'bg-blue-100 text-blue-600 border-blue-200'
            }`}
          >
            {tech.name.trim().slice(0, 2).toUpperCase()}
          </div>
        )}

        <span
          className={`text-[11px] font-medium px-2.5 py-1 rounded-full border truncate max-w-[120px] ${
            isDark
              ? 'bg-white/5 border-white/10 text-gray-400'
              : 'bg-black/5 border-black/10 text-gray-600'
          }`}
        >
          {tech.category}
        </span>
      </div>

      {/* Body: Tech Name & Domain Indicator */}
      <div>
        <h3
          className={`font-bold text-base sm:text-lg tracking-tight leading-snug ${
            isDark ? 'text-white' : 'text-gray-900'
          }`}
        >
          {tech.name}
        </h3>
        <span
          className={`text-xs mt-1 flex items-center gap-1.5 ${
            isDark ? 'text-gray-400' : 'text-gray-500'
          }`}
        >
          <span
            className={`w-1.5 h-1.5 rounded-full shrink-0 ${
              isDark ? 'bg-red-500' : 'bg-blue-500'
            }`}
            aria-hidden="true"
          />
          {tech.category}
        </span>
      </div>
    </motion.div>
  );
}

export function TechStack() {
  const [technologies, setTechnologies] = useState<Technology[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);
  const [activeCategory, setActiveCategory] = useState<string>('All');

  const ref = useRef<HTMLDivElement>(null);
  const tabsRef = useRef<(HTMLButtonElement | null)[]>([]);
  const isInView = useInView(ref, { once: true, amount: 0.15 });

  const themeContext = useContext(ThemeContext);
  const isDark = themeContext ? themeContext.theme === 'avengers' : true;

  const motionReducedConfig = useReducedMotionConfig();
  const motionReducedDevice = useReducedMotion();
  const shouldReduceMotion = Boolean(
    motionReducedConfig === true ||
      (motionReducedConfig !== false && motionReducedDevice),
  );

  const loadData = async () => {
    setLoading(true);
    setError(false);
    try {
      const data = await fetchTechnologies();
      const mapped: Technology[] = (data || []).map((t: any) => ({
        name: (t.name || t.technology || 'Unknown').trim(),
        category: (t.category || 'Tool').trim(),
        iconUrl:
          t.iconUrl?.url || (typeof t.iconUrl === 'string' ? t.iconUrl : null),
      }));
      if (mapped.length === 0) {
        setError(true);
      } else {
        setTechnologies(mapped);
      }
    } catch (e) {
      console.error('Failed to fetch technologies:', e);
      setError(true);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadData();
  }, []);

  // Dynamically extract categories from fetched technologies
  const categories = useMemo(() => {
    const set = new Set<string>();
    technologies.forEach((t) => {
      if (t.category && t.category.trim()) {
        set.add(t.category.trim());
      }
    });
    return ['All', ...Array.from(set)];
  }, [technologies]);

  // Reset to 'All' if active category no longer exists in fetched list
  useEffect(() => {
    if (activeCategory !== 'All' && !categories.includes(activeCategory)) {
      setActiveCategory('All');
    }
  }, [categories, activeCategory]);

  // Filtered technologies based on active category
  const filteredTechnologies = useMemo(() => {
    if (activeCategory === 'All') return technologies;
    return technologies.filter(
      (t) => t.category.toLowerCase() === activeCategory.toLowerCase(),
    );
  }, [technologies, activeCategory]);

  // Ensure minimum items for seamless looping in marquee rows
  const marqueeItemsRow1 = useMemo(() => {
    if (filteredTechnologies.length === 0) return [];
    // If >= 4 items, take alternating items for Row 1
    const baseItems =
      filteredTechnologies.length >= 4
        ? filteredTechnologies.filter((_, i) => i % 2 === 0)
        : filteredTechnologies;
    const minItems = 6;
    const repeatCount = Math.ceil(minItems / baseItems.length);
    const items: Technology[] = [];
    for (let r = 0; r < repeatCount; r++) {
      items.push(...baseItems);
    }
    return items;
  }, [filteredTechnologies]);

  const marqueeItemsRow2 = useMemo(() => {
    if (filteredTechnologies.length === 0) return [];
    // If >= 4 items, take alternating items for Row 2
    const baseItems =
      filteredTechnologies.length >= 4
        ? filteredTechnologies.filter((_, i) => i % 2 !== 0)
        : filteredTechnologies;
    const minItems = 6;
    const repeatCount = Math.ceil(minItems / baseItems.length);
    const items: Technology[] = [];
    for (let r = 0; r < repeatCount; r++) {
      items.push(...baseItems);
    }
    return items;
  }, [filteredTechnologies]);

  // Keyboard navigation for ARIA tablist
  const handleTabKeyDown = (e: React.KeyboardEvent, index: number) => {
    let nextIndex = index;
    if (e.key === 'ArrowRight') {
      nextIndex = (index + 1) % categories.length;
    } else if (e.key === 'ArrowLeft') {
      nextIndex = (index - 1 + categories.length) % categories.length;
    } else if (e.key === 'Home') {
      nextIndex = 0;
    } else if (e.key === 'End') {
      nextIndex = categories.length - 1;
    } else {
      return;
    }

    e.preventDefault();
    setActiveCategory(categories[nextIndex]);
    tabsRef.current[nextIndex]?.focus();
  };

  return (
    <section
      aria-label="Technologies and tools"
      className={`py-20 relative overflow-hidden transition-colors duration-500 ${
        isDark ? 'bg-slate-950/50' : 'bg-gradient-to-br from-white to-blue-50'
      }`}
    >
      <div className="container mx-auto px-4 sm:px-6">
        <motion.div
          ref={ref}
          initial={{ opacity: 0, y: shouldReduceMotion ? 0 : 15 }}
          animate={
            isInView
              ? { opacity: 1, y: 0 }
              : { opacity: 0, y: shouldReduceMotion ? 0 : 15 }
          }
          transition={
            shouldReduceMotion
              ? { duration: 0.15 }
              : { duration: 0.5, ease: SMOOTH_EASE }
          }
          className="max-w-6xl mx-auto"
        >
          {/* Section Header */}
          <div className="text-center mb-10">
            <motion.span
              initial={{ opacity: 0 }}
              animate={isInView ? { opacity: 1 } : { opacity: 0 }}
              transition={{ duration: 0.4, delay: 0.05 }}
              className={`text-xs font-semibold tracking-widest uppercase mb-3 block ${
                isDark ? 'text-red-500' : 'text-blue-600'
              }`}
            >
              {isDark ? 'ARSENAL' : 'TOOLS'}
            </motion.span>
            <motion.h2
              initial={{ opacity: 0, y: shouldReduceMotion ? 0 : 8 }}
              animate={
                isInView
                  ? { opacity: 1, y: 0 }
                  : { opacity: 0, y: shouldReduceMotion ? 0 : 8 }
              }
              transition={
                shouldReduceMotion
                  ? { duration: 0.15 }
                  : { duration: 0.5, delay: 0.1, ease: SMOOTH_EASE }
              }
              className={`text-3xl sm:text-4xl font-bold tracking-tight mb-3 ${
                isDark ? 'text-white' : 'text-gray-900'
              }`}
            >
              {isDark ? 'Tech Arsenal' : 'Weapons of Choice'}
            </motion.h2>
            <motion.p
              initial={{ opacity: 0 }}
              animate={isInView ? { opacity: 1 } : { opacity: 0 }}
              transition={{ duration: 0.4, delay: 0.15 }}
              className={`text-sm sm:text-base ${isDark ? 'text-gray-400' : 'text-gray-600'}`}
            >
              Technologies and tools I work with on a daily basis
            </motion.p>
          </div>

          {/* Category Filter Pills (WAI-ARIA Tablist) */}
          {!loading && !error && technologies.length > 0 && (
            <div className="flex items-center justify-center mb-8">
              <div
                role="tablist"
                aria-label="Technology categories"
                className={`p-1.5 rounded-full inline-flex flex-wrap items-center justify-center gap-1.5 backdrop-blur-xl backdrop-saturate-[180%] border ${
                  isDark
                    ? 'bg-slate-900/60 border-white/10'
                    : 'bg-white/70 border-black/10 shadow-sm'
                }`}
              >
                {categories.map((category, index) => {
                  const isActive = category === activeCategory;
                  const tabId = `tech-tab-${category.toLowerCase().replace(/\s+/g, '-')}`;

                  return (
                    <button
                      key={category}
                      ref={(el) => {
                        tabsRef.current[index] = el;
                      }}
                      type="button"
                      role="tab"
                      id={tabId}
                      aria-selected={isActive}
                      aria-controls="tech-display-panel"
                      tabIndex={isActive ? 0 : -1}
                      onClick={() => setActiveCategory(category)}
                      onKeyDown={(e) => handleTabKeyDown(e, index)}
                      className={`relative min-h-[44px] min-w-[44px] px-4 py-2 rounded-full text-xs sm:text-sm font-semibold transition-colors cursor-pointer select-none flex items-center justify-center focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-blue-500 dark:focus-visible:ring-red-500 ${
                        isActive
                          ? 'text-white'
                          : isDark
                            ? 'text-gray-400 hover:text-white'
                            : 'text-gray-600 hover:text-gray-900'
                      }`}
                    >
                      {isActive && (
                        <motion.span
                          layoutId="activeTechCategory"
                          transition={
                            shouldReduceMotion
                              ? { duration: 0 }
                              : { type: 'spring', bounce: 0, duration: 0.35 }
                          }
                          className={`absolute inset-0 rounded-full ${
                            isDark
                              ? 'bg-red-600 shadow-md shadow-red-600/30'
                              : 'bg-blue-600 shadow-md shadow-blue-600/20'
                          }`}
                        />
                      )}
                      <span className="relative z-10">{category}</span>
                    </button>
                  );
                })}
              </div>
            </div>
          )}

          {/* Loading Skeleton */}
          {loading && <TechStackSkeleton mode="marquee" isDark={isDark} />}

          {/* Error State */}
          {!loading && error && (
            <motion.div
              role="alert"
              aria-live="assertive"
              initial={{ opacity: 0, y: shouldReduceMotion ? 0 : 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4 }}
              className={`flex flex-col items-center justify-center gap-4 py-14 rounded-2xl border backdrop-blur-xl backdrop-saturate-[180%] ${
                isDark
                  ? 'bg-slate-800/40 border-red-500/20 text-slate-300'
                  : 'bg-white/70 border-red-300/40 text-gray-700'
              }`}
            >
              <AlertTriangle
                className={`w-8 h-8 ${isDark ? 'text-red-500' : 'text-red-600'}`}
                aria-hidden="true"
              />
              <p className="text-sm font-medium">
                Failed to load technologies. Please try again.
              </p>
              <motion.button
                type="button"
                whileHover={shouldReduceMotion ? undefined : { scale: 1.02 }}
                whileTap={shouldReduceMotion ? undefined : { scale: 0.97 }}
                onClick={loadData}
                aria-label="Retry loading technologies"
                className={`min-h-[44px] min-w-[44px] flex items-center gap-2 px-6 py-2.5 rounded-xl text-sm font-semibold transition-colors cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-blue-500 dark:focus-visible:ring-red-500 ${
                  isDark
                    ? 'bg-red-600 hover:bg-red-500 text-white shadow-lg shadow-red-600/30'
                    : 'bg-blue-600 hover:bg-blue-500 text-white shadow-md shadow-blue-600/20'
                }`}
              >
                <RefreshCw className="w-4 h-4" />
                Retry
              </motion.button>
            </motion.div>
          )}

          {/* Cinematic Marquee Stream Display */}
          {!loading && !error && (
            <div
              id="tech-display-panel"
              role="tabpanel"
              aria-labelledby={`tech-tab-${activeCategory.toLowerCase().replace(/\s+/g, '-')}`}
              tabIndex={0}
              className="focus:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-blue-500 dark:focus-visible:ring-red-500 rounded-2xl"
            >
              {filteredTechnologies.length === 0 ? (
                <div
                  className={`text-center py-12 rounded-2xl border backdrop-blur-xl backdrop-saturate-[180%] ${
                    isDark
                      ? 'bg-slate-800/40 border-white/10 text-gray-400'
                      : 'bg-white/70 border-black/10 text-gray-600'
                  }`}
                >
                  <p className="text-sm font-medium">
                    No technologies found in this category.
                  </p>
                </div>
              ) : shouldReduceMotion ? (
                /* Reduced Motion: Clean Accessible Scrollable Grid */
                <div
                  data-testid="tech-marquee-reduced"
                  className="flex gap-4 overflow-x-auto pb-4 scrollbar-thin"
                >
                  {filteredTechnologies.map((tech) => (
                    <CinematicTechCard
                      key={tech.name}
                      tech={tech}
                      isDark={isDark}
                      shouldReduceMotion={shouldReduceMotion}
                    />
                  ))}
                </div>
              ) : (
                /* Cinematic Continuous Stream with Translucent Gradient Edge Masks */
                <div
                  data-testid="tech-marquee-animated"
                  className="relative overflow-hidden py-2 space-y-4 [mask-image:linear-gradient(to_right,transparent,black_6%,black_94%,transparent)] [-webkit-mask-image:linear-gradient(to_right,transparent,black_6%,black_94%,transparent)]"
                >
                  {/* Row 1: Drifting Slowly Left */}
                  <div className="flex gap-4 animate-scroll-slow w-max flex-nowrap will-change-transform hover:[animation-play-state:paused] focus-within:[animation-play-state:paused]">
                    <div className="flex gap-4">
                      {marqueeItemsRow1.map((tech, i) => (
                        <CinematicTechCard
                          key={`row1-${tech.name}-${i}`}
                          tech={tech}
                          isDark={isDark}
                          shouldReduceMotion={shouldReduceMotion}
                        />
                      ))}
                    </div>
                    <div className="flex gap-4" aria-hidden="true">
                      {marqueeItemsRow1.map((tech, i) => (
                        <CinematicTechCard
                          key={`row1-clone-${tech.name}-${i}`}
                          tech={tech}
                          isDark={isDark}
                          shouldReduceMotion={shouldReduceMotion}
                        />
                      ))}
                    </div>
                  </div>

                  {/* Row 2: Drifting Slowly Right (Reverse) if >= 4 items */}
                  {filteredTechnologies.length >= 4 && (
                    <div className="flex gap-4 animate-scroll-reverse-slow w-max flex-nowrap will-change-transform hover:[animation-play-state:paused] focus-within:[animation-play-state:paused]">
                      <div className="flex gap-4">
                        {marqueeItemsRow2.map((tech, i) => (
                          <CinematicTechCard
                            key={`row2-${tech.name}-${i}`}
                            tech={tech}
                            isDark={isDark}
                            shouldReduceMotion={shouldReduceMotion}
                          />
                        ))}
                      </div>
                      <div className="flex gap-4" aria-hidden="true">
                        {marqueeItemsRow2.map((tech, i) => (
                          <CinematicTechCard
                            key={`row2-clone-${tech.name}-${i}`}
                            tech={tech}
                            isDark={isDark}
                            shouldReduceMotion={shouldReduceMotion}
                          />
                        ))}
                      </div>
                    </div>
                  )}
                </div>
              )}
            </div>
          )}
        </motion.div>
      </div>
    </section>
  );
}
