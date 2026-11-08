'use client';

import React, { useState, useMemo, useEffect } from 'react';
import { motion, useReducedMotion } from 'motion/react';
import { LayoutGrid, Repeat } from 'lucide-react';
import { useTheme } from '@/context/ThemeContext';
import { techService } from '@/services/index';

export interface TechnologyItem {
  _id?: string;
  name: string;
  category: string;
  iconUrl?: string | { url: string; publicId?: string } | null;
}

interface TechArsenalProps {
  initialTechnologies?: TechnologyItem[];
}

// Helper to safely extract image URL from string or object
function getTechImageUrl(iconUrl?: string | { url: string } | null): string | null {
  if (!iconUrl) return null;
  if (typeof iconUrl === 'string') return iconUrl.trim() || null;
  if (typeof iconUrl === 'object' && iconUrl.url) return iconUrl.url.trim() || null;
  return null;
}

function BentoTechCard({
  tech,
  isDark,
  shouldReduceMotion,
}: {
  tech: TechnologyItem;
  isDark: boolean;
  shouldReduceMotion: boolean;
}) {
  const [imgError, setImgError] = useState(false);
  const imageUrl = getTechImageUrl(tech.iconUrl);

  return (
    <motion.div
      whileHover={shouldReduceMotion ? undefined : { y: -3, scale: 1.02 }}
      whileTap={shouldReduceMotion ? undefined : { scale: 0.98 }}
      transition={{ type: 'spring', bounce: 0, duration: 0.35 }}
      className={`relative overflow-hidden rounded-2xl p-5 border backdrop-blur-xl backdrop-saturate-[180%] transition-colors flex flex-col justify-between min-h-[150px] cursor-default select-none ${
        isDark
          ? 'bg-slate-800/40 border-white/10 hover:border-white/25 shadow-lg shadow-black/20 hover:shadow-red-500/10'
          : 'bg-white/70 border-black/10 hover:border-black/20 shadow-md shadow-blue-500/5 hover:shadow-blue-500/15'
      }`}
    >
      {/* Top hairline light-catcher matching portfolio */}
      <div
        className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-white/20 to-transparent pointer-events-none"
        aria-hidden="true"
      />

      {/* Header: Icon & Category Badge */}
      <div className="flex items-center justify-between gap-3 mb-4">
        {imageUrl && !imgError ? (
          <img
            src={imageUrl}
            alt={tech.name}
            onError={() => setImgError(true)}
            className="w-10 h-10 object-contain rounded-xl shrink-0 bg-transparent"
          />
        ) : (
          <div
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

function TechPill({
  tech,
  isDark,
  shouldReduceMotion,
}: {
  tech: TechnologyItem;
  isDark: boolean;
  shouldReduceMotion: boolean;
}) {
  const [imgError, setImgError] = useState(false);
  const imageUrl = getTechImageUrl(tech.iconUrl);

  return (
    <motion.div
      whileHover={shouldReduceMotion ? undefined : { scale: 1.05, y: -2 }}
      transition={{ duration: 0.15 }}
      className={`flex-shrink-0 flex items-center gap-3.5 rounded-2xl px-5 py-3 min-w-fit border backdrop-blur-xl backdrop-saturate-[180%] cursor-default select-none ${
        isDark
          ? 'bg-slate-800/60 border-white/10 hover:border-white/20 shadow-md'
          : 'bg-white/80 border-black/10 hover:border-black/20 shadow-sm'
      }`}
    >
      {imageUrl && !imgError ? (
        <img
          src={imageUrl}
          alt={tech.name}
          onError={() => setImgError(true)}
          className="w-8 h-8 object-contain rounded-lg shrink-0"
        />
      ) : (
        <div
          className={`w-8 h-8 rounded-lg flex items-center justify-center font-bold text-xs shrink-0 ${
            isDark ? 'bg-red-500/20 text-red-400' : 'bg-blue-100 text-blue-600'
          }`}
        >
          {tech.name.trim().slice(0, 2).toUpperCase()}
        </div>
      )}

      <div className="flex flex-col">
        <span
          className={`font-semibold text-sm leading-tight ${
            isDark ? 'text-white' : 'text-gray-900'
          }`}
        >
          {tech.name}
        </span>
        <span
          className={`text-xs mt-0.5 leading-none ${
            isDark ? 'text-gray-400' : 'text-gray-500'
          }`}
        >
          {tech.category}
        </span>
      </div>
    </motion.div>
  );
}

export function TechArsenal({ initialTechnologies = [] }: TechArsenalProps) {
  const [technologies, setTechnologies] = useState<TechnologyItem[]>(initialTechnologies);
  const [activeCategory, setActiveCategory] = useState<string>('All');
  const [viewMode, setViewMode] = useState<'grid' | 'marquee'>('grid');

  const { theme } = useTheme();
  const isDark = theme === 'avengers';
  const shouldReduceMotion = useReducedMotion() ?? false;

  useEffect(() => {
    if (initialTechnologies.length === 0) {
      techService.getTechnologies().then((data) => {
        if (Array.isArray(data) && data.length > 0) {
          setTechnologies(data as TechnologyItem[]);
        }
      });
    }
  }, [initialTechnologies]);

  // Extract categories dynamically
  const categories = useMemo(() => {
    const set = new Set<string>();
    technologies.forEach((t) => {
      if (t.category && t.category.trim()) {
        set.add(t.category.trim());
      }
    });
    return ['All', ...Array.from(set)];
  }, [technologies]);

  // Filtered technologies
  const filteredTechnologies = useMemo(() => {
    if (activeCategory === 'All') return technologies;
    return technologies.filter(
      (t) => t.category.toLowerCase() === activeCategory.toLowerCase()
    );
  }, [technologies, activeCategory]);

  const marqueeItems = useMemo(() => {
    if (filteredTechnologies.length === 0) return [];
    const minItems = 8;
    const repeatCount = Math.ceil(minItems / filteredTechnologies.length);
    const items: TechnologyItem[] = [];
    for (let r = 0; r < repeatCount; r++) {
      items.push(...filteredTechnologies);
    }
    return items;
  }, [filteredTechnologies]);

  return (
    <div className="w-full">
      {/* Section Header */}
      <div className="text-center mb-10">
        <span
          className={`text-xs font-semibold tracking-widest uppercase mb-3 block ${
            isDark ? 'text-red-500' : 'text-blue-600'
          }`}
        >
          {isDark ? 'ARSENAL' : 'TOOLS'}
        </span>
        <h2
          className={`text-3xl sm:text-4xl font-bold tracking-tight mb-3 ${
            isDark ? 'text-white' : 'text-gray-900'
          }`}
        >
          {isDark ? 'Tech Arsenal' : 'Weapons of Choice'}
        </h2>
        <p className={isDark ? 'text-gray-400' : 'text-gray-600'}>
          Technologies and tools I work with on a daily basis
        </p>
      </div>

      {/* Controls Bar: Category Filter Pills + View Mode Segmented Control */}
      {technologies.length > 0 && (
        <div className="flex flex-col md:flex-row items-center justify-between gap-4 mb-8">
          {/* Category Filter Pills */}
          <div
            role="tablist"
            aria-label="Technology categories"
            className={`p-1.5 rounded-full inline-flex flex-wrap items-center justify-center gap-1.5 backdrop-blur-xl backdrop-saturate-[180%] border ${
              isDark
                ? 'bg-slate-900/60 border-white/10'
                : 'bg-white/70 border-black/10 shadow-sm'
            }`}
          >
            {categories.map((category) => {
              const isActive = category === activeCategory;
              return (
                <button
                  key={category}
                  type="button"
                  role="tab"
                  aria-selected={isActive}
                  onClick={() => setActiveCategory(category)}
                  className={`relative min-h-[44px] min-w-[44px] px-4 py-2 rounded-full text-xs sm:text-sm font-semibold transition-colors cursor-pointer select-none flex items-center justify-center focus-visible:outline-none focus-visible:ring-2 ${
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

          {/* View Mode Toggle (Segmented Pill) */}
          <div
            role="group"
            aria-label="View mode toggle"
            className={`p-1.5 rounded-full inline-flex items-center gap-1 backdrop-blur-xl backdrop-saturate-[180%] border shrink-0 ${
              isDark
                ? 'bg-slate-900/60 border-white/10'
                : 'bg-white/70 border-black/10 shadow-sm'
            }`}
          >
            <button
              type="button"
              aria-pressed={viewMode === 'grid'}
              aria-label="Bento Grid view"
              onClick={() => setViewMode('grid')}
              className={`relative min-h-[44px] min-w-[44px] px-3.5 py-2 rounded-full text-xs font-semibold flex items-center gap-2 transition-colors cursor-pointer select-none focus-visible:outline-none focus-visible:ring-2 ${
                viewMode === 'grid'
                  ? 'text-white'
                  : isDark
                  ? 'text-gray-400 hover:text-white'
                  : 'text-gray-600 hover:text-gray-900'
              }`}
            >
              {viewMode === 'grid' && (
                <motion.span
                  layoutId="activeViewMode"
                  transition={
                    shouldReduceMotion
                      ? { duration: 0 }
                      : { type: 'spring', bounce: 0, duration: 0.35 }
                  }
                  className={`absolute inset-0 rounded-full ${
                    isDark ? 'bg-white/15' : 'bg-slate-900 text-white'
                  }`}
                />
              )}
              <LayoutGrid className="w-4 h-4 relative z-10" />
              <span className="relative z-10 hidden sm:inline">Bento Grid</span>
            </button>

            <button
              type="button"
              aria-pressed={viewMode === 'marquee'}
              aria-label="Marquee Stream view"
              onClick={() => setViewMode('marquee')}
              className={`relative min-h-[44px] min-w-[44px] px-3.5 py-2 rounded-full text-xs font-semibold flex items-center gap-2 transition-colors cursor-pointer select-none focus-visible:outline-none focus-visible:ring-2 ${
                viewMode === 'marquee'
                  ? 'text-white'
                  : isDark
                  ? 'text-gray-400 hover:text-white'
                  : 'text-gray-600 hover:text-gray-900'
              }`}
            >
              {viewMode === 'marquee' && (
                <motion.span
                  layoutId="activeViewMode"
                  transition={
                    shouldReduceMotion
                      ? { duration: 0 }
                      : { type: 'spring', bounce: 0, duration: 0.35 }
                  }
                  className={`absolute inset-0 rounded-full ${
                    isDark ? 'bg-white/15' : 'bg-slate-900 text-white'
                  }`}
                />
              )}
              <Repeat className="w-4 h-4 relative z-10" />
              <span className="relative z-10 hidden sm:inline">Marquee Stream</span>
            </button>
          </div>
        </div>
      )}

      {/* Grid or Marquee View */}
      {viewMode === 'grid' ? (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.3 }}
          className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4 sm:gap-6"
        >
          {filteredTechnologies.map((tech) => (
            <BentoTechCard
              key={`${tech.name}-${tech.category}`}
              tech={tech}
              isDark={isDark}
              shouldReduceMotion={shouldReduceMotion}
            />
          ))}
        </motion.div>
      ) : (
        <div className="relative overflow-hidden py-4">
          <div className="flex gap-4 animate-scroll w-max flex-nowrap will-change-transform hover:[animation-play-state:paused]">
            <div className="flex gap-4">
              {marqueeItems.map((tech, i) => (
                <TechPill
                  key={`${tech.name}-${i}`}
                  tech={tech}
                  isDark={isDark}
                  shouldReduceMotion={shouldReduceMotion}
                />
              ))}
            </div>
            <div className="flex gap-4" aria-hidden="true">
              {marqueeItems.map((tech, i) => (
                <TechPill
                  key={`clone-${tech.name}-${i}`}
                  tech={tech}
                  isDark={isDark}
                  shouldReduceMotion={shouldReduceMotion}
                />
              ))}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default TechArsenal;

