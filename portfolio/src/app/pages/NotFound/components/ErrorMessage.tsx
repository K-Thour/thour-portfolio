import { motion } from 'motion/react';

interface ErrorMessageProps {
  isDark: boolean;
}

export function ErrorMessage({ isDark }: ErrorMessageProps) {
  return (
    <>
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
          {isDark ? 'Mission Not Found' : 'Path Lost in the Frost'}
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
          ? "The page you're looking for has been snapped out of existence. Even JARVIS can't locate it."
          : 'The path you seek is hidden in the eternal winter. The runes offer no guidance here.'}
      </motion.p>
    </>
  );
}
