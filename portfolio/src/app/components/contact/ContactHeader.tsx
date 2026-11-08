import { useContext } from 'react';
import { motion } from 'motion/react';
import { Shield, Axe, Clock } from 'lucide-react';
import { ThemeContext } from '../../context/ThemeContext';

interface ContactHeaderProps {
  isInView?: boolean;
}

export function ContactHeader({ isInView = true }: ContactHeaderProps) {
  const themeCtx = useContext(ThemeContext);
  const isDark = themeCtx ? themeCtx.theme === 'avengers' : true;

  return (
    <div className="text-center mb-16">
      <motion.div
        initial={{ opacity: 0, y: 15 }}
        animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 15 }}
        transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
        className="flex items-center justify-center gap-2 mb-4"
      >
        <span
          className={`inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full text-xs font-semibold tracking-wider uppercase border backdrop-blur-md shadow-xs ${
            isDark
              ? 'bg-red-500/10 border-red-500/20 text-red-400'
              : 'bg-blue-500/10 border-blue-500/20 text-blue-700'
          }`}
        >
          {isDark ? (
            <Shield className="w-3.5 h-3.5 text-red-500" />
          ) : (
            <Axe className="w-3.5 h-3.5 text-blue-600" />
          )}
          <span>{isDark ? 'Mission Comms' : 'Hall of Council'}</span>
        </span>
      </motion.div>

      <motion.h1
        initial={{ opacity: 0, y: 20 }}
        animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
        transition={{ duration: 0.6, delay: 0.1, ease: [0.22, 1, 0.36, 1] }}
        className={`text-4xl sm:text-5xl lg:text-6xl font-extrabold tracking-[-0.025em] mb-5 ${
          isDark ? 'text-white' : 'text-slate-900'
        }`}
      >
        {isDark ? (
          <>
            Let&apos;s Build Something{' '}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-red-500 via-amber-400 to-yellow-500">
              Legendary
            </span>
          </>
        ) : (
          <>
            Forge Your Vision with{' '}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 via-indigo-600 to-amber-600">
              Precision
            </span>
          </>
        )}
      </motion.h1>

      <motion.p
        initial={{ opacity: 0, y: 20 }}
        animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
        transition={{ duration: 0.6, delay: 0.15, ease: [0.22, 1, 0.36, 1] }}
        className={`text-lg sm:text-xl max-w-2xl mx-auto leading-relaxed mb-6 ${
          isDark ? 'text-slate-400' : 'text-slate-600'
        }`}
      >
        {isDark
          ? 'Have an ambitious product, architectural challenge, or engineering collaboration? Reach out through direct channels or send a project brief.'
          : 'Ready to build high-performance systems and timeless software? Send word and we shall turn ideas into production reality.'}
      </motion.p>

      {/* Response Time Indicator Badge */}
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={isInView ? { opacity: 1, scale: 1 } : { opacity: 0, scale: 0.95 }}
        transition={{ duration: 0.5, delay: 0.2 }}
        className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-medium border"
        style={{
          backgroundColor: isDark ? 'rgba(30, 41, 59, 0.5)' : 'rgba(241, 245, 249, 0.8)',
          borderColor: isDark ? 'rgba(255, 255, 255, 0.08)' : 'rgba(0, 0, 0, 0.08)',
          color: isDark ? '#94a3b8' : '#475569',
        }}
      >
        <Clock className="w-3.5 h-3.5 text-emerald-500 animate-pulse" />
        <span>Response Time: Typically within 2 hours</span>
      </motion.div>
    </div>
  );
}
