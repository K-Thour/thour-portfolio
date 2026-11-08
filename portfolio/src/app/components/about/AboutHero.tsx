import { motion, useReducedMotion } from 'motion/react';
import { Shield, Hammer } from 'lucide-react';
import { useContext } from 'react';
import { ThemeContext } from '../../context/ThemeContext';

interface AboutHeroProps {
  isInView?: boolean;
}

const SMOOTH_EASE = [0.22, 1, 0.36, 1] as const;

export function AboutHero({ isInView = true }: AboutHeroProps) {
  const themeCtx = useContext(ThemeContext);
  const isDark = themeCtx ? themeCtx.theme === 'avengers' : true;
  const shouldReduceMotion = useReducedMotion() ?? false;

  return (
    <div data-testid="about-hero" className="text-center mb-16 relative">
      {/* Eyebrow Badge */}
      <motion.div
        data-testid="about-hero-badge"
        initial={{ opacity: 0, y: shouldReduceMotion ? 0 : 16 }}
        animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: shouldReduceMotion ? 0 : 16 }}
        transition={
          shouldReduceMotion
            ? { duration: 0 }
            : { duration: 0.5, ease: SMOOTH_EASE }
        }
        className="flex items-center justify-center gap-2 mb-4"
      >
        <div
          className={`inline-flex items-center gap-2 px-4 py-1.5 rounded-full border backdrop-blur-md text-xs font-semibold uppercase tracking-wider ${
            isDark
              ? 'bg-red-500/10 border-red-500/30 text-red-400'
              : 'bg-blue-500/10 border-blue-500/20 text-blue-700'
          }`}
        >
          {isDark ? (
            <Shield className="w-4 h-4 text-red-500" />
          ) : (
            <Hammer className="w-4 h-4 text-blue-600" />
          )}
          <span>{isDark ? 'Tech Arsenal & Philosophy' : "Warrior's Path & Codex"}</span>
        </div>
      </motion.div>

      {/* Main Title with Optical Tracking */}
      <motion.h1
        initial={{ opacity: 0, y: shouldReduceMotion ? 0 : 20 }}
        animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: shouldReduceMotion ? 0 : 20 }}
        transition={
          shouldReduceMotion
            ? { duration: 0 }
            : { duration: 0.55, delay: 0.08, ease: SMOOTH_EASE }
        }
        className={`text-4xl sm:text-5xl md:text-6xl font-extrabold mb-6 tracking-tight ${
          isDark ? 'text-white' : 'text-slate-900'
        }`}
        style={{ letterSpacing: '-0.02em' }}
      >
        {isDark ? 'Architecting with Precision' : 'Forging Enduring Systems'}
      </motion.h1>

      {/* Storytelling Narrative */}
      <motion.p
        initial={{ opacity: 0, y: shouldReduceMotion ? 0 : 20 }}
        animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: shouldReduceMotion ? 0 : 20 }}
        transition={
          shouldReduceMotion
            ? { duration: 0 }
            : { duration: 0.6, delay: 0.16, ease: SMOOTH_EASE }
        }
        className={`text-lg sm:text-xl max-w-3xl mx-auto leading-relaxed ${
          isDark ? 'text-slate-300' : 'text-slate-600'
        }`}
      >
        {isDark
          ? 'Driven by engineering rigor and a passion for high-concurrency systems, I build full-stack web applications, resilient microservices, and reactive AI experiences where every millisecond counts.'
          : 'Forged through complex engineering challenges, I craft digital experiences with precision and honor, ensuring every system built withstands the test of time and scale.'}
      </motion.p>
    </div>
  );
}
