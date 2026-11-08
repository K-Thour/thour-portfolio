import { motion, useReducedMotion } from 'motion/react';
import { Link } from 'react-router';
import { ArrowRight, Trophy, Sparkles } from 'lucide-react';
import { useContext } from 'react';
import { ThemeContext } from '../../context/ThemeContext';
import { type ProjectData } from '../../../data/projects';

interface ProjectResultsProps {
  project: ProjectData;
}

const SMOOTH_EASE = [0.22, 1, 0.36, 1] as const;

export function ProjectResults({ project }: ProjectResultsProps) {
  const themeCtx = useContext(ThemeContext);
  const isDark = themeCtx ? themeCtx.theme === 'avengers' : true;
  const shouldReduceMotion = useReducedMotion() ?? false;

  return (
    <>
      {/* Results & Quantified Metrics */}
      {Array.isArray(project.results) && project.results.length > 0 && (
        <div data-testid="project-results" className="mb-14">
          <h2
            className={`text-2xl font-bold mb-6 flex items-center gap-2 tracking-tight ${
              isDark ? 'text-white' : 'text-slate-900'
            }`}
            style={{ letterSpacing: '-0.01em' }}
          >
            <Trophy
              className={`w-5 h-5 ${isDark ? 'text-yellow-400' : 'text-amber-600'}`}
            />
            <span>{isDark ? 'Results & Measurable Outcomes' : 'Spoils of Victory'}</span>
          </h2>

          <div className="grid sm:grid-cols-2 gap-4">
            {project.results.map((result, index) => (
              <motion.div
                key={result}
                initial={{ opacity: 0, scale: shouldReduceMotion ? 1 : 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={
                  shouldReduceMotion
                    ? { duration: 0 }
                    : { duration: 0.45, delay: 0.1 + index * 0.05, ease: SMOOTH_EASE }
                }
                whileHover={
                  shouldReduceMotion
                    ? undefined
                    : { y: -2, scale: 1.01, transition: { type: 'spring', bounce: 0, duration: 0.25 } }
                }
                className={`relative p-6 rounded-2xl border backdrop-blur-xl backdrop-saturate-[180%] text-center shadow-md overflow-hidden ${
                  isDark
                    ? 'bg-slate-800/60 border-white/[0.08] hover:border-red-500/30'
                    : 'bg-white/90 border-black/[0.06] shadow-sm hover:border-blue-300'
                }`}
              >
                {/* Top hairline */}
                <div
                  aria-hidden="true"
                  className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-white/30 to-transparent"
                />

                <p
                  className={`text-base font-semibold leading-relaxed ${
                    isDark ? 'text-white' : 'text-slate-900'
                  }`}
                >
                  {result}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      )}

      {/* Conversion Banner */}
      <motion.div
        data-testid="project-cta-banner"
        initial={{ opacity: 0, y: shouldReduceMotion ? 0 : 24 }}
        animate={{ opacity: 1, y: 0 }}
        transition={
          shouldReduceMotion
            ? { duration: 0 }
            : { duration: 0.55, delay: 0.2, ease: SMOOTH_EASE }
        }
        className={`relative rounded-3xl p-8 sm:p-12 text-center border backdrop-blur-xl backdrop-saturate-[180%] shadow-2xl overflow-hidden ${
          isDark
            ? 'bg-gradient-to-b from-slate-900 via-slate-950 to-red-950/40 border-red-500/20'
            : 'bg-gradient-to-b from-blue-50 via-white to-blue-50/90 border-blue-200/60 shadow-xl'
        }`}
      >
        {/* Top hairline */}
        <div
          aria-hidden="true"
          className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-white/30 to-transparent"
        />

        <div className="relative z-10 max-w-2xl mx-auto">
          <div
            className={`inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full border mb-4 text-xs font-semibold uppercase tracking-wider backdrop-blur-md ${
              isDark
                ? 'bg-red-500/10 border-red-500/30 text-red-400'
                : 'bg-blue-500/10 border-blue-500/30 text-blue-700'
            }`}
          >
            <Sparkles className="w-3.5 h-3.5" />
            <span>Collaborate on Your Next Vision</span>
          </div>

          <h3
            className={`text-2xl sm:text-3xl font-extrabold mb-4 tracking-tight ${
              isDark ? 'text-white' : 'text-slate-900'
            }`}
            style={{ letterSpacing: '-0.02em' }}
          >
            {isDark
              ? 'Interested in Similar High-Impact Solutions?'
              : 'Seek to Forge Similar Legend?'}
          </h3>

          <p
            className={`text-base sm:text-lg mb-8 leading-relaxed ${
              isDark ? 'text-slate-300' : 'text-slate-600'
            }`}
          >
            {isDark
              ? 'Let us discuss how my full-stack expertise and architectural focus can help achieve your product milestones.'
              : 'Together we shall forge enduring digital achievements worthy of the highest standards.'}
          </p>

          <motion.div
            whileHover={shouldReduceMotion ? undefined : { scale: 1.02 }}
            whileTap={shouldReduceMotion ? undefined : { scale: 0.97 }}
            transition={{ type: 'spring', bounce: 0, duration: 0.3 }}
            className="inline-block"
          >
            <Link
              to="/contact"
              aria-label="Start a conversation"
              className={`min-h-[44px] px-8 py-3.5 rounded-xl font-bold inline-flex items-center justify-center gap-2 shadow-lg focus:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 ${
                isDark
                  ? 'bg-gradient-to-r from-red-600 to-yellow-500 text-white hover:shadow-red-500/30 focus-visible:ring-red-500'
                  : 'bg-gradient-to-r from-blue-600 to-indigo-600 text-white hover:shadow-blue-500/30 focus-visible:ring-blue-500'
              }`}
            >
              <span>{isDark ? 'Start a Conversation' : 'Begin Quest'}</span>
              <ArrowRight className="w-4 h-4" />
            </Link>
          </motion.div>
        </div>
      </motion.div>
    </>
  );
}
