import React, { useRef, useEffect, useState, useContext } from 'react';
import { motion, useInView, useReducedMotion, useReducedMotionConfig } from 'motion/react';
import { Users, Briefcase, CheckCircle, Code } from 'lucide-react';
import { ThemeContext } from '../context/ThemeContext';
import { UserContext } from '../context/UserContext';

const SMOOTH_EASE = [0.22, 1, 0.36, 1] as const;

export function Stats() {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, amount: 0.15 });
  const themeContext = useContext(ThemeContext);
  const isDark = themeContext ? themeContext.theme === 'avengers' : true;
  const userContext = useContext(UserContext);
  const userData = userContext?.userData;

  const motionReducedConfig = useReducedMotionConfig();
  const motionReducedDevice = useReducedMotion();
  const shouldReduceMotion = Boolean(
    motionReducedConfig === true ||
      (motionReducedConfig !== false && motionReducedDevice),
  );

  const stats = [
    {
      icon: Briefcase,
      value: userData?.experience ?? 5,
      suffix: '+',
      label: 'Years Experience',
      id: 'experience',
    },
    {
      icon: CheckCircle,
      value: userData?.completedProjects ?? 50,
      suffix: '+',
      label: 'Completed Projects',
      id: 'completed-projects',
    },
    {
      icon: Users,
      value: userData?.happyClients ?? 30,
      suffix: '+',
      label: 'Happy Clients',
      id: 'happy-clients',
    },
    {
      icon: Code,
      value: userData?.solvedProblems ?? 200,
      suffix: '+',
      label: 'Solved Problems',
      id: 'solved-problems',
    },
  ];

  return (
    <section
      aria-label="Key developer metrics"
      className={`py-16 sm:py-20 relative overflow-hidden ${
        isDark ? 'bg-slate-900' : 'bg-gradient-to-br from-blue-50/50 to-indigo-50/50'
      }`}
    >
      <div className="container mx-auto px-6">
        <div
          ref={ref}
          role="list"
          className="max-w-6xl mx-auto grid grid-cols-2 md:grid-cols-4 gap-4 sm:gap-6"
        >
          {stats.map((stat, index) => {
            const Icon = stat.icon;
            return (
              <StatCard
                key={stat.label}
                icon={Icon}
                value={stat.value}
                suffix={stat.suffix}
                label={stat.label}
                delay={index * 0.08}
                isInView={isInView}
                isDark={isDark}
                shouldReduceMotion={shouldReduceMotion}
              />
            );
          })}
        </div>
      </div>
    </section>
  );
}

interface StatCardProps {
  icon: React.ComponentType<{ className?: string; 'aria-hidden'?: boolean | 'true' | 'false' }>;
  value: number;
  suffix: string;
  label: string;
  delay: number;
  isInView: boolean;
  isDark: boolean;
  shouldReduceMotion: boolean;
}

function StatCard({
  icon: Icon,
  value,
  suffix,
  label,
  delay,
  isInView,
  isDark,
  shouldReduceMotion,
}: StatCardProps) {
  const [count, setCount] = useState(() => (shouldReduceMotion ? value : 0));

  useEffect(() => {
    if (!isInView) return;

    if (shouldReduceMotion) {
      setCount(value);
      return;
    }

    let startTime: number | null = null;
    let animationFrameId: number;
    const duration = 1400;

    const step = (timestamp: number) => {
      if (startTime === null) startTime = timestamp;
      const progress = Math.min((timestamp - startTime) / duration, 1);
      // easeOutExpo
      const easeProgress = progress === 1 ? 1 : 1 - Math.pow(2, -10 * progress);
      setCount(Math.round(easeProgress * value));

      if (progress < 1) {
        animationFrameId = requestAnimationFrame(step);
      }
    };

    animationFrameId = requestAnimationFrame(step);

    return () => {
      cancelAnimationFrame(animationFrameId);
    };
  }, [isInView, value, shouldReduceMotion]);

  return (
    <motion.div
      role="listitem"
      aria-label={`${label}: ${value}${suffix}`}
      initial={{ opacity: 0, y: shouldReduceMotion ? 0 : 15 }}
      animate={
        isInView
          ? { opacity: 1, y: 0 }
          : { opacity: 0, y: shouldReduceMotion ? 0 : 15 }
      }
      transition={
        shouldReduceMotion
          ? { duration: 0.15 }
          : {
              default: { type: 'spring', bounce: 0, duration: 0.35 },
              opacity: { duration: 0.5, delay, ease: SMOOTH_EASE },
              y: { duration: 0.5, delay, ease: SMOOTH_EASE },
            }
      }
      whileHover={shouldReduceMotion ? undefined : { y: -3, scale: 1.02 }}
      whileTap={shouldReduceMotion ? undefined : { scale: 0.98 }}
      className={`relative overflow-hidden text-center p-6 sm:p-7 rounded-2xl border backdrop-blur-xl backdrop-saturate-[180%] transition-colors cursor-default select-none ${
        isDark
          ? 'bg-slate-800/40 border-white/10 hover:border-white/20 shadow-lg shadow-black/20 hover:shadow-red-500/10'
          : 'bg-white/60 border-black/10 hover:border-black/20 shadow-md shadow-blue-500/5 hover:shadow-blue-500/15'
      }`}
    >
      {/* Top hairline light-catcher */}
      <div
        className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-white/20 to-transparent pointer-events-none"
        aria-hidden="true"
      />

      <div
        className={`w-11 h-11 mx-auto mb-3.5 rounded-xl flex items-center justify-center border transition-colors ${
          isDark
            ? 'bg-red-500/10 text-red-400 border-red-500/20'
            : 'bg-blue-50 text-blue-600 border-blue-200/50'
        }`}
      >
        <Icon className="w-5 h-5" aria-hidden="true" />
      </div>

      <div
        aria-hidden="true"
        className={`text-3xl sm:text-4xl font-extrabold tracking-tight mb-1.5 tabular-nums ${
          isDark ? 'text-white' : 'text-gray-900'
        }`}
      >
        {`${count}${suffix}`}
      </div>
      <div
        className={`text-xs sm:text-sm font-medium tracking-wide ${
          isDark ? 'text-gray-400' : 'text-gray-600'
        }`}
      >
        {label}
      </div>
    </motion.div>
  );
}
