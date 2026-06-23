import { motion } from 'motion/react';

interface ErrorMessageProps {
  isDark: boolean;
}

export function ErrorMessage({ isDark }: ErrorMessageProps) {
  return (
    <motion.p
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, delay: 0.4 }}
      className={`text-base md:text-lg mb-10 max-w-md mx-auto leading-relaxed ${
        isDark ? 'text-slate-400' : 'text-slate-600'
      }`}
    >
      {isDark
        ? 'An unexpected error occurred in the Helicarrier systems. Iron Man is working on a fix.'
        : 'The Bifrost has shattered. The gods are fighting to restore order.'}
    </motion.p>
  );
}
