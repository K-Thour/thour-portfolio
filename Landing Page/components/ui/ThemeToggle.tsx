'use client';

import React, { useRef } from 'react';
import { flushSync } from 'react-dom';
import { motion, AnimatePresence, useReducedMotion } from 'motion/react';
import { Shield, Axe } from 'lucide-react';
import { useTheme } from '@/context/ThemeContext';
import { cn } from '@/utils/cn';

interface ThemeToggleProps {
  className?: string;
}

export function ThemeToggle({ className }: ThemeToggleProps) {
  const { theme, toggleTheme } = useTheme();
  const shouldReduceMotion = useReducedMotion();
  const isTransitioningRef = useRef(false);

  const isDark = theme === 'avengers';

  const executeToggle = () => {
    if (typeof flushSync === 'function') {
      flushSync(() => {
        toggleTheme();
      });
    } else {
      toggleTheme();
    }
  };

  const handleToggle = async (
    e: React.MouseEvent<HTMLButtonElement> | React.KeyboardEvent<HTMLButtonElement>
  ) => {
    // Prevent overlapping transitions while one is actively executing
    if (isTransitioningRef.current) return;

    // Check for reduced motion preference
    const prefersReducedMotion =
      Boolean(shouldReduceMotion) ||
      (typeof window !== 'undefined' &&
        typeof window.matchMedia === 'function' &&
        window.matchMedia('(prefers-reduced-motion: reduce)').matches);

    // If View Transitions API is not available or reduced motion is active, switch synchronously
    if (
      prefersReducedMotion ||
      typeof document === 'undefined' ||
      !('startViewTransition' in document)
    ) {
      executeToggle();
      return;
    }

    try {
      isTransitioningRef.current = true;

      const rect = e.currentTarget.getBoundingClientRect();
      const x = rect.left + rect.width / 2;
      const y = rect.top + rect.height / 2;

      const endRadius = Math.hypot(
        Math.max(x, window.innerWidth - x),
        Math.max(y, window.innerHeight - y)
      );

      // Execute document View Transition with synchronous React state flush
      const transition = (document as any).startViewTransition(() => {
        executeToggle();
      });

      await transition.ready;

      // Animate circular ripple expansion expanding from the button center
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
        }
      );

      await animation.finished;
    } catch {
      executeToggle();
    } finally {
      isTransitioningRef.current = false;
    }
  };

  return (
    <motion.button
      type="button"
      onClick={handleToggle}
      onKeyDown={(e) => {
        if (e.key === 'Enter' || e.key === ' ') {
          e.preventDefault();
          executeToggle();
        }
      }}
      whileTap={shouldReduceMotion ? undefined : { scale: 0.95 }}
      aria-label="Toggle theme"
      aria-pressed={!isDark}
      title={`Switch to ${isDark ? 'God of War' : 'Avengers'} theme`}
      className={cn(
        'relative flex items-center justify-center min-w-[44px] min-h-[44px] w-11 h-11 rounded-full border transition-colors outline-none focus-visible:ring-2 cursor-pointer select-none apple-pressable apple-glass backdrop-blur-xl',
        isDark
          ? 'focus-visible:ring-red-500 bg-white/[0.08] hover:bg-white/[0.12] border-white/10 text-red-500 shadow-sm'
          : 'focus-visible:ring-blue-500 bg-black/[0.04] hover:bg-black/[0.08] border-black/10 text-blue-600 shadow-sm',
        className
      )}
    >
      <div className="relative flex items-center justify-center w-5 h-5 pointer-events-none">
        <AnimatePresence initial={false}>
          {isDark ? (
            <motion.div
              key="shield-dark"
              initial={
                shouldReduceMotion
                  ? { opacity: 0 }
                  : { scale: 0.3, rotate: -180, opacity: 0 }
              }
              animate={
                shouldReduceMotion
                  ? { opacity: 1 }
                  : { scale: 1, rotate: 0, opacity: 1 }
              }
              exit={
                shouldReduceMotion
                  ? { opacity: 0 }
                  : { scale: 0.3, rotate: 180, opacity: 0 }
              }
              transition={
                shouldReduceMotion
                  ? { duration: 0.1 }
                  : { type: 'spring', damping: 20, stiffness: 350, mass: 0.5 }
              }
              className="absolute inset-0 flex items-center justify-center"
            >
              <Shield className="w-5 h-5 text-red-500 fill-red-500/20" />
            </motion.div>
          ) : (
            <motion.div
              key="axe-light"
              initial={
                shouldReduceMotion
                  ? { opacity: 0 }
                  : { scale: 0.3, rotate: -180, opacity: 0 }
              }
              animate={
                shouldReduceMotion
                  ? { opacity: 1 }
                  : { scale: 1, rotate: 0, opacity: 1 }
              }
              exit={
                shouldReduceMotion
                  ? { opacity: 0 }
                  : { scale: 0.3, rotate: 180, opacity: 0 }
              }
              transition={
                shouldReduceMotion
                  ? { duration: 0.1 }
                  : { type: 'spring', damping: 20, stiffness: 350, mass: 0.5 }
              }
              className="absolute inset-0 flex items-center justify-center"
            >
              <Axe className="w-5 h-5 text-blue-600 fill-blue-600/20" />
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </motion.button>
  );
}

export default ThemeToggle;
