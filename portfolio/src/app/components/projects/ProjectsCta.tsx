import { motion } from 'motion/react';
import { Link } from 'react-router';
import { useTheme } from '../../context/ThemeContext';

interface ProjectsCtaProps {
  isInView: boolean;
}

export function ProjectsCta({ isInView }: ProjectsCtaProps) {
  const { theme } = useTheme();
  const isDark = theme === 'avengers';

  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
      transition={{ duration: 0.6, delay: 0.6 }}
      className="mt-16 text-center"
    >
      <div
        className={`rounded-2xl p-8 border max-w-2xl mx-auto ${
          isDark
            ? 'bg-gradient-to-r from-red-900/30 to-yellow-900/30 border-red-500/30'
            : 'bg-gradient-to-br from-blue-100 via-blue-50 to-blue-200 border-blue-400/40 shadow-xl shadow-blue-500/20'
        }`}
      >
        <h3
          className={`text-2xl font-bold mb-3 ${
            isDark ? 'text-white' : 'text-gray-900'
          }`}
        >
          {isDark
            ? "Let's Build Something Amazing"
            : 'Join Me in the Next Quest'}
        </h3>
        <p className={`mb-6 ${isDark ? 'text-gray-300' : 'text-gray-800'}`}>
          {isDark
            ? "Have an idea? Let's collaborate and bring it to life with cutting-edge technology."
            : 'Together we shall forge applications worthy of the halls of Valhalla.'}
        </p>
        <Link
          to="/contact"
          className={`inline-block px-8 py-3 rounded-lg font-medium transition-all duration-300 ${
            isDark
              ? 'bg-gradient-to-r from-red-600 to-yellow-500 text-white hover:shadow-lg hover:shadow-red-500/50'
              : 'bg-gradient-to-r from-blue-600 to-blue-500 text-white hover:shadow-lg hover:shadow-blue-500/50'
          }`}
        >
          {isDark ? 'Start a Project' : 'Begin the Journey'}
        </Link>
      </div>
    </motion.div>
  );
}
