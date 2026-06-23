import { useRouteError, useNavigate } from 'react-router';
import { motion, AnimatePresence } from 'motion/react';
import {
  ShieldAlert,
  AlertTriangle,
  RefreshCw,
  Home,
  ChevronDown,
  ChevronUp,
  Terminal,
} from 'lucide-react';
import { useTheme } from '../context/ThemeContext';
import { CodeRain } from '../components/CodeRain';
import { useState } from 'react';

export function ErrorPage() {
  const error = useRouteError();
  const navigate = useNavigate();
  const [showDetails, setShowDetails] = useState(false);

  // Fallback theme detection if ThemeContext is not active due to error boundary taking over Root
  let theme = 'avengers';
  try {
    const context = useTheme();
    theme = context.theme;
  } catch (e) {
    const savedTheme = localStorage.getItem('portfolio-theme');
    if (savedTheme === 'avengers' || savedTheme === 'godofwar') {
      theme = savedTheme;
    }
  }
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
    } catch (e) {
      window.location.href = '/';
    }
  };

  return (
    <div
      className={`min-h-screen w-full flex items-center justify-center relative overflow-hidden transition-colors duration-500 py-12 ${
        isDark
          ? 'bg-gradient-to-br from-slate-950 via-blue-950 to-slate-900'
          : 'bg-gradient-to-br from-blue-50 via-white to-blue-100'
      }`}
    >
      {/* Animated Background */}
      {isDark ? (
        <div className="absolute inset-0 z-0 overflow-hidden">
          <CodeRain />
          <div className="absolute inset-0 bg-gradient-to-t from-slate-950/80 via-transparent to-transparent pointer-events-none" />
        </div>
      ) : (
        <div className="absolute inset-0 z-0 overflow-hidden pointer-events-none">
          <motion.div
            className="absolute w-96 h-96 rounded-full blur-3xl bg-blue-600/5"
            animate={{ x: [0, 60, 0], y: [0, -60, 0] }}
            transition={{ duration: 18, repeat: Infinity, ease: 'easeInOut' }}
            style={{ top: '10%', left: '15%' }}
          />
          <motion.div
            className="absolute w-96 h-96 rounded-full blur-3xl bg-blue-400/5"
            animate={{ x: [0, -60, 0], y: [0, 60, 0] }}
            transition={{ duration: 14, repeat: Infinity, ease: 'easeInOut' }}
            style={{ bottom: '10%', right: '15%' }}
          />
        </div>
      )}

      {/* Main Container */}
      <div className="relative z-10 max-w-2xl w-full mx-auto px-6 text-center flex flex-col items-center">
        {/* Animated Icon */}
        <motion.div
          initial={{ scale: 0, rotate: 180 }}
          animate={{ scale: 1, rotate: 0 }}
          transition={{ duration: 0.8, type: 'spring' }}
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
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
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
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.3 }}
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
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.4 }}
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
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.5 }}
          className="flex flex-col sm:flex-row items-center justify-center gap-4 w-full sm:w-auto mb-10"
        >
          <button
            onClick={handleReload}
            className={`w-full sm:w-auto flex items-center justify-center gap-2 px-7 py-3 rounded-xl font-semibold transition-all duration-300 hover:scale-105 cursor-pointer ${
              isDark
                ? 'bg-gradient-to-r from-red-600 to-yellow-500 text-white hover:shadow-lg hover:shadow-red-500/40'
                : 'bg-gradient-to-r from-blue-600 to-blue-500 text-white hover:shadow-lg hover:shadow-blue-500/30'
            }`}
          >
            <RefreshCw className="w-5 h-5 animate-spin-hover" />
            Try Again
          </button>

          <button
            onClick={handleGoHome}
            className={`w-full sm:w-auto flex items-center justify-center gap-2 px-7 py-3 rounded-xl font-semibold transition-all duration-300 hover:scale-105 cursor-pointer border ${
              isDark
                ? 'bg-slate-800/40 border-red-500/20 text-white hover:border-red-500/50 backdrop-blur-sm'
                : 'bg-white border-blue-300/40 text-slate-800 hover:border-blue-500/60 shadow-md shadow-blue-500/5'
            }`}
          >
            <Home className="w-5 h-5" />
            {isDark ? 'Return to Base' : 'Return to Hall'}
          </button>
        </motion.div>

        {/* Developer technical details collapse panel */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.6, delay: 0.6 }}
          className="w-full"
        >
          <button
            onClick={() => setShowDetails(!showDetails)}
            className={`flex items-center justify-between w-full p-4 rounded-xl border text-sm font-semibold transition-all cursor-pointer ${
              isDark
                ? 'bg-slate-900/60 border-red-500/10 text-slate-300 hover:bg-slate-900 hover:text-white'
                : 'bg-white/70 border-blue-300/30 text-slate-700 hover:bg-blue-50 hover:text-blue-900 shadow-md shadow-blue-500/5'
            }`}
          >
            <span className="flex items-center gap-2">
              <Terminal
                className={`w-4 h-4 ${isDark ? 'text-red-500' : 'text-blue-600'}`}
              />
              Technical Error Details
            </span>
            {showDetails ? (
              <ChevronUp className="w-4 h-4" />
            ) : (
              <ChevronDown className="w-4 h-4" />
            )}
          </button>

          <AnimatePresence>
            {showDetails && (
              <motion.div
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: 'auto' }}
                exit={{ opacity: 0, height: 0 }}
                className="overflow-hidden w-full text-left"
              >
                <div
                  className={`mt-3 p-4 rounded-xl border font-mono text-xs overflow-x-auto max-h-60 leading-relaxed ${
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
          transition={{ duration: 0.6, delay: 0.7 }}
          className={`mt-8 text-xs font-mono tracking-widest uppercase ${
            isDark ? 'text-slate-600' : 'text-slate-400'
          }`}
        >
          {isDark
            ? 'ERROR_CODE: AVENGERS_500_SYSTEM_MALFUNCTION'
            : 'ERROR_RUNE: RAGNAROK_500_BIFROST_SHATTERED'}
        </motion.p>
      </div>
    </div>
  );
}
