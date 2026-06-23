import { motion } from 'motion/react';

interface ErrorCodeProps {
  isDark: boolean;
}

export function ErrorCode({ isDark }: ErrorCodeProps) {
  return (
    <motion.p
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.6, delay: 0.7 }}
      className={`mt-8 text-xs font-mono tracking-widest uppercase ${
        isDark ? 'text-slate-600' : 'text-slate-400'
      }`}
    >
      {isDark
        ? 'ERROR_CODE: AVENGERS_404_NOT_FOUND'
        : 'ERROR_RUNE: RAGNAROK_404_PATH_LOST'}
    </motion.p>
  );
}
