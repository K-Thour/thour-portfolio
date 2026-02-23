import { motion } from 'motion/react';
import { useInView } from 'motion/react';
import { useRef, useEffect, useState } from 'react';
import { Coffee, GitBranch, Users, Zap } from 'lucide-react';
import { useTheme } from '../context/ThemeContext';

export function Stats() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, amount: 0.5 });
  const { theme } = useTheme();
  const isDark = theme === 'avengers';

  const stats = [
    {
      icon: GitBranch,
      value: 500,
      suffix: '+',
      label: 'Commits This Year',
    },
    { icon: Coffee, value: 1000, suffix: '+', label: 'Cups of Coffee' },
    { icon: Users, value: 30, suffix: '+', label: 'Happy Clients' },
    { icon: Zap, value: 99, suffix: '%', label: 'Uptime' },
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
                delay={index * 0.1}
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

    let start = 0;
    const duration = 2000;
    const increment = value / (duration / 16);

    const timer = setInterval(() => {
      start += increment;
      if (start >= value) {
        setCount(value);
        clearInterval(timer);
      } else {
        setCount(Math.floor(start));
      }
    }, 16);

    return () => clearInterval(timer);
  }, [isInView, value]);

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
      transition={{ duration: 0.6, delay }}
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
