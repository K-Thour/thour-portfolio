import { motion, useReducedMotion } from 'motion/react';
import { Shield, Swords } from 'lucide-react';
import { useContext } from 'react';
import { ThemeContext } from '../../context/ThemeContext';

interface ProjectsHeaderProps {
  isInView?: boolean;
}

const SMOOTH_EASE = [0.22, 1, 0.36, 1] as const;

export function ProjectsHeader({ isInView = true }: ProjectsHeaderProps) {
  const themeCtx = useContext(ThemeContext);
  const isDark = themeCtx ? themeCtx.theme === 'avengers' : true;
  const shouldReduceMotion = useReducedMotion() ?? false;

  return (
    <div data-testid="projects-header" className="text-center mb-16 relative">
      {/* Eyebrow Badge */}
      <motion.div
        data-testid="projects-header-badge"
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
            <Swords className="w-4 h-4 text-blue-600" />
          )}
          <span>{isDark ? 'Project Showcase' : 'Saga of Triumphs'}</span>
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
        {isDark ? 'Featured Work & Case Studies' : 'Legendary Conquests & Builds'}
      </motion.h1>

      {/* Description */}
      <motion.p
        initial={{ opacity: 0, y: shouldReduceMotion ? 0 : 20 }}
        animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: shouldReduceMotion ? 0 : 20 }}
        transition={
          shouldReduceMotion
            ? { duration: 0 }
            : { duration: 0.6, delay: 0.16, ease: SMOOTH_EASE }
        }
        className={`text-lg sm:text-xl max-w-2xl mx-auto leading-relaxed ${
          isDark ? 'text-slate-300' : 'text-slate-600'
        }`}
      >
        {isDark
          ? 'A collection of recent production systems, distributed cloud applications, and interactive digital experiences.'
          : 'Tales of engineering battles won through rigorous architecture, clean code, and unwavering determination.'}
      </motion.p>
    </div>
  );
}
