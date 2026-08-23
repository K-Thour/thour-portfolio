import { motion, useScroll, useSpring } from 'motion/react';
import { useTheme } from '../../context/ThemeContext';

export interface ScrollProgressProps {
  className?: string;
}

export function ScrollProgress({ className = '' }: ScrollProgressProps) {
  const { theme } = useTheme();
  const isDark = theme === 'avengers';
  const { scrollYProgress } = useScroll();

  const scaleX = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 30,
    restDelta: 0.001,
  });

  return (
    <motion.div
      data-testid="scroll-progress-bar"
      className={`fixed top-0 left-0 right-0 z-[60] h-[3px] origin-left pointer-events-none transition-colors duration-300 ${
        isDark
          ? 'bg-gradient-to-r from-red-600 via-yellow-500 to-red-500 shadow-[0_0_12px_rgba(239,68,68,0.7)]'
          : 'bg-gradient-to-r from-blue-600 via-sky-400 to-blue-600 shadow-[0_0_12px_rgba(59,130,246,0.6)]'
      } ${className}`}
      style={{ scaleX }}
    />
  );
}
