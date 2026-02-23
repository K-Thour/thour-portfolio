import { motion } from 'motion/react';
import { useTheme } from '../../context/ThemeContext';

interface AboutMissionProps {
  isInView: boolean;
}

export function AboutMission({ isInView }: AboutMissionProps) {
  const { theme } = useTheme();
  const isDark = theme === 'avengers';

  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
      transition={{ duration: 0.6, delay: 0.9 }}
      className={`rounded-2xl p-8 md:p-12 border ${
        isDark
          ? 'bg-gradient-to-r from-red-900/30 to-yellow-900/30 border-red-500/30'
          : 'bg-gradient-to-br from-blue-100 via-blue-50 to-blue-200 border-blue-400/40 shadow-xl shadow-blue-500/20'
      }`}
    >
      <div className="max-w-3xl mx-auto text-center">
        <h3
          className={`text-2xl md:text-3xl font-bold mb-4 ${
            isDark ? 'text-white' : 'text-gray-900'
          }`}
        >
          {isDark
            ? '"Innovation Distinguishes Leaders from Followers"'
            : '"The Axe Forgets, But The Tree Remembers"'}
        </h3>
        <p
          className={`mb-6 leading-relaxed ${
            isDark ? 'text-gray-300' : 'text-gray-800'
          }`}
        >
          {isDark
            ? 'I believe in writing code that not only works but tells a story. Every project is an opportunity to learn something new, push boundaries, and create solutions that make a real impact. From AI-powered applications to elegant user interfaces, I bring dedication and expertise to every challenge.'
            : 'Every line of code is a strike of the hammer, shaping the digital realm. I craft with honor and precision, ensuring each creation stands the test of time. My skills are forged through relentless pursuit of mastery, and my code echoes through eternity.'}
        </p>
        <div className="flex flex-wrap gap-4 justify-center">
          <span
            className={`px-6 py-2 rounded-full text-sm font-medium border ${
              isDark
                ? 'bg-slate-900/80 border-red-500/30 text-white'
                : 'bg-white border-blue-400/50 text-gray-800 shadow-sm'
            }`}
          >
            {isDark ? 'Continuous Learning' : 'Eternal Growth'}
          </span>
          <span
            className={`px-6 py-2 rounded-full text-sm font-medium border ${
              isDark
                ? 'bg-slate-900/80 border-yellow-500/30 text-white'
                : 'bg-white border-blue-400/50 text-gray-800 shadow-sm'
            }`}
          >
            {isDark ? 'Problem Solver' : 'Challenge Seeker'}
          </span>
          <span
            className={`px-6 py-2 rounded-full text-sm font-medium border ${
              isDark
                ? 'bg-slate-900/80 border-blue-500/30 text-white'
                : 'bg-white border-blue-400/50 text-gray-800 shadow-sm'
            }`}
          >
            {isDark ? 'Team Player' : 'Brotherhood'}
          </span>
        </div>
      </div>
    </motion.div>
  );
}
