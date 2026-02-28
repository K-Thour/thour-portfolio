import { motion } from 'motion/react';
import { Link } from 'react-router';
import { useTheme } from '../../context/ThemeContext';
import { type ProjectData } from '../../../data/projects';

interface ProjectResultsProps {
  project: ProjectData;
  isInView: boolean;
}

export function ProjectResults({ project, isInView }: ProjectResultsProps) {
  const { theme } = useTheme();
  const isDark = theme === 'avengers';

  return (
    <>
      <div className="mb-12">
        <h2
          className={`text-2xl font-bold mb-6 ${isDark ? 'text-white' : 'text-gray-900'}`}
        >
          {isDark ? 'Results & Impact' : 'Spoils of War'}
        </h2>
        <div className="grid md:grid-cols-2 gap-4">
          {project.results.map((result, index) => (
            <motion.div
              key={result}
              initial={{ opacity: 0, scale: 0.9 }}
              animate={
                isInView ? { opacity: 1, scale: 1 } : { opacity: 0, scale: 0.9 }
              }
              transition={{
                duration: 0.6,
                delay: 0.9 + index * 0.1,
              }}
              className={`p-6 rounded-xl border text-center ${
                isDark
                  ? 'bg-gradient-to-br from-red-900/30 to-yellow-900/30 border-red-500/30'
                  : 'bg-gradient-to-br from-blue-100 to-blue-200 border-blue-400/40 shadow-md'
              }`}
            >
              <p
                className={`text-lg font-medium ${
                  isDark ? 'text-white' : 'text-gray-900'
                }`}
              >
                {result}
              </p>
            </motion.div>
          ))}
        </div>
      </div>

      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
        transition={{ duration: 0.6, delay: 1.3 }}
        className={`rounded-2xl p-8 md:p-12 text-center border ${
          isDark
            ? 'bg-gradient-to-r from-red-900/30 to-yellow-900/30 border-red-500/30'
            : 'bg-gradient-to-br from-blue-100 via-blue-50 to-blue-200 border-blue-400/40 shadow-xl shadow-blue-500/20'
        }`}
      >
        <h3
          className={`text-2xl md:text-3xl font-bold mb-4 ${
            isDark ? 'text-white' : 'text-gray-900'
          }`}
        >
          {isDark ? 'Interested in Similar Solutions?' : 'Seek Similar Glory?'}
        </h3>
        <p className={`mb-6 ${isDark ? 'text-gray-300' : 'text-gray-800'}`}>
          {isDark
            ? "Let's discuss how I can help bring your vision to life."
            : 'Let us forge your legend together.'}
        </p>
        <Link
          to="/contact"
          className={`inline-block px-8 py-4 rounded-xl font-medium transition-all duration-300 hover:scale-105 ${
            isDark
              ? 'bg-gradient-to-r from-red-600 to-yellow-500 text-white hover:shadow-lg hover:shadow-red-500/50'
              : 'bg-gradient-to-r from-blue-600 to-blue-500 text-white hover:shadow-lg hover:shadow-blue-500/50'
          }`}
        >
          {isDark ? 'Start a Conversation' : 'Begin Quest'}
        </Link>
      </motion.div>
    </>
  );
}
