import { motion, useReducedMotion } from 'motion/react';
import { Link } from 'react-router';
import { ArrowRight, Sparkles } from 'lucide-react';
import { useContext } from 'react';
import { ThemeContext } from '../../context/ThemeContext';

interface ProjectsCtaProps {
  isInView?: boolean;
}

const SMOOTH_EASE = [0.22, 1, 0.36, 1] as const;

export function ProjectsCta({ isInView = true }: ProjectsCtaProps) {
  const themeCtx = useContext(ThemeContext);
  const isDark = themeCtx ? themeCtx.theme === 'avengers' : true;
  const shouldReduceMotion = useReducedMotion() ?? false;

  return (
    <motion.div
      data-testid="projects-cta"
      initial={{ opacity: 0, y: shouldReduceMotion ? 0 : 30 }}
      animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: shouldReduceMotion ? 0 : 30 }}
      transition={
        shouldReduceMotion
          ? { duration: 0 }
          : { duration: 0.6, ease: SMOOTH_EASE }
      }
      className="mt-20 text-center"
    >
      <div
        className={`relative rounded-3xl p-8 sm:p-12 md:p-14 border backdrop-blur-xl backdrop-saturate-[180%] max-w-3xl mx-auto shadow-2xl overflow-hidden ${
          isDark
            ? 'bg-gradient-to-b from-slate-900 via-slate-950 to-red-950/40 border-red-500/20'
            : 'bg-gradient-to-b from-blue-50 via-white to-blue-50/90 border-blue-200/60 shadow-xl'
        }`}
      >
        {/* Top hairline highlight */}
        <div
          aria-hidden="true"
          className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-white/30 to-transparent"
        />

        {/* Ambient glow accent */}
        <div
          aria-hidden="true"
          className={`absolute -top-24 -left-24 w-80 h-80 rounded-full blur-3xl opacity-20 pointer-events-none ${
            isDark ? 'bg-red-500' : 'bg-blue-400'
          }`}
        />

        <div className="relative z-10">
          <div
            className={`inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full border mb-4 text-xs font-semibold uppercase tracking-wider backdrop-blur-md ${
              isDark
                ? 'bg-red-500/10 border-red-500/30 text-red-400'
                : 'bg-blue-500/10 border-blue-500/30 text-blue-700'
            }`}
          >
            <Sparkles className="w-3.5 h-3.5" />
            <span>Custom Engineering</span>
          </div>

          <h3
            className={`text-2xl sm:text-3xl md:text-4xl font-extrabold mb-4 tracking-tight ${
              isDark ? 'text-white' : 'text-slate-900'
            }`}
            style={{ letterSpacing: '-0.02em' }}
          >
            {isDark
              ? "Let's Build Something Extraordinary"
              : 'Join Me in the Next Quest'}
          </h3>

          <p
            className={`text-base sm:text-lg mb-8 max-w-xl mx-auto leading-relaxed ${
              isDark ? 'text-slate-300' : 'text-slate-600'
            }`}
          >
            {isDark
              ? 'Have an ambitious product in mind? Let us collaborate to architect and ship reliable, high-performance software.'
              : 'Together we shall forge enduring digital creations worthy of the highest engineering honors.'}
          </p>

          <motion.div
            whileHover={shouldReduceMotion ? undefined : { scale: 1.02 }}
            whileTap={shouldReduceMotion ? undefined : { scale: 0.97 }}
            transition={{ type: 'spring', bounce: 0, duration: 0.3 }}
            className="inline-block"
          >
            <Link
              to="/contact"
              aria-label="Start a project inquiry"
              className={`min-h-[44px] px-8 py-3.5 rounded-xl font-bold inline-flex items-center justify-center gap-2 shadow-lg focus:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 ${
                isDark
                  ? 'bg-gradient-to-r from-red-600 to-yellow-500 text-white hover:shadow-red-500/30 focus-visible:ring-red-500'
                  : 'bg-gradient-to-r from-blue-600 to-indigo-600 text-white hover:shadow-blue-500/30 focus-visible:ring-blue-500'
              }`}
            >
              <span>{isDark ? 'Start a Project' : 'Begin the Journey'}</span>
              <ArrowRight className="w-4 h-4" />
            </Link>
          </motion.div>
        </div>
      </div>
    </motion.div>
  );
}
