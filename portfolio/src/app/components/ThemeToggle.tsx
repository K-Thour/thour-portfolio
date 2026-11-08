import { useRef } from 'react';
import { motion, AnimatePresence, useReducedMotion } from 'motion/react';
import { Shield, Axe } from 'lucide-react';
import { useTheme } from '../context/ThemeContext';

export function ThemeToggle() {
  const { theme, toggleTheme } = useTheme();
  const shouldReduceMotion = useReducedMotion();
  const isTransitioningRef = useRef(false);
  const buttonRef = useRef<HTMLButtonElement>(null);

  const isDark = theme === 'avengers';

  const handleToggle = (
    e?: React.MouseEvent<HTMLButtonElement> | React.KeyboardEvent<HTMLButtonElement>,
  ) => {
    // Prevent re-triggering while a circular radial transition is running
    if (isTransitioningRef.current) return;

    // Check for reduced motion and View Transitions API support
    const prefersReducedMotion =
      shouldReduceMotion ||
      (typeof window !== 'undefined' &&
        window.matchMedia?.('(prefers-reduced-motion: reduce)').matches);

    const isViewTransitionSupported =
      typeof document !== 'undefined' &&
      typeof (document as any).startViewTransition === 'function' &&
      !prefersReducedMotion;

    if (!isViewTransitionSupported) {
      toggleTheme();
      return;
    }

    isTransitioningRef.current = true;
    document.documentElement.setAttribute('data-view-transition', 'true');

    // Compute click or button origin coordinates (x, y)
    const targetEl = (e?.currentTarget || buttonRef.current) as HTMLElement | null;
    const rect = targetEl?.getBoundingClientRect();
    const x = rect ? rect.left + rect.width / 2 : window.innerWidth / 2;
    const y = rect ? rect.top + rect.height / 2 : 0;

    // Compute maximum radius to furthest screen corner
    const endRadius = Math.hypot(
      Math.max(x, window.innerWidth - x),
      Math.max(y, window.innerHeight - y),
    );

    try {
      const transition = (document as any).startViewTransition(() => {
        toggleTheme();
      });

      transition.ready
        .then(() => {
          const animation = document.documentElement.animate(
            {
              clipPath: [
                `circle(0px at ${x}px ${y}px)`,
                `circle(${endRadius}px at ${x}px ${y}px)`,
              ],
            },
            {
              duration: 720,
              easing: 'cubic-bezier(0.4, 0, 0.2, 1)',
              pseudoElement: '::view-transition-new(root)',
            },
          );

          animation.onfinish = () => {
            isTransitioningRef.current = false;
            document.documentElement.removeAttribute('data-view-transition');
          };
          animation.oncancel = () => {
            isTransitioningRef.current = false;
            document.documentElement.removeAttribute('data-view-transition');
          };
        })
        .catch(() => {
          isTransitioningRef.current = false;
          document.documentElement.removeAttribute('data-view-transition');
        });

      transition.finished.finally(() => {
        isTransitioningRef.current = false;
        document.documentElement.removeAttribute('data-view-transition');
      });
    } catch {
      toggleTheme();
      isTransitioningRef.current = false;
      document.documentElement.removeAttribute('data-view-transition');
    }
  };

  return (
    <motion.button
      ref={buttonRef}
      type="button"
      onClick={handleToggle}
      onKeyDown={(e) => {
        if (e.key === 'Enter' || e.key === ' ') {
          e.preventDefault();
          handleToggle(e);
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
