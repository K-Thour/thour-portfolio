import { motion } from 'motion/react';

interface ErrorSubTitleProps {
  isDark: boolean;
}

export function ErrorSubTitle({ isDark }: ErrorSubTitleProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, delay: 0.3 }}
    >
      <h2
        className={`text-3xl font-extrabold mb-4 tracking-tight ${isDark ? 'text-white' : 'text-slate-900'}`}
      >
        {isDark
          ? 'Shield Failure / System Malfunction'
          : 'Bifrost Shattered / Ragnarok Unleashed'}
      </h2>
    </motion.div>
  );
}
