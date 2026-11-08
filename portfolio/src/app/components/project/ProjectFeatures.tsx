import { motion, useReducedMotion } from 'motion/react';
import { CheckCircle2, Zap, Shield, Swords } from 'lucide-react';
import { useContext } from 'react';
import { ThemeContext } from '../../context/ThemeContext';
import { type ProjectData } from '../../../data/projects';

interface ProjectFeaturesProps {
  project: ProjectData;
}

const SMOOTH_EASE = [0.22, 1, 0.36, 1] as const;

export function ProjectFeatures({ project }: ProjectFeaturesProps) {
  const themeCtx = useContext(ThemeContext);
  const isDark = themeCtx ? themeCtx.theme === 'avengers' : true;
  const shouldReduceMotion = useReducedMotion() ?? false;

  return (
    <>
      {/* Key Features */}
      {Array.isArray(project.features) &&
        project.features.length > 0 &&
        project.features[0] && (
          <div data-testid="project-features" className="mb-14">
            <h2
              className={`text-2xl font-bold mb-6 flex items-center gap-2 tracking-tight ${
                isDark ? 'text-white' : 'text-slate-900'
              }`}
              style={{ letterSpacing: '-0.01em' }}
            >
              {isDark ? (
                <Shield className="w-5 h-5 text-red-500" />
              ) : (
                <Swords className="w-5 h-5 text-blue-600" />
              )}
              <span>{isDark ? 'Key Architecture & Deliverables' : 'Legendary Features'}</span>
            </h2>

            <div className="grid sm:grid-cols-2 gap-4">
              {project.features.map((feature, index) => (
                <motion.div
                  key={feature}
                  initial={{ opacity: 0, x: shouldReduceMotion ? 0 : -16 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={
                    shouldReduceMotion
                      ? { duration: 0 }
                      : { duration: 0.45, delay: 0.05 + index * 0.04, ease: SMOOTH_EASE }
                  }
                  whileHover={
                    shouldReduceMotion
                      ? undefined
                      : { y: -2, scale: 1.01, transition: { type: 'spring', bounce: 0, duration: 0.25 } }
                  }
                  className={`relative p-5 rounded-2xl border backdrop-blur-xl backdrop-saturate-[180%] flex items-start gap-3.5 shadow-sm overflow-hidden ${
                    isDark
                      ? 'bg-slate-800/60 border-white/[0.08] hover:border-red-500/40 hover:shadow-red-500/10'
                      : 'bg-white/90 border-black/[0.06] hover:border-blue-300 shadow-sm hover:shadow-md'
                  }`}
                >
                  {/* Top hairline */}
                  <div
                    aria-hidden="true"
                    className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-white/30 to-transparent"
                  />

                  <CheckCircle2
                    className={`w-5 h-5 mt-0.5 flex-shrink-0 ${
                      isDark ? 'text-red-400' : 'text-blue-600'
                    }`}
                  />
                  <span
                    className={`text-sm leading-relaxed ${
                      isDark ? 'text-slate-200' : 'text-slate-700'
                    }`}
                  >
                    {feature}
                  </span>
                </motion.div>
              ))}
            </div>
          </div>
        )}

      {/* Technologies Used */}
      {Array.isArray(project.technologies) &&
        project.technologies.length > 0 && (
          <div data-testid="project-technologies" className="mb-14">
            <h2
              className={`text-2xl font-bold mb-6 flex items-center gap-2 tracking-tight ${
                isDark ? 'text-white' : 'text-slate-900'
              }`}
              style={{ letterSpacing: '-0.01em' }}
            >
              <Zap
                className={`w-5 h-5 ${isDark ? 'text-yellow-400' : 'text-blue-600'}`}
              />
              <span>{isDark ? 'Technologies & Stack' : 'Weapons Wielded'}</span>
            </h2>

            <div className="flex flex-wrap gap-3">
              {project.technologies.map((tech: any, index: number) => {
                const techObj =
                  typeof tech === 'string' ? { name: tech } : tech;
                const hasIcon = Boolean(techObj.iconUrl);

                return (
                  <motion.div
                    key={techObj._id || techObj.name}
                    initial={{ opacity: 0, scale: shouldReduceMotion ? 1 : 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={
                      shouldReduceMotion
                        ? { duration: 0 }
                        : { duration: 0.35, delay: 0.05 + index * 0.03, ease: SMOOTH_EASE }
                    }
                    whileHover={
                      shouldReduceMotion
                        ? undefined
                        : { scale: 1.03, transition: { type: 'spring', bounce: 0, duration: 0.2 } }
                    }
                    className={`flex items-center gap-2.5 px-4 py-2 rounded-xl font-medium border backdrop-blur-md shadow-sm ${
                      isDark
                        ? 'bg-slate-800/80 border-white/[0.08] text-slate-200 hover:border-yellow-500/40'
                        : 'bg-white/90 border-black/[0.06] text-slate-800 hover:border-blue-400 shadow-sm'
                    }`}
                  >
                    {hasIcon ? (
                      <img
                        src={techObj.iconUrl}
                        alt={techObj.name}
                        className="w-5 h-5 rounded-full object-cover flex-shrink-0"
                        onError={(e) => {
                          const img = e.currentTarget as HTMLImageElement;
                          img.style.display = 'none';
                        }}
                      />
                    ) : (
                      <span
                        className={`w-5 h-5 rounded-full flex items-center justify-center text-[10px] font-bold flex-shrink-0 ${
                          isDark
                            ? 'bg-red-500/20 text-red-400'
                            : 'bg-blue-100 text-blue-700'
                        }`}
                      >
                        {techObj.name.charAt(0).toUpperCase()}
                      </span>
                    )}

                    <span className="text-sm font-semibold">{techObj.name}</span>
                  </motion.div>
                );
              })}
            </div>
          </div>
        )}

      {/* Engineering Challenges */}
      {Array.isArray(project.challenges) && project.challenges.length > 0 && (
        <div data-testid="project-challenges" className="mb-14">
          <h2
            className={`text-2xl font-bold mb-6 tracking-tight ${
              isDark ? 'text-white' : 'text-slate-900'
            }`}
            style={{ letterSpacing: '-0.01em' }}
          >
            {isDark ? 'Technical Challenges & Solutions' : 'Trials Overcome'}
          </h2>

          <div className="space-y-4">
            {project.challenges.map((challenge, index) => (
              <motion.div
                key={challenge.title || index}
                initial={{ opacity: 0, y: shouldReduceMotion ? 0 : 16 }}
                animate={{ opacity: 1, y: 0 }}
                transition={
                  shouldReduceMotion
                    ? { duration: 0 }
                    : { duration: 0.45, delay: 0.1 + index * 0.06, ease: SMOOTH_EASE }
                }
                className={`relative p-6 sm:p-7 rounded-2xl border backdrop-blur-xl backdrop-saturate-[180%] shadow-md overflow-hidden ${
                  isDark
                    ? 'bg-slate-800/60 border-white/[0.08]'
                    : 'bg-white/90 border-black/[0.06] shadow-sm'
                }`}
              >
                {/* Top hairline */}
                <div
                  aria-hidden="true"
                  className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-white/30 to-transparent"
                />

                <h3
                  className={`text-lg font-bold mb-2 tracking-tight ${
                    isDark ? 'text-white' : 'text-slate-900'
                  }`}
                >
                  {challenge.title}
                </h3>
                <p
                  className={`text-sm leading-relaxed ${
                    isDark ? 'text-slate-300' : 'text-slate-600'
                  }`}
                >
                  {challenge.description}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      )}
    </>
  );
}
