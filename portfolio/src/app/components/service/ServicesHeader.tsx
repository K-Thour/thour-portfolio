import { motion } from 'motion/react';
import { useTheme } from '../../context/ThemeContext';

interface ServicesHeaderProps {
  isInView: boolean;
}

export function ServicesHeader({ isInView }: ServicesHeaderProps) {
  const { theme } = useTheme();
  const isDark = theme === 'avengers';

  return (
    <div className="text-center mb-16">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
        transition={{ duration: 0.6 }}
      >
        <span
          className={`font-medium uppercase tracking-wider text-sm ${
            isDark ? 'text-red-500' : 'text-blue-600'
          }`}
        >
          Services
        </span>
        <h2
          className={`text-4xl md:text-5xl font-bold mb-4 mt-2 ${
            isDark ? 'text-white' : 'text-gray-900'
          }`}
        >
          {isDark ? 'What I Offer' : 'Legendary Skills'}
        </h2>
        <p
          className={`text-xl max-w-2xl mx-auto ${
            isDark ? 'text-gray-400' : 'text-gray-600'
          }`}
        >
          {isDark
            ? 'Comprehensive development services to bring your vision to life'
            : 'Forge your digital destiny with these battle-tested services'}
        </p>
      </motion.div>
    </div>
  );
}
