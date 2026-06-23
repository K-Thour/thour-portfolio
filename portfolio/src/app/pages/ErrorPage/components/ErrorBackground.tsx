import { motion } from 'motion/react';
import { CodeRain } from '../../../components/CodeRain';

interface ErrorBackgroundProps {
  isDark: boolean;
}

export function ErrorBackground({ isDark }: ErrorBackgroundProps) {
  if (isDark) {
    return (
      <div className="absolute inset-0 z-0 overflow-hidden">
        <CodeRain />
        <div className="absolute inset-0 bg-gradient-to-t from-slate-950/80 via-transparent to-transparent pointer-events-none" />
      </div>
    );
  }

  return (
    <div className="absolute inset-0 z-0 overflow-hidden pointer-events-none">
      <motion.div
        className="absolute w-96 h-96 rounded-full blur-3xl bg-blue-600/5"
        animate={{ x: [0, 60, 0], y: [0, -60, 0] }}
        transition={{ duration: 18, repeat: Infinity, ease: 'easeInOut' }}
        style={{ top: '10%', left: '15%' }}
      />
      <motion.div
        className="absolute w-96 h-96 rounded-full blur-3xl bg-blue-400/5"
        animate={{ x: [0, -60, 0], y: [0, 60, 0] }}
        transition={{ duration: 14, repeat: Infinity, ease: 'easeInOut' }}
        style={{ bottom: '10%', right: '15%' }}
      />
    </div>
  );
}
