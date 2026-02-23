import { motion } from 'motion/react';
import { Target, Rocket, Brain } from 'lucide-react';
import { useTheme } from '../../context/ThemeContext';

interface AboutStatsProps {
  isInView: boolean;
}

export function AboutStats({ isInView }: AboutStatsProps) {
  const { theme } = useTheme();
  const isDark = theme === 'avengers';

  const stats = [
    {
      id: 'projects',
      icon: Target,
      value: '50+',
      label: isDark ? 'Projects Completed' : 'Victories Claimed',
    },
    {
      id: 'experience',
      icon: Rocket,
      value: '5+',
      label: isDark ? 'Years Experience' : 'Years of Battle',
    },
    {
      id: 'problems',
      icon: Brain,
      value: '100+',
      label: isDark ? 'Problems Solved' : 'Challenges Conquered',
    },
  ];

  return (
    <div className="grid grid-cols-3 gap-6 mb-16">
      {stats.map((stat, index) => {
        const Icon = stat.icon;
        return (
          <motion.div
            key={stat.id}
            initial={{ opacity: 0, y: 30 }}
            animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
            transition={{ duration: 0.6, delay: index * 0.1 }}
            className={`text-center p-6 rounded-xl border transition-all ${
              isDark
                ? 'bg-slate-800/50 border-red-500/20 hover:border-red-500/50'
                : 'bg-gradient-to-br from-white to-blue-50 border-blue-300/40 hover:border-blue-500/60 shadow-md hover:shadow-xl hover:shadow-blue-500/20'
            }`}
          >
            <Icon
              className={`w-8 h-8 mx-auto mb-3 ${
                isDark ? 'text-red-500' : 'text-amber-700'
              }`}
            />
            <div
              className={`text-3xl font-bold mb-1 ${
                isDark ? 'text-white' : 'text-gray-900'
              }`}
            >
              {stat.value}
            </div>
            <div
              className={`text-sm ${isDark ? 'text-gray-400' : 'text-gray-700'}`}
            >
              {stat.label}
            </div>
          </motion.div>
        );
      })}
    </div>
  );
}
