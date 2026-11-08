import { motion, useReducedMotion } from 'motion/react';
import { useContext } from 'react';
import { Sparkles, Code2, Heart, Award } from 'lucide-react';
import { ThemeContext } from '../../context/ThemeContext';

interface AboutMissionProps {
  isInView?: boolean;
}

const SMOOTH_EASE = [0.22, 1, 0.36, 1] as const;

export function AboutMission({ isInView = true }: AboutMissionProps) {
  const themeCtx = useContext(ThemeContext);
  const isDark = themeCtx ? themeCtx.theme === 'avengers' : true;
  const shouldReduceMotion = useReducedMotion() ?? false;

  const pillars = [
    {
      id: 'learning',
      label: isDark ? 'Continuous Learning' : 'Eternal Growth',
      icon: Sparkles,
      color: isDark ? 'text-red-400 border-red-500/30' : 'text-blue-600 border-blue-400/40',
    },
    {
      id: 'solving',
      label: isDark ? 'Problem Solver' : 'Challenge Seeker',
      icon: Code2,
      color: isDark ? 'text-yellow-400 border-yellow-500/30' : 'text-amber-600 border-amber-400/40',
    },
    {
      id: 'teamwork',
      label: isDark ? 'Team Player' : 'Brotherhood & Honor',
      icon: Heart,
      color: isDark ? 'text-blue-400 border-blue-500/30' : 'text-indigo-600 border-indigo-400/40',
    },
    {
      id: 'excellence',
      label: isDark ? 'Excellence in Craft' : 'Crafted for Eternity',
      icon: Award,
      color: isDark ? 'text-emerald-400 border-emerald-500/30' : 'text-emerald-600 border-emerald-400/40',
    },
  ];

  return (
    <motion.div
      data-testid="about-mission"
      initial={{ opacity: 0, y: shouldReduceMotion ? 0 : 30 }}
      animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: shouldReduceMotion ? 0 : 30 }}
      transition={
        shouldReduceMotion
          ? { duration: 0 }
          : { duration: 0.6, ease: SMOOTH_EASE }
      }
      className={`rounded-3xl p-8 sm:p-12 md:p-16 border backdrop-blur-xl backdrop-saturate-[180%] relative overflow-hidden shadow-2xl ${
        isDark
          ? 'bg-gradient-to-b from-slate-900 via-slate-950 to-red-950/40 border-red-500/20'
          : 'bg-gradient-to-b from-blue-50 via-white to-blue-50/80 border-blue-200/60 shadow-xl'
      }`}
    >
      {/* Top hairline highlight */}
      <div
        aria-hidden="true"
        className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-white/30 to-transparent"
      />

      {/* Background ambient blur */}
      <div
        aria-hidden="true"
        className={`absolute -top-24 -right-24 w-80 h-80 rounded-full blur-3xl opacity-20 pointer-events-none ${
          isDark ? 'bg-red-500' : 'bg-blue-400'
        }`}
      />

      <div className="max-w-3xl mx-auto text-center relative z-10">
        <h3
          className={`text-2xl sm:text-3xl md:text-4xl font-extrabold mb-6 tracking-tight ${
            isDark ? 'text-white' : 'text-slate-900'
          }`}
          style={{ letterSpacing: '-0.02em' }}
        >
          {isDark
            ? '"Innovation Distinguishes Leaders from Followers"'
            : '"The Axe Forgets, But The Tree Remembers"'}
        </h3>

        <p
          className={`text-base sm:text-lg mb-8 leading-relaxed ${
            isDark ? 'text-slate-300' : 'text-slate-600'
          }`}
        >
          {isDark
            ? 'I believe in writing code that not only functions reliably at scale, but communicates architectural clarity. Every project is an opportunity to push limits, engineer robust software, and deliver tangible user impact.'
            : 'Every line of code is a strike of the hammer, shaping the digital realm. I craft with honor, discipline, and precision, ensuring each creation stands the test of time, volume, and evolution.'}
        </p>

        <div className="flex flex-wrap gap-3 justify-center">
          {pillars.map((pillar) => {
            const Icon = pillar.icon;
            return (
              <motion.span
                key={pillar.id}
                whileHover={shouldReduceMotion ? undefined : { scale: 1.04 }}
                whileTap={shouldReduceMotion ? undefined : { scale: 0.97 }}
                transition={{ type: 'spring', bounce: 0, duration: 0.25 }}
                className={`px-5 py-2.5 rounded-full text-xs font-semibold border backdrop-blur-md inline-flex items-center gap-2 shadow-sm ${
                  isDark
                    ? `bg-slate-900/80 ${pillar.color}`
                    : `bg-white/90 ${pillar.color} shadow-sm`
                }`}
              >
                <Icon className="w-4 h-4" />
                <span>{pillar.label}</span>
              </motion.span>
            );
          })}
        </div>
      </div>
    </motion.div>
  );
}
