import { motion } from 'motion/react';
import { Shield, Hammer } from 'lucide-react';
import { useTheme } from '../../context/ThemeContext';

interface AboutHeroProps {
  isInView: boolean;
}

export function AboutHero({ isInView }: AboutHeroProps) {
  const { theme } = useTheme();
  const isDark = theme === 'avengers';

  return (
    <div className="text-center mb-16">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
        transition={{ duration: 0.6 }}
        className="flex items-center justify-center gap-2 mb-4"
      >
        {isDark ? (
          <Shield className="w-6 h-6 text-red-500" />
        ) : (
          <Hammer className="w-6 h-6 text-blue-600" />
        )}
        <span
          className={`font-medium uppercase tracking-wider text-sm ${
            isDark ? 'text-red-500' : 'text-blue-600'
          }`}
        >
          {isDark ? 'Tech Arsenal' : "Warrior's Path"}
        </span>
      </motion.div>
      <h1
        className={`text-4xl md:text-5xl font-bold mb-4 ${
          isDark ? 'text-white' : 'text-gray-900'
        }`}
      >
        {isDark ? 'Skills & Expertise' : 'Skills of the Norseman'}
      </h1>
      <p
        className={`text-xl max-w-2xl mx-auto ${
          isDark ? 'text-gray-400' : 'text-gray-700'
        }`}
      >
        {isDark
          ? 'Powered by passion for technology and a commitment to continuous learning.'
          : 'Forged through countless battles and hardened by experience.'}
      </p>
    </div>
  );
}
