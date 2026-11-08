import { useState, useContext } from 'react';
import { useRouteError, useNavigate } from 'react-router';
import { motion, AnimatePresence, useReducedMotion } from 'motion/react';
import {
  ShieldAlert,
  AlertTriangle,
  RefreshCw,
  Home,
  ChevronDown,
  ChevronUp,
  Terminal,
} from 'lucide-react';
import { ThemeContext, getFallbackTheme } from '../context/ThemeContext';
import { CodeRain } from '../components/CodeRain';
import { BackButton } from '../components/ui/BackButton';

export function ErrorPage() {
  const error = useRouteError();
  const navigate = useNavigate();
  const motionReduced = useReducedMotion();
  const shouldReduceMotion =
    motionReduced ||
    (typeof window !== 'undefined' && window.matchMedia
      ? window.matchMedia('(prefers-reduced-motion: reduce)').matches
      : false);
  const [showDetails, setShowDetails] = useState(false);

  const context = useContext(ThemeContext);
  const theme = context?.theme ?? getFallbackTheme();
  const isDark = theme === 'avengers';

  // Extract error details safely
  let errorMessage = 'An unexpected error occurred.';
  let errorStack = '';
  if (error instanceof Error) {
    errorMessage = error.message;
    errorStack = error.stack || '';
  } else if (typeof error === 'object' && error !== null) {
    errorMessage =
      (error as any).statusText ||
      (error as any).message ||
      JSON.stringify(error);
  } else if (typeof error === 'string') {
    errorMessage = error;
  }

  const handleReload = () => {
    window.location.reload();
  };

  const handleGoHome = () => {
    // If router is broken, use window.location
    try {
      navigate('/');
    } catch {
      window.location.href = '/';
    }
  };

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
          <motion.div
            className="absolute w-96 h-96 rounded-full blur-3xl bg-blue-600/5 motion-reduce:hidden"
            animate={
              shouldReduceMotion
                ? undefined
                : { x: [0, 60, 0], y: [0, -60, 0] }
            }
            transition={{ duration: 18, repeat: Infinity, ease: 'easeInOut' }}
            style={{ top: '10%', left: '15%' }}
          />
          <motion.div
            className="absolute w-96 h-96 rounded-full blur-3xl bg-blue-400/5 motion-reduce:hidden"
            animate={
              shouldReduceMotion
                ? undefined
                : { x: [0, -60, 0], y: [0, 60, 0] }
            }
            transition={{ duration: 14, repeat: Infinity, ease: 'easeInOut' }}
            style={{ bottom: '10%', right: '15%' }}
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
        {/* Animated Icon */}
        <motion.div
          initial={
            shouldReduceMotion ? { opacity: 0 } : { scale: 0, rotate: 180 }
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
              <ShieldAlert className="w-14 h-14 text-white" />
            ) : (
              <AlertTriangle className="w-14 h-14 text-white" />
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
            500
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
            {isDark
              ? 'Shield Failure / System Malfunction'
              : 'Bifrost Shattered / Ragnarok Unleashed'}
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
            ? 'An unexpected error occurred in the Helicarrier systems. Iron Man is working on a fix.'
            : 'The Bifrost has shattered. The gods are fighting to restore order.'}
        </motion.p>

        {/* Action Buttons */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.45 }}
          className="flex flex-col sm:flex-row items-center justify-center gap-4 w-full sm:w-auto mb-10"
        >
          <motion.button
            type="button"
            onClick={handleReload}
            whileTap={shouldReduceMotion ? undefined : { scale: 0.97 }}
            whileHover={shouldReduceMotion ? undefined : { scale: 1.02 }}
            className={`w-full sm:w-auto min-h-[44px] flex items-center justify-center gap-2 px-7 py-3 rounded-2xl font-semibold transition-shadow duration-200 cursor-pointer focus:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 ${
              isDark
                ? 'bg-gradient-to-r from-red-600 to-yellow-500 text-white hover:shadow-lg hover:shadow-red-500/40 focus-visible:ring-red-500'
                : 'bg-gradient-to-r from-blue-600 to-blue-500 text-white hover:shadow-lg hover:shadow-blue-500/30 focus-visible:ring-blue-500'
            }`}
          >
            <RefreshCw className="w-5 h-5" />
            <span>Try Again</span>
          </motion.button>

          <motion.button
            type="button"
            onClick={handleGoHome}
            whileTap={shouldReduceMotion ? undefined : { scale: 0.97 }}
            whileHover={shouldReduceMotion ? undefined : { scale: 1.02 }}
            className={`w-full sm:w-auto min-h-[44px] flex items-center justify-center gap-2 px-7 py-3 rounded-2xl font-semibold transition-colors duration-200 cursor-pointer border focus:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 ${
              isDark
                ? 'bg-slate-800/50 border-white/10 text-white hover:bg-slate-800 hover:border-red-500/40 focus-visible:ring-red-500'
                : 'bg-white border-blue-200 text-slate-800 hover:bg-blue-50/50 hover:border-blue-400 shadow-xs focus-visible:ring-blue-500'
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

        {/* Developer technical details collapse panel */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5, delay: 0.55 }}
          className="w-full"
        >
          <motion.button
            type="button"
            onClick={() => setShowDetails(!showDetails)}
            whileTap={shouldReduceMotion ? undefined : { scale: 0.98 }}
            aria-expanded={showDetails}
            aria-controls="error-details-panel"
            className={`flex items-center justify-between w-full min-h-[44px] p-4 rounded-2xl border text-sm font-semibold transition-colors cursor-pointer focus:outline-none focus-visible:ring-2 ${
              isDark
                ? 'bg-slate-900/60 border-white/10 text-slate-300 hover:bg-slate-900 hover:text-white focus-visible:ring-red-500'
                : 'bg-white/80 border-blue-200/80 text-slate-700 hover:bg-blue-50/80 hover:text-blue-900 shadow-xs focus-visible:ring-blue-500'
            }`}
          >
            <span className="flex items-center gap-2">
              <Terminal
                className={`w-4 h-4 ${isDark ? 'text-red-500' : 'text-blue-600'}`}
              />
              <span>Technical Error Details</span>
            </span>
            {showDetails ? (
              <ChevronUp className="w-4 h-4" />
            ) : (
              <ChevronDown className="w-4 h-4" />
            )}
          </motion.button>

          <AnimatePresence>
            {showDetails && (
              <motion.div
                id="error-details-panel"
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: 'auto' }}
                exit={{ opacity: 0, height: 0 }}
                transition={
                  shouldReduceMotion
                    ? { duration: 0.15 }
                    : { duration: 0.3, ease: [0.22, 1, 0.36, 1] }
                }
                className="overflow-hidden w-full text-left"
              >
                <div
                  className={`mt-3 p-4 rounded-2xl border font-mono text-xs overflow-x-auto max-h-60 leading-relaxed ${
                    isDark
                      ? 'bg-black/80 border-red-500/20 text-green-400'
                      : 'bg-slate-900 text-slate-200 border-blue-300/30'
                  }`}
                >
                  <p className="font-bold mb-2">Message: {errorMessage}</p>
                  {errorStack && (
                    <pre className="whitespace-pre-wrap font-mono text-[10px] opacity-80 mt-2">
                      {errorStack}
                    </pre>
                  )}
                </div>
              </motion.div>
            )}
          </AnimatePresence>
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
            ? 'ERROR_CODE: AVENGERS_500_SYSTEM_MALFUNCTION'
            : 'ERROR_RUNE: RAGNAROK_500_BIFROST_SHATTERED'}
        </motion.p>
      </motion.div>
    </div>
  );
}
