import { useState, useEffect, useMemo } from 'react';
import { motion, useReducedMotion } from 'motion/react';
import {
  ArrowDown,
  Shield,
  Axe,
  Snowflake,
  Cpu,
  Terminal,
  Code,
  User,
} from 'lucide-react';
import { Link } from 'react-router';
import { CodeRain } from '../../components/CodeRain';
import { TerminalWindow, type TerminalTabId } from '../TerminalWindow';
import { HeroAvatarLoader } from './HeroAvatarLoader';
import { useTheme } from '../../context/ThemeContext';
import { useUser } from '../../context/UserContext';

const STATIC_PARTICLES = Array.from({ length: 20 }, (_, i) => ({
  id: i,
  top: `${((i * 19 + 7) % 95) + 2}%`,
  left: `${((i * 23 + 11) % 94) + 3}%`,
  duration: `${3 + (i % 4) * 0.8}s`,
  delay: `${(i * 0.4) % 3}s`,
  size: i % 3 === 0 ? 'w-1.5 h-1.5' : 'w-1 h-1',
}));

const STATIC_SNOWFLAKES = Array.from({ length: 16 }, (_, i) => ({
  id: i,
  left: `${(i * 6.2 + 2) % 96}%`,
  duration: `${6 + (i % 5) * 1.5}s`,
  delay: `${(i * 0.5) % 4}s`,
}));

const SMOOTH_EASE = [0.22, 1, 0.36, 1] as const;

export function HomeHero() {
  const { userData, loading: userLoading } = useUser();
  const { theme } = useTheme();
  const isDark = theme === 'avengers';
  const shouldReduceMotion = useReducedMotion();

  const [imageLoaded, setImageLoaded] = useState(false);
  const [imageError, setImageError] = useState(false);
  const [viewMode, setViewMode] = useState<'terminal' | 'avatar'>('terminal');
  const [activeTerminalTab, setActiveTerminalTab] = useState<TerminalTabId>('developer.ts');

  const profileImage = userData?.image?.trim() || '';
  const developerName = userData?.name || 'Karanveer Thour';

  // Dynamic time-based greeting
  const greeting = useMemo(() => {
    const hour = new Date().getHours();
    if (hour < 12) return 'Good morning';
    if (hour < 18) return 'Good afternoon';
    return 'Good evening';
  }, []);

  // Preload image with active guard to prevent state updates on unmounted component
  useEffect(() => {
    if (!profileImage) {
      setImageLoaded(false);
      return;
    }

    let active = true;
    const img = new Image();
    img.src = profileImage;
    img.onload = () => {
      if (!active) return;
      setImageLoaded(true);
      setImageError(false);
    };
    img.onerror = () => {
      if (!active) return;
      setImageLoaded(false);
      setImageError(true);
    };

    return () => {
      active = false;
    };
  }, [profileImage]);

  const particles = useMemo(() => STATIC_PARTICLES, []);
  const snowflakes = useMemo(() => STATIC_SNOWFLAKES, []);

  const showLoader =
    userLoading || (!imageLoaded && !imageError && Boolean(profileImage));
  const showMonogram = (!userLoading && !profileImage) || imageError;

  const initials = useMemo(() => {
    const parts = developerName.split(/\s+/).filter(Boolean);
    if (parts.length === 0) return 'KT';
    return parts
      .map((n) => n[0])
      .join('')
      .toUpperCase()
      .slice(0, 2);
  }, [developerName]);

  const handleViewKeyDown = (e: React.KeyboardEvent, currentMode: 'terminal' | 'avatar') => {
    if (e.key === 'ArrowRight' || e.key === 'ArrowLeft') {
      e.preventDefault();
      const nextMode = currentMode === 'terminal' ? 'avatar' : 'terminal';
      setViewMode(nextMode);
      document.getElementById(`hero-tab-${nextMode}`)?.focus();
    }
  };

  return (
    <section className="min-h-screen flex items-center justify-center relative overflow-hidden pt-16 pb-12">
      {/* Dark Mode Atmosphere Layer with invisible guard when !isDark for compositor efficiency */}
      <div
        aria-hidden="true"
        className={`absolute inset-0 pointer-events-none transition-opacity duration-500 ease-in-out ${
          isDark ? 'opacity-100 visible' : 'opacity-0 invisible'
        } bg-gradient-to-br from-slate-950 via-blue-950 to-slate-900`}
      >
        <CodeRain />
        <div
          className="absolute w-96 h-96 rounded-full blur-3xl opacity-30 animate-pulse bg-red-600/20 motion-reduce:animate-none"
          style={{ top: '10%', left: '10%' }}
        />
        <div
          className="absolute w-96 h-96 rounded-full blur-3xl opacity-30 animate-pulse bg-yellow-500/20 motion-reduce:animate-none"
          style={{ bottom: '10%', right: '10%', animationDelay: '1.5s' }}
        />
      </div>

      {/* Light Mode Atmosphere Layer */}
      <div
        aria-hidden="true"
        className={`absolute inset-0 pointer-events-none select-none transition-opacity duration-500 ease-in-out ${
          !isDark ? 'opacity-100 visible' : 'opacity-0 invisible'
        } bg-gradient-to-br from-slate-100 via-blue-50 to-indigo-100`}
      >
        <div className="absolute inset-0 overflow-hidden motion-reduce:hidden">
          {snowflakes.map((snow) => (
            <div
              key={snow.id}
              className="absolute text-blue-300 will-change-transform"
              style={{
                left: snow.left,
                top: '-20px',
                animation: `snowflake-fall ${snow.duration} linear ${snow.delay} infinite`,
              }}
            >
              <Snowflake className="w-4 h-4" />
            </div>
          ))}
        </div>
        <div
          className="absolute w-96 h-96 rounded-full blur-3xl opacity-20 animate-pulse bg-blue-600/20 motion-reduce:animate-none"
          style={{ top: '10%', left: '10%' }}
        />
        <div
          className="absolute w-96 h-96 rounded-full blur-3xl opacity-20 animate-pulse bg-blue-400/20 motion-reduce:animate-none"
          style={{ bottom: '10%', right: '10%', animationDelay: '1.5s' }}
        />
      </div>

      {/* GPU Twinkling Stars/Particles */}
      <div
        aria-hidden="true"
        className="absolute inset-0 overflow-hidden pointer-events-none select-none motion-reduce:hidden"
      >
        {particles.map((p) => (
          <div
            key={p.id}
            className={`absolute rounded-full will-change-transform ${p.size} ${
              isDark ? 'bg-white/80' : 'bg-blue-400/80'
            }`}
            style={{
              top: p.top,
              left: p.left,
              animation: `particle-twinkle ${p.duration} ease-in-out ${p.delay} infinite`,
            }}
          />
        ))}
      </div>

      <div className="container mx-auto px-6 relative z-10">
        <div className="max-w-7xl mx-auto">
          <div className="grid lg:grid-cols-2 gap-12 items-center mb-12">
            {/* Left Column: Text & CTAs with Optical Typography */}
            <motion.div
              initial={shouldReduceMotion ? { opacity: 0 } : { opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, ease: SMOOTH_EASE }}
            >
              {/* Dynamic Greeting & Identity Pill from UserContext */}
              <motion.div
                initial={shouldReduceMotion ? { opacity: 0 } : { opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.05, ease: SMOOTH_EASE }}
                className="flex items-center gap-2 mb-3"
              >
                <div
                  className={`inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full text-xs font-mono font-medium border backdrop-blur-md shadow-xs ${
                    isDark
                      ? 'bg-slate-900/80 border-red-500/30 text-gray-200'
                      : 'bg-white/90 border-blue-300/60 text-gray-800'
                  }`}
                >
                  <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse motion-reduce:animate-none" />
                  <span data-testid="hero-greeting">
                    {greeting}, I&apos;m {developerName}
                  </span>
                </div>
              </motion.div>

              {/* Theme Badge */}
              <motion.div
                initial={shouldReduceMotion ? { opacity: 0 } : { opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.1, ease: SMOOTH_EASE }}
                className="flex items-center gap-2 mb-4"
              >
                {isDark ? (
                  <Shield className="w-5 h-5 text-red-500" />
                ) : (
                  <Axe className="w-5 h-5 text-blue-600" />
                )}
                <span
                  className={`font-semibold uppercase tracking-wider text-xs ${
                    isDark ? 'text-red-500' : 'text-blue-600'
                  }`}
                >
                  {isDark ? 'Developer Portfolio' : 'Nordic Developer'}
                </span>
              </motion.div>

              {/* Headline with Optical Letter Tracking (-0.02em) */}
              <h1
                style={{ letterSpacing: '-0.02em' }}
                className={`text-4xl sm:text-5xl md:text-6xl font-bold tracking-tight mb-5 ${
                  isDark ? 'text-white' : 'text-gray-900'
                }`}
              >
                <motion.span
                  initial={shouldReduceMotion ? { opacity: 0 } : { opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: 0.15, ease: SMOOTH_EASE }}
                  className="block"
                >
                  {isDark ? 'Building The Future' : 'Forging Digital Realms'}
                </motion.span>
                <motion.span
                  initial={shouldReduceMotion ? { opacity: 0 } : { opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: 0.25, ease: SMOOTH_EASE }}
                  className={`block bg-clip-text text-transparent ${
                    isDark
                      ? 'bg-gradient-to-r from-red-500 via-yellow-500 to-red-500'
                      : 'bg-gradient-to-r from-blue-600 via-blue-500 to-blue-700'
                  }`}
                >
                  {isDark ? 'One Line at a Time' : 'With Code & Honor'}
                </motion.span>
              </h1>

              {/* Sub-headline / Hobbies with Optical Letter Tracking (-0.01em) */}
              <motion.p
                data-testid="hero-role-subtitle"
                style={{ letterSpacing: '-0.01em' }}
                className={`text-lg sm:text-xl font-medium tracking-tight mb-4 ${
                  isDark ? 'text-gray-300' : 'text-gray-700'
                }`}
                initial={shouldReduceMotion ? { opacity: 0 } : { opacity: 0, y: 8 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.3, ease: SMOOTH_EASE }}
              >
                {userData?.hobbies && userData.hobbies.length > 0
                  ? userData.hobbies.join(' | ')
                  : isDark
                    ? 'Full Stack Developer | AI Enthusiast | Tech Innovator'
                    : 'Full Stack Developer | Code Warrior | Digital Craftsman'}
              </motion.p>

              {/* Description */}
              <motion.p
                className={`text-base sm:text-lg mb-8 max-w-xl leading-relaxed ${
                  isDark ? 'text-gray-400' : 'text-gray-600'
                }`}
                initial={shouldReduceMotion ? { opacity: 0 } : { opacity: 0, y: 8 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.35, ease: SMOOTH_EASE }}
              >
                {isDark
                  ? 'Crafting intelligent solutions with modern technologies, from sleek interfaces to powerful backends.'
                  : 'Building legendary applications with the strength of modern frameworks and the wisdom of best practices.'}
              </motion.p>

              {/* Tech Badges */}
              <motion.div
                className="flex gap-3 mb-8 flex-wrap"
                initial={shouldReduceMotion ? { opacity: 0 } : { opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.5, delay: 0.4 }}
              >
                <div
                  className={`flex items-center gap-2 px-3.5 py-1.5 rounded-lg border text-xs font-medium ${
                    isDark
                      ? 'bg-slate-800/60 border-red-500/20 text-gray-300'
                      : 'bg-white border-blue-300/40 shadow-xs text-gray-700'
                  }`}
                >
                  <Code
                    className={`w-4 h-4 ${isDark ? 'text-red-500' : 'text-blue-600'}`}
                  />
                  <span>Clean Code</span>
                </div>
                <div
                  className={`flex items-center gap-2 px-3.5 py-1.5 rounded-lg border text-xs font-medium ${
                    isDark
                      ? 'bg-slate-800/60 border-yellow-500/20 text-gray-300'
                      : 'bg-white border-blue-300/40 shadow-xs text-gray-700'
                  }`}
                >
                  <Cpu
                    className={`w-4 h-4 ${isDark ? 'text-yellow-500' : 'text-blue-500'}`}
                  />
                  <span>AI Powered</span>
                </div>
                <div
                  className={`flex items-center gap-2 px-3.5 py-1.5 rounded-lg border text-xs font-medium ${
                    isDark
                      ? 'bg-slate-800/60 border-blue-500/20 text-gray-300'
                      : 'bg-white border-blue-300/40 shadow-xs text-gray-700'
                  }`}
                >
                  <Terminal
                    className={`w-4 h-4 ${isDark ? 'text-blue-500' : 'text-blue-700'}`}
                  />
                  <span>Full Stack</span>
                </div>
              </motion.div>

              {/* Standardized Tactile CTAs (>= 44x44px touch targets & scale: 0.97) */}
              <motion.div
                className="flex gap-4 items-center flex-wrap"
                initial={shouldReduceMotion ? { opacity: 0 } : { opacity: 0, y: 8 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.45, ease: SMOOTH_EASE }}
              >
                <motion.div whileTap={{ scale: 0.97 }} className="inline-block">
                  <Link
                    to="/contact"
                    className={`min-h-[44px] min-w-[44px] px-7 py-3 rounded-xl font-medium inline-flex items-center justify-center transition-all duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 ${
                      isDark
                        ? 'bg-gradient-to-r from-red-600 to-yellow-500 text-white shadow-md hover:shadow-red-500/30 focus-visible:ring-red-500'
                        : 'bg-gradient-to-r from-blue-600 to-blue-500 text-white shadow-md hover:shadow-blue-500/30 focus-visible:ring-blue-500'
                    }`}
                  >
                    Contact Me
                  </Link>
                </motion.div>
                <motion.div whileTap={{ scale: 0.97 }} className="inline-block">
                  <Link
                    to="/projects"
                    className={`min-h-[44px] min-w-[44px] px-7 py-3 border-2 rounded-xl font-medium inline-flex items-center justify-center transition-all duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 ${
                      isDark
                        ? 'border-red-500/80 text-white hover:bg-red-500/10 focus-visible:ring-red-500'
                        : 'border-blue-600 text-blue-700 hover:bg-blue-50 focus-visible:ring-blue-500'
                    }`}
                  >
                    View Projects
                  </Link>
                </motion.div>
              </motion.div>
            </motion.div>

            {/* Right Column: Developer Command Center with Stabilized Height (min-h-[440px] sm:min-h-[480px]) */}
            <div className="relative flex flex-col items-center w-full">
              {/* Command Center View Mode Controls with ARIA Arrow Key Navigation */}
              <div className="flex justify-center sm:justify-end w-full mb-4">
                <div
                  role="tablist"
                  aria-label="Command center view selector"
                  className={`inline-flex items-center p-1 rounded-xl border backdrop-blur-md shadow-xs ${
                    isDark
                      ? 'bg-slate-900/80 border-white/10'
                      : 'bg-white/80 border-black/10'
                  }`}
                >
                  <motion.button
                    type="button"
                    role="tab"
                    id="hero-tab-terminal"
                    aria-selected={viewMode === 'terminal'}
                    aria-controls="hero-view-terminal"
                    tabIndex={viewMode === 'terminal' ? 0 : -1}
                    onKeyDown={(e) => handleViewKeyDown(e, 'terminal')}
                    whileTap={{ scale: 0.97 }}
                    onClick={() => setViewMode('terminal')}
                    className={`relative min-h-[44px] min-w-[44px] px-4 py-2 rounded-lg text-xs font-mono font-medium flex items-center justify-center gap-2 transition-colors cursor-pointer select-none focus-visible:outline-none focus-visible:ring-2 ${
                      viewMode === 'terminal'
                        ? isDark
                          ? 'text-white'
                          : 'text-slate-900'
                        : isDark
                          ? 'text-gray-400 hover:text-white'
                          : 'text-gray-600 hover:text-slate-900'
                    } ${isDark ? 'focus-visible:ring-red-500' : 'focus-visible:ring-blue-500'}`}
                  >
                    {viewMode === 'terminal' && (
                      <motion.div
                        layoutId="heroViewTabPill"
                        transition={
                          shouldReduceMotion
                            ? { duration: 0 }
                            : { type: 'spring', bounce: 0, duration: 0.35 }
                        }
                        className={`absolute inset-0 rounded-lg ${
                          isDark
                            ? 'bg-slate-800 border border-white/10 shadow-sm'
                            : 'bg-white border border-black/10 shadow-sm'
                        }`}
                      />
                    )}
                    <span className="relative z-10 flex items-center gap-1.5">
                      <Terminal className="w-4 h-4" />
                      <span>Terminal</span>
                    </span>
                  </motion.button>

                  <motion.button
                    type="button"
                    role="tab"
                    id="hero-tab-avatar"
                    aria-selected={viewMode === 'avatar'}
                    aria-controls="hero-view-avatar"
                    tabIndex={viewMode === 'avatar' ? 0 : -1}
                    onKeyDown={(e) => handleViewKeyDown(e, 'avatar')}
                    whileTap={{ scale: 0.97 }}
                    onClick={() => setViewMode('avatar')}
                    className={`relative min-h-[44px] min-w-[44px] px-4 py-2 rounded-lg text-xs font-mono font-medium flex items-center justify-center gap-2 transition-colors cursor-pointer select-none focus-visible:outline-none focus-visible:ring-2 ${
                      viewMode === 'avatar'
                        ? isDark
                          ? 'text-white'
                          : 'text-slate-900'
                        : isDark
                          ? 'text-gray-400 hover:text-white'
                          : 'text-gray-600 hover:text-slate-900'
                    } ${isDark ? 'focus-visible:ring-red-500' : 'focus-visible:ring-blue-500'}`}
                  >
                    {viewMode === 'avatar' && (
                      <motion.div
                        layoutId="heroViewTabPill"
                        transition={
                          shouldReduceMotion
                            ? { duration: 0 }
                            : { type: 'spring', bounce: 0, duration: 0.35 }
                        }
                        className={`absolute inset-0 rounded-lg ${
                          isDark
                            ? 'bg-slate-800 border border-white/10 shadow-sm'
                            : 'bg-white border border-black/10 shadow-sm'
                        }`}
                      />
                    )}
                    <span className="relative z-10 flex items-center gap-1.5">
                      <User className="w-4 h-4" />
                      <span>Avatar</span>
                    </span>
                  </motion.button>
                </div>
              </div>

              {/* View Content Container with CLS-Preventing Min-Height (440px / 480px) */}
              <div className="w-full relative min-h-[440px] sm:min-h-[480px] flex items-center justify-center">
                {viewMode === 'terminal' ? (
                  <motion.div
                    key="hero-terminal-panel"
                    id="hero-view-terminal"
                    role="tabpanel"
                    aria-labelledby="hero-tab-terminal"
                    initial={shouldReduceMotion ? { opacity: 0 } : { opacity: 0, scale: 0.96 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={
                      shouldReduceMotion
                        ? { duration: 0.1 }
                        : { duration: 0.4, ease: SMOOTH_EASE }
                    }
                    className="w-full"
                  >
                    <TerminalWindow
                      activeTab={activeTerminalTab}
                      onTabChange={setActiveTerminalTab}
                    />
                  </motion.div>
                ) : (
                  <motion.div
                    key="hero-avatar-panel"
                    id="hero-view-avatar"
                    role="tabpanel"
                    aria-labelledby="hero-tab-avatar"
                    initial={shouldReduceMotion ? { opacity: 0 } : { opacity: 0, scale: 0.96 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={
                      shouldReduceMotion
                        ? { duration: 0.1 }
                        : { duration: 0.4, ease: SMOOTH_EASE }
                    }
                    className="relative flex justify-center items-center w-full py-4"
                  >
                    <div className="relative w-full max-w-sm sm:max-w-md aspect-square">
                      {/* Glowing ring effect */}
                      <div
                        aria-hidden="true"
                        className={`absolute inset-0 rounded-full blur-2xl opacity-40 animate-pulse motion-reduce:animate-none transition-colors duration-500 ${
                          isDark
                            ? 'bg-gradient-to-r from-red-600 to-yellow-500'
                            : 'bg-gradient-to-r from-blue-600 to-blue-400'
                        }`}
                      />

                      {/* Main Avatar Container */}
                      <div className="relative w-full h-full rounded-full">
                        {/* Theme-Adaptive Animated Loader */}
                        {showLoader && <HeroAvatarLoader />}

                        {/* Real Profile Image */}
                        {imageLoaded && profileImage && (
                          <motion.div
                            initial={shouldReduceMotion ? { opacity: 0 } : { opacity: 0 }}
                            animate={{ opacity: 1 }}
                            transition={{ duration: 0.5, ease: 'easeOut' }}
                            className={`relative w-full h-full rounded-full overflow-hidden border-4 shadow-2xl ${
                              isDark
                                ? 'border-red-500/80 shadow-red-500/30 bg-slate-800'
                                : 'border-blue-500/80 shadow-blue-500/20 bg-blue-50'
                            }`}
                          >
                            <img
                              src={profileImage}
                              alt={developerName}
                              className="w-full h-full object-cover"
                            />
                          </motion.div>
                        )}

                        {/* Fallback Branded Monogram with Robust Word Splitting */}
                        {showMonogram && (
                          <div
                            className={`relative w-full h-full rounded-full overflow-hidden border-4 shadow-2xl flex flex-col items-center justify-center ${
                              isDark
                                ? 'border-red-500/80 shadow-red-500/30 bg-gradient-to-br from-slate-900 via-slate-950 to-blue-950 text-white'
                                : 'border-blue-500/80 shadow-blue-500/20 bg-gradient-to-br from-slate-100 via-blue-50 to-indigo-100 text-blue-900'
                            }`}
                          >
                            <div
                              className={`w-24 h-24 sm:w-28 sm:h-28 rounded-full flex items-center justify-center border-2 mb-2 ${
                                isDark
                                  ? 'bg-red-500/10 border-red-500/40 text-red-400'
                                  : 'bg-blue-100 border-blue-400/60 text-blue-700'
                              }`}
                            >
                              <span className="text-3xl sm:text-4xl font-extrabold font-mono tracking-wider">
                                {initials}
                              </span>
                            </div>
                            <span
                              className={`text-xs font-semibold tracking-widest uppercase ${
                                isDark ? 'text-gray-400' : 'text-blue-600'
                              }`}
                            >
                              {developerName}
                            </span>
                          </div>
                        )}
                      </div>

                      {/* Corner accents */}
                      <div
                        aria-hidden="true"
                        className={`absolute -top-3 -right-3 w-16 h-16 border-t-4 border-r-4 rounded-tr-3xl pointer-events-none ${
                          isDark ? 'border-yellow-500' : 'border-blue-400'
                        }`}
                      />
                      <div
                        aria-hidden="true"
                        className={`absolute -bottom-3 -left-3 w-16 h-16 border-b-4 border-l-4 rounded-bl-3xl pointer-events-none ${
                          isDark ? 'border-red-500' : 'border-blue-600'
                        }`}
                      />
                    </div>
                  </motion.div>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Down Arrow Indicator */}
      <motion.div
        className="absolute bottom-6 left-1/2 transform -translate-x-1/2 pointer-events-none select-none"
        animate={shouldReduceMotion ? undefined : { y: [0, 8, 0] }}
        transition={{ duration: 2, repeat: Infinity, ease: 'easeInOut' }}
      >
        <ArrowDown
          className={
            isDark ? 'w-5 h-5 text-red-500/80' : 'w-5 h-5 text-blue-600/80'
          }
        />
      </motion.div>
    </section>
  );
}
