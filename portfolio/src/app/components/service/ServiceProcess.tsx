import { motion, useReducedMotion } from 'motion/react';
import { Link } from 'react-router';
import { ArrowRight, Sparkles } from 'lucide-react';
import { useContext } from 'react';
import { ThemeContext } from '../../context/ThemeContext';

interface ServiceProcessProps {
  service: any;
}

const SMOOTH_EASE = [0.22, 1, 0.36, 1] as const;

export function ServiceProcess({ service }: ServiceProcessProps) {
  const themeCtx = useContext(ThemeContext);
  const isDark = themeCtx ? themeCtx.theme === 'avengers' : true;
  const shouldReduceMotion = useReducedMotion() ?? false;

  return (
    <>
      {service.process && service.process.length > 0 && (
        <div data-testid="service-process" className="mb-14">
          <h2
            className={`text-2xl font-bold mb-6 tracking-tight ${
              isDark ? 'text-white' : 'text-slate-900'
            }`}
            style={{ letterSpacing: '-0.01em' }}
          >
            {isDark ? 'Engagement & Delivery Roadmap' : 'Path to Victory'}
          </h2>

          <div className="grid sm:grid-cols-2 gap-6">
            {service.process.map((step: any, index: any) => (
              <motion.div
                key={step.title}
                initial={{ opacity: 0, y: shouldReduceMotion ? 0 : 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={
                  shouldReduceMotion
                    ? { duration: 0 }
                    : { duration: 0.5, delay: 0.1 + index * 0.08, ease: SMOOTH_EASE }
                }
                whileHover={
                  shouldReduceMotion
                    ? undefined
                    : { y: -3, scale: 1.01, transition: { type: 'spring', bounce: 0, duration: 0.25 } }
                }
                className={`relative p-6 sm:p-7 rounded-2xl border backdrop-blur-xl backdrop-saturate-[180%] shadow-md overflow-hidden ${
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

                <div className="flex items-center gap-3.5 mb-3">
                  <div
                    className={`w-9 h-9 rounded-xl flex items-center justify-center font-bold text-sm shadow-md ${
                      isDark
                        ? 'bg-gradient-to-br from-red-600 to-yellow-500 text-white'
                        : 'bg-gradient-to-br from-blue-600 to-indigo-600 text-white shadow-blue-500/20'
                    }`}
                  >
                    {index + 1}
                  </div>
                  <h3
                    className={`text-lg font-bold tracking-tight ${
                      isDark ? 'text-white' : 'text-slate-900'
                    }`}
                  >
                    {step.title}
                  </h3>
                </div>

                <p
                  className={`text-sm leading-relaxed ${
                    isDark ? 'text-slate-300' : 'text-slate-600'
                  }`}
                >
                  {step.description}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      )}

      {/* Conversion Banner */}
      <motion.div
        data-testid="service-cta-banner"
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
            <span>Consultation &amp; Scoping</span>
          </div>

          <h3
            className={`text-2xl sm:text-3xl font-extrabold mb-4 tracking-tight ${
              isDark ? 'text-white' : 'text-slate-900'
            }`}
            style={{ letterSpacing: '-0.02em' }}
          >
            {isDark
              ? 'Ready to Elevate Your Engineering Capabilities?'
              : 'Ready to Embark on This Quest?'}
          </h3>

          <p
            className={`text-base sm:text-lg mb-8 leading-relaxed ${
              isDark ? 'text-slate-300' : 'text-slate-600'
            }`}
          >
            {isDark
              ? 'Let us discuss how this service tier aligns with your product goals, team structure, and deployment timelines.'
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
              aria-label="Initiate service consultation"
              className={`min-h-[44px] px-8 py-3.5 rounded-xl font-bold inline-flex items-center justify-center gap-2 shadow-lg focus:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 ${
                isDark
                  ? 'bg-gradient-to-r from-red-600 to-yellow-500 text-white hover:shadow-red-500/30 focus-visible:ring-red-500'
                  : 'bg-gradient-to-r from-blue-600 to-indigo-600 text-white hover:shadow-blue-500/30 focus-visible:ring-blue-500'
              }`}
            >
              <span>{isDark ? 'Start Consultation' : 'Send Word'}</span>
              <ArrowRight className="w-4 h-4" />
            </Link>
          </motion.div>
        </div>
      </motion.div>
    </>
  );
}
