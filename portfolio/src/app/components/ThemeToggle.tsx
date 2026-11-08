import { motion, AnimatePresence, useReducedMotion } from 'motion/react';
import { Shield, Axe } from 'lucide-react';
import { useTheme } from '../context/ThemeContext';

export function ThemeToggle() {
  const { theme, toggleTheme } = useTheme();
  const shouldReduceMotion = useReducedMotion();

  const isDark = theme === 'avengers';

  return (
    <motion.button
      type="button"
      onClick={toggleTheme}
      onKeyDown={(e) => {
        if (e.key === 'Enter' || e.key === ' ') {
          e.preventDefault();
          toggleTheme();
        }
      }}
      whileTap={shouldReduceMotion ? undefined : { scale: 0.95 }}
      aria-label="Toggle theme"
      aria-pressed={!isDark}
      title={`Switch to ${isDark ? 'God of War' : 'Avengers'} theme`}
      className={`relative flex items-center justify-center min-w-[44px] min-h-[44px] w-11 h-11 rounded-full border transition-colors outline-none focus-visible:ring-2 ${
        isDark ? 'focus-visible:ring-red-500' : 'focus-visible:ring-blue-500'
      } cursor-pointer ${
        isDark
          ? 'bg-white/[0.08] hover:bg-white/[0.12] border-white/10 text-red-500 shadow-xs'
          : 'bg-black/[0.04] hover:bg-black/[0.08] border-black/10 text-blue-600 shadow-xs'
      }`}
    >
      <AnimatePresence mode="wait" initial={false}>
        {isDark ? (
          <motion.div
            key="avengers-shield"
            initial={
              shouldReduceMotion
                ? { opacity: 0 }
                : { scale: 0.6, rotate: -60, opacity: 0 }
            }
            animate={
              shouldReduceMotion
                ? { opacity: 1 }
                : { scale: 1, rotate: 0, opacity: 1 }
            }
            exit={
              shouldReduceMotion
                ? { opacity: 0 }
                : { scale: 0.6, rotate: 60, opacity: 0 }
            }
            transition={
              shouldReduceMotion
                ? { duration: 0.15 }
                : { type: 'spring', damping: 18, stiffness: 240 }
            }
            className="flex items-center justify-center"
          >
            <Shield className="w-5 h-5 text-red-500" />
          </motion.div>
        ) : (
          <motion.div
            key="godofwar-axe"
            initial={
              shouldReduceMotion
                ? { opacity: 0 }
                : { scale: 0.6, rotate: -60, opacity: 0 }
            }
            animate={
              shouldReduceMotion
                ? { opacity: 1 }
                : { scale: 1, rotate: 0, opacity: 1 }
            }
            exit={
              shouldReduceMotion
                ? { opacity: 0 }
                : { scale: 0.6, rotate: 60, opacity: 0 }
            }
            transition={
              shouldReduceMotion
                ? { duration: 0.15 }
                : { type: 'spring', damping: 18, stiffness: 240 }
            }
            className="flex items-center justify-center"
          >
            <Axe className="w-5 h-5 text-blue-600" />
          </motion.div>
        )}
      </AnimatePresence>
    </motion.button>
  );
}
