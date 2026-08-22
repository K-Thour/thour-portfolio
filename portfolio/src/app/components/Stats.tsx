import React, { useRef, useEffect, useState } from 'react';
import { motion } from 'motion/react';
import { useInView } from 'motion/react';
import {
  Users,
  Briefcase,
  CheckCircle,
  Code,
} from 'lucide-react';
import { useTheme } from '../context/ThemeContext';
import { useUser } from '../context/UserContext';

const SMOOTH_EASE = [0.22, 1, 0.36, 1];

export function Stats() {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, amount: 0.15 });
  const { theme } = useTheme();
  const isDark = theme === 'avengers';
  const { userData } = useUser();

  const stats = [
    {
      icon: Briefcase,
      value: userData?.experience || 5,
      suffix: '+',
      label: 'Years Experience',
    },
    {
      icon: CheckCircle,
      value: userData?.completedProjects || 50,
      suffix: '+',
      label: 'Completed Projects',
    },
    {
      icon: Users,
      value: userData?.happyClients || 30,
      suffix: '+',
      label: 'Happy Clients',
    },
    {
      icon: Code,
      value: userData?.solvedProblems || 200,
      suffix: '+',
      label: 'Solved Problems',
    },
  ];

  return (
    <section
      className={`py-16 ${isDark ? 'bg-slate-900' : 'bg-gradient-to-br from-blue-50 to-blue-100'}`}
    >
      <div className="container mx-auto px-6">
        <div
          ref={ref}
          className="max-w-6xl mx-auto grid grid-cols-2 md:grid-cols-4 gap-6"
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
              />
            );
          })}
        </div>
      </div>
    </section>
  );
}

function StatCard({
  icon: Icon,
  value,
  suffix,
  label,
  delay,
  isInView,
}: {
  icon: React.ComponentType<{ className?: string }>;
  value: number;
  suffix: string;
  label: string;
  delay: number;
  isInView: boolean;
}) {
  const [count, setCount] = useState(0);
  const { theme } = useTheme();
  const isDark = theme === 'avengers';

  useEffect(() => {
    if (!isInView) return;

    let startTime: number | null = null;
    let animationFrameId: number;
    const duration = 1400;

    const step = (timestamp: number) => {
      if (!startTime) startTime = timestamp;
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
  }, [isInView, value]);

  return (
    <motion.div
      initial={{ opacity: 0, y: 15 }}
      animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 15 }}
      transition={{ duration: 0.5, delay, ease: SMOOTH_EASE }}
      className={`text-center p-6 rounded-xl border transition-all ${
        isDark
          ? 'bg-slate-800/50 border-red-500/20 hover:border-red-500/50'
          : 'bg-gradient-to-br from-white to-blue-50 border-blue-300/40 hover:border-blue-500/60 shadow-md hover:shadow-lg hover:shadow-blue-500/20'
      }`}
    >
      <Icon
        className={`w-8 h-8 mx-auto mb-3 ${isDark ? 'text-red-500' : 'text-blue-600'}`}
      />
      <div
        className={`text-3xl font-bold mb-1 ${isDark ? 'text-white' : 'text-gray-900'}`}
      >
        {count}
        {suffix}
      </div>
      <div className={`text-sm ${isDark ? 'text-gray-400' : 'text-gray-700'}`}>
        {label}
      </div>
    </motion.div>
  );
}
