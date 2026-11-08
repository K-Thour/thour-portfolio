import { motion, useReducedMotion } from 'motion/react';
import { Target, Rocket, Brain } from 'lucide-react';
import { useContext } from 'react';
import { ThemeContext } from '../../context/ThemeContext';
import { UserContext } from '../../context/UserContext';

interface AboutStatsProps {
  isInView?: boolean;
}

const SMOOTH_EASE = [0.22, 1, 0.36, 1] as const;

export function AboutStats({ isInView = true }: AboutStatsProps) {
  const themeCtx = useContext(ThemeContext);
  const isDark = themeCtx ? themeCtx.theme === 'avengers' : true;

  const userCtx = useContext(UserContext);
  const userData = userCtx?.userData;

  const shouldReduceMotion = useReducedMotion() ?? false;

  const stats = [
    {
      id: 'projects',
      icon: Target,
      value: userData?.completedProjects ? `${userData.completedProjects}+` : '50+',
      label: isDark ? 'Projects Delivered' : 'Victories Claimed',
      description: isDark ? 'Production apps & cloud platforms' : 'Conquests in code and scale',
    },
    {
      id: 'experience',
      icon: Rocket,
      value: userData?.experience ? `${userData.experience}+` : '5+',
      label: isDark ? 'Years of Experience' : 'Years of Battle',
      description: isDark ? 'Full-stack engineering & architecture' : 'Hardened through relentless craft',
    },
    {
      id: 'problems',
      icon: Brain,
      value: userData?.solvedProblems ? `${userData.solvedProblems}+` : '100+',
      label: isDark ? 'Problems Solved' : 'Challenges Conquered',
      description: isDark ? 'Algorithmic & system design feats' : 'Uncompromising technical solutions',
    },
  ];

  return (
    <div
      data-testid="about-stats-grid"
      className="grid grid-cols-1 sm:grid-cols-3 gap-6 mb-16"
    >
      {stats.map((stat, index) => {
        const Icon = stat.icon;
        return (
          <motion.div
            key={stat.id}
            data-testid={`about-stat-card-${stat.id}`}
            initial={{ opacity: 0, y: shouldReduceMotion ? 0 : 24 }}
            animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: shouldReduceMotion ? 0 : 24 }}
            transition={
              shouldReduceMotion
                ? { duration: 0 }
                : { duration: 0.5, delay: index * 0.1, ease: SMOOTH_EASE }
            }
            whileHover={
              shouldReduceMotion
                ? undefined
                : { y: -3, scale: 1.02, transition: { type: 'spring', bounce: 0, duration: 0.3 } }
            }
            className={`relative rounded-2xl p-6 sm:p-8 border backdrop-blur-xl backdrop-saturate-[180%] flex flex-col items-center text-center shadow-lg transition-colors overflow-hidden ${
              isDark
                ? 'bg-slate-800/60 border-white/[0.08] hover:border-red-500/30 hover:shadow-red-500/10'
                : 'bg-white/90 border-black/[0.06] shadow-sm hover:border-blue-400/40 hover:shadow-md hover:shadow-blue-500/10'
            }`}
          >
            {/* Top hairline highlight */}
            <div
              aria-hidden="true"
              className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-white/30 to-transparent"
            />

            {/* Icon Circle */}
            <div
              className={`w-14 h-14 rounded-2xl flex items-center justify-center mb-4 shadow-md ${
                isDark
                  ? 'bg-gradient-to-br from-red-600/20 to-red-900/30 text-red-400 border border-red-500/20'
                  : 'bg-gradient-to-br from-blue-50 to-indigo-100 text-blue-600 border border-blue-200/50'
              }`}
            >
              <Icon className="w-7 h-7" />
            </div>

            {/* Metric Value with Optical Tracking */}
            <div
              data-testid={`about-stat-value-${stat.id}`}
              className={`text-4xl sm:text-5xl font-extrabold mb-1 tracking-tight ${
                isDark ? 'text-white' : 'text-slate-900'
              }`}
              style={{ letterSpacing: '-0.02em' }}
            >
              {stat.value}
            </div>

            {/* Metric Label */}
            <div
              className={`text-sm font-bold uppercase tracking-wider mb-2 ${
                isDark ? 'text-red-400' : 'text-blue-700'
              }`}
            >
              {stat.label}
            </div>

            {/* Metric Subtitle */}
            <div
              className={`text-xs ${
                isDark ? 'text-slate-400' : 'text-slate-600'
              }`}
            >
              {stat.description}
            </div>
          </motion.div>
        );
      })}
    </div>
  );
}
