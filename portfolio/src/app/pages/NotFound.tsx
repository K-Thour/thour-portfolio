import { useState, useContext } from 'react';
import { useNavigate } from 'react-router';
import { motion, useReducedMotion } from 'motion/react';
import { Home, Search, Shield, Axe, Snowflake } from 'lucide-react';
import { ThemeContext, getFallbackTheme } from '../context/ThemeContext';
import { CodeRain } from '../components/CodeRain';
import { BackButton } from '../components/ui/BackButton';

export function NotFound() {
  const context = useContext(ThemeContext);
  const theme = context?.theme ?? getFallbackTheme();
  const isDark = theme === 'avengers';
  const motionReduced = useReducedMotion();
  const shouldReduceMotion =
    motionReduced ||
    (typeof window !== 'undefined' && window.matchMedia
      ? window.matchMedia('(prefers-reduced-motion: reduce)').matches
      : false);
  const navigate = useNavigate();

  const handleNavigateHome = () => navigate('/');
  const handleNavigate = (path: string) => navigate(path);

  const [snowflakes] = useState(() =>
    Array.from({ length: 20 }).map((_, i) => ({
      id: i,
      top: Math.random() * 100,
      left: Math.random() * 100,
      duration: Math.random() * 5 + 5,
      delay: Math.random() * 3,
    })),
  );

  const [dots] = useState(() =>
    Array.from({ length: 20 }).map((_, i) => ({
      id: i,
      top: Math.random() * 100,
      left: Math.random() * 100,
      duration: Math.random() * 3 + 2,
      delay: Math.random() * 2,
    })),
  );

  const links = [
    { path: '/', label: 'Home' },
    { path: '/about', label: 'About' },
    { path: '/projects', label: 'Projects' },
    { path: '/contact', label: 'Contact' },
  ];

  return (
    <div
      className={`min-h-screen w-full flex items-center justify-center relative overflow-hidden transition-colors duration-500 py-16 px-4 sm:px-6 ${
        isDark
          ? 'bg-gradient-to-br from-slate-950 via-blue-950 to-slate-900'
          : 'bg-gradient-to-br from-blue-50 via-white to-blue-100'
      }`}
    >
      {/* Animated Background */}
      {isDark ? (
        <div className="absolute inset-0 z-0 overflow-hidden pointer-events-none">
          {!shouldReduceMotion && <CodeRain />}
          <div className="absolute inset-0 bg-gradient-to-t from-slate-950/80 via-transparent to-transparent pointer-events-none" />
        </div>
      ) : (
        <div className="absolute inset-0 z-0 overflow-hidden pointer-events-none">
          {/* Snowflakes / Frost particles (avoided if reduced motion) */}
          {!shouldReduceMotion &&
            snowflakes.map((s) => (
              <motion.div
                key={s.id}
                className="absolute text-blue-300/40 motion-reduce:hidden"
                style={{
                  top: `${s.top}%`,
                  left: `${s.left}%`,
                }}
                animate={{
                  y: [0, 800],
                  opacity: [0.2, 0.7, 0.2],
                  rotate: [0, 360],
                }}
                transition={{
                  duration: s.duration,
                  repeat: Infinity,
                  delay: s.delay,
                  ease: 'linear',
                }}
              >
                <Snowflake className="w-4 h-4" />
              </motion.div>
            ))}

          {/* Sparkles / dots (avoided if reduced motion) */}
          {!shouldReduceMotion &&
            dots.map((d) => (
              <motion.div
                key={d.id}
                className="absolute w-1 h-1 rounded-full bg-blue-400/40 motion-reduce:hidden"
                style={{
                  top: `${d.top}%`,
                  left: `${d.left}%`,
                }}
                animate={{
                  opacity: [0.1, 0.6, 0.1],
                  scale: [1, 1.3, 1],
                }}
                transition={{
                  duration: d.duration,
                  repeat: Infinity,
                  delay: d.delay,
                }}
              />
            ))}

          {/* Soft glowing orbs */}
          <motion.div
            className="absolute w-80 h-80 rounded-full blur-3xl bg-blue-600/5 motion-reduce:hidden"
            animate={
              shouldReduceMotion
                ? undefined
                : { x: [0, 50, 0], y: [0, -50, 0] }
            }
            transition={{ duration: 15, repeat: Infinity, ease: 'easeInOut' }}
            style={{ top: '15%', left: '10%' }}
          />
          <motion.div
            className="absolute w-80 h-80 rounded-full blur-3xl bg-blue-400/5 motion-reduce:hidden"
            animate={
              shouldReduceMotion
                ? undefined
                : { x: [0, -50, 0], y: [0, 50, 0] }
            }
            transition={{ duration: 12, repeat: Infinity, ease: 'easeInOut' }}
            style={{ bottom: '15%', right: '10%' }}
          />
        </div>
      )}

      {/* Main Glass Card */}
      <motion.div
        initial={
          shouldReduceMotion
            ? { opacity: 0 }
            : { opacity: 0, y: 24, scale: 0.98 }
        }
        animate={{ opacity: 1, y: 0, scale: 1 }}
        transition={
          shouldReduceMotion
            ? { duration: 0.2 }
            : { type: 'spring', damping: 25, stiffness: 200 }
        }
        style={{
          backdropFilter: 'blur(20px) saturate(180%)',
          WebkitBackdropFilter: 'blur(20px) saturate(180%)',
        }}
        className={`relative z-10 max-w-2xl w-full mx-auto p-8 sm:p-12 rounded-3xl border backdrop-blur-xl shadow-2xl flex flex-col items-center text-center ${
          isDark
            ? 'bg-slate-900/60 border-white/[0.12] shadow-red-950/30'
            : 'bg-white/70 border-black/[0.06] shadow-blue-500/10'
        }`}
      >
        {/* Error Icon */}
        <motion.div
          initial={
            shouldReduceMotion ? { opacity: 0 } : { scale: 0, rotate: -180 }
          }
          animate={{ scale: 1, rotate: 0, opacity: 1 }}
          transition={
            shouldReduceMotion
              ? { duration: 0.2 }
              : { duration: 0.8, type: 'spring', damping: 20, stiffness: 220 }
          }
          className="mb-8"
        >
          <div
            className={`w-28 h-28 rounded-3xl flex items-center justify-center ${
              isDark
                ? 'bg-gradient-to-br from-red-600 to-yellow-500 shadow-2xl shadow-red-500/30'
                : 'bg-gradient-to-br from-blue-600 to-blue-400 shadow-2xl shadow-blue-500/20'
            }`}
          >
            {isDark ? (
              <Shield className="w-14 h-14 text-white" />
            ) : (
              <Axe className="w-14 h-14 text-white" />
            )}
          </div>
        </motion.div>

        {/* Error Code/Title */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.15 }}
        >
          <h1
            className={`text-8xl font-bold mb-4 tracking-wider ${
              isDark
                ? 'bg-gradient-to-r from-red-500 via-yellow-500 to-red-500 bg-clip-text text-transparent'
                : 'bg-gradient-to-r from-blue-600 via-blue-400 to-blue-600 bg-clip-text text-transparent'
            }`}
          >
            404
          </h1>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.25 }}
        >
          <h2
            className={`text-3xl font-extrabold mb-4 tracking-tight ${
              isDark ? 'text-white' : 'text-slate-900'
            }`}
          >
            {isDark ? 'Mission Not Found' : 'Path Lost in the Frost'}
          </h2>
        </motion.div>

        <motion.p
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.35 }}
          className={`text-base md:text-lg mb-10 max-w-md mx-auto leading-relaxed ${
            isDark ? 'text-slate-400' : 'text-slate-600'
          }`}
        >
          {isDark
            ? "The page you're looking for has been snapped out of existence. Even JARVIS can't locate it."
            : 'The path you seek is hidden in the eternal winter. The runes offer no guidance here.'}
        </motion.p>

        {/* Action Buttons */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.45 }}
          className="flex flex-col sm:flex-row items-center justify-center gap-4 w-full sm:w-auto"
        >
          <motion.button
            type="button"
            onClick={handleNavigateHome}
            whileTap={shouldReduceMotion ? undefined : { scale: 0.97 }}
            whileHover={shouldReduceMotion ? undefined : { scale: 1.02 }}
            className={`w-full sm:w-auto min-h-[44px] flex items-center justify-center gap-2 px-7 py-3 rounded-2xl font-semibold transition-shadow duration-200 cursor-pointer focus:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 ${
              isDark
                ? 'bg-gradient-to-r from-red-600 to-yellow-500 text-white hover:shadow-lg hover:shadow-red-500/40 focus-visible:ring-red-500'
                : 'bg-gradient-to-r from-blue-600 to-blue-500 text-white hover:shadow-lg hover:shadow-blue-500/30 focus-visible:ring-blue-500'
            }`}
          >
            <Home className="w-5 h-5" />
            <span>{isDark ? 'Return to Base' : 'Return to Hall'}</span>
          </motion.button>

          <BackButton
            fallbackPath="/"
            label="Go Back"
            className="w-full sm:w-auto min-h-[44px] justify-center px-7 py-3 rounded-2xl"
          />
        </motion.div>

        {/* Suggestions Panel */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5, delay: 0.55 }}
          className={`mt-10 p-6 rounded-2xl border w-full ${
            isDark
              ? 'bg-slate-900/60 border-white/[0.08] backdrop-blur-xl'
              : 'bg-white/70 border-black/[0.04] backdrop-blur-xl shadow-lg shadow-blue-500/5'
          }`}
        >
          <div className="flex items-center justify-center gap-2 mb-4">
            <Search
              className={`w-4 h-4 ${isDark ? 'text-red-500' : 'text-blue-600'}`}
            />
            <h3
              className={`text-sm font-bold tracking-wide uppercase ${
                isDark ? 'text-slate-300' : 'text-slate-700'
              }`}
            >
              {isDark ? 'Quick Access' : 'Sacred Passages'}
            </h3>
          </div>
          <div className="flex flex-wrap items-center justify-center gap-2.5">
            {links.map((link) => (
              <motion.button
                type="button"
                key={link.path}
                onClick={() => handleNavigate(link.path)}
                whileTap={shouldReduceMotion ? undefined : { scale: 0.97 }}
                whileHover={shouldReduceMotion ? undefined : { scale: 1.03 }}
                className={`min-h-[44px] px-4 py-2 rounded-xl text-sm font-medium transition-colors cursor-pointer focus:outline-none focus-visible:ring-2 ${
                  isDark
                    ? 'bg-slate-800/50 text-slate-300 hover:bg-slate-800 hover:text-white border border-white/5 hover:border-red-500/20 focus-visible:ring-red-500'
                    : 'bg-blue-50/70 text-slate-700 hover:bg-blue-100/80 hover:text-blue-900 border border-blue-200/40 hover:border-blue-400/50 focus-visible:ring-blue-500'
                }`}
              >
                {link.label}
              </motion.button>
            ))}
          </div>
        </motion.div>

        {/* Error Code Tag */}
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5, delay: 0.65 }}
          className={`mt-8 text-xs font-mono tracking-widest uppercase ${
            isDark ? 'text-slate-400' : 'text-slate-600'
          }`}
        >
          {isDark
            ? 'ERROR_CODE: AVENGERS_404_NOT_FOUND'
            : 'ERROR_RUNE: RAGNAROK_404_PATH_LOST'}
        </motion.p>
      </motion.div>
    </div>
  );
}
