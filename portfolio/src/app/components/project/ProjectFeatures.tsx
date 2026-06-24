import { motion } from 'motion/react';
import { CheckCircle2, Zap, Shield, Swords } from 'lucide-react';
import { useTheme } from '../../context/ThemeContext';
import { type ProjectData } from '../../../data/projects';

interface ProjectFeaturesProps {
  project: ProjectData;
}

export function ProjectFeatures({ project }: ProjectFeaturesProps) {
  const { theme } = useTheme();
  const isDark = theme === 'avengers';

  return (
    <>
      {Array.isArray(project.features) &&
        project.features.length > 0 &&
        project.features[0] && (
          <div className="mb-12">
            <h2
              className={`text-2xl font-bold mb-6 flex items-center gap-2 ${
                isDark ? 'text-white' : 'text-gray-900'
              }`}
            >
              {isDark ? (
                <Shield className="w-6 h-6 text-red-500" />
              ) : (
                <Swords className="w-6 h-6 text-blue-600" />
              )}
              {isDark ? 'Key Features' : 'Legendary Features'}
            </h2>
            <div className="grid md:grid-cols-2 gap-4">
              {project.features.map((feature, index) => (
                <motion.div
                  key={feature}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{
                    duration: 0.6,
                    delay: 0.1 + index * 0.05,
                  }}
                  className={`flex items-start gap-3 p-4 rounded-xl border transition-all hover:scale-105 ${
                    isDark
                      ? 'bg-slate-800/50 border-red-500/20 hover:border-red-500/50'
                      : 'bg-gradient-to-br from-blue-50 to-blue-100 border-blue-300/30 hover:border-blue-400/50 shadow-sm'
                  }`}
                >
                  <CheckCircle2
                    className={`w-6 h-6 flex-shrink-0 ${
                      isDark ? 'text-red-500' : 'text-blue-600'
                    }`}
                  />
                  <span className={isDark ? 'text-gray-300' : 'text-gray-800'}>
                    {feature}
                  </span>
                </motion.div>
              ))}
            </div>
          </div>
        )}

      {Array.isArray(project.technologies) &&
        project.technologies.length > 0 && (
          <div className="mb-12">
            <h2
              className={`text-2xl font-bold mb-6 flex items-center gap-2 ${
                isDark ? 'text-white' : 'text-gray-900'
              }`}
            >
              <Zap
                className={
                  isDark ? 'w-6 h-6 text-yellow-500' : 'w-6 h-6 text-blue-500'
                }
              />
              {isDark ? 'Technologies Used' : 'Weapons Wielded'}
            </h2>
            <div className="flex flex-wrap gap-3">
              {project.technologies.map((tech: any, index: number) => {
                const techObj =
                  typeof tech === 'string' ? { name: tech } : tech;
                const hasIcon = Boolean(techObj.iconUrl);

                return (
                  <motion.div
                    key={techObj._id || techObj.name}
                    initial={{ opacity: 0, scale: 0.8 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{
                      duration: 0.4,
                      delay: 0.3 + index * 0.05,
                    }}
                    className={`flex items-center gap-2.5 px-4 py-2.5 rounded-xl font-medium border transition-all hover:scale-105 ${
                      isDark
                        ? 'bg-slate-800/80 border-yellow-500/30 text-white hover:border-yellow-500/60 hover:bg-slate-700/80'
                        : 'bg-gradient-to-br from-blue-50 to-blue-100 border-blue-400/40 text-gray-900 hover:border-blue-500/60 shadow-sm hover:shadow-md'
                    }`}
                  >
                    {/* Icon image */}
                    {hasIcon ? (
                      <img
                        src={techObj.iconUrl}
                        alt={techObj.name}
                        className="w-6 h-6 rounded-full object-cover flex-shrink-0 ring-1 ring-white/20"
                        onError={(e) => {
                          const img = e.currentTarget as HTMLImageElement;
                          img.style.display = 'none';
                          const fallback = img.nextElementSibling as HTMLElement;
                          if (fallback) fallback.style.display = 'flex';
                        }}
                      />
                    ) : null}

                    {/* Fallback initial avatar */}
                    <span
                      style={{ display: hasIcon ? 'none' : 'flex' }}
                      className={`w-6 h-6 rounded-full items-center justify-center text-xs font-bold flex-shrink-0 ${
                        isDark
                          ? 'bg-gradient-to-br from-red-600 to-yellow-500 text-white'
                          : 'bg-gradient-to-br from-blue-600 to-blue-400 text-white'
                      }`}
                    >
                      {techObj.name.charAt(0).toUpperCase()}
                    </span>

                    {/* Name */}
                    <span className="text-sm">{techObj.name}</span>

                    {/* Category pill */}
                    {/* {techObj.category && (
                      <span
                        className={`text-xs px-1.5 py-0.5 rounded-full ${
                          isDark
                            ? 'bg-slate-700 text-yellow-400'
                            : 'bg-blue-200 text-blue-700'
                        }`}
                      >
                        {techObj.category}
                      </span>
                    )} */}
                  </motion.div>
                );
              })}
            </div>
          </div>
        )}


      {Array.isArray(project.challenges) && project.challenges.length > 0 && (
        <div className="mb-12">
          <h2
            className={`text-2xl font-bold mb-6 ${isDark ? 'text-white' : 'text-gray-900'}`}
          >
            {isDark ? 'Technical Challenges' : 'Trials Overcome'}
          </h2>
          <div className="space-y-4">
            {project.challenges.map((challenge, index) => (
              <motion.div
                key={challenge.title || index}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{
                  duration: 0.6,
                  delay: 0.4 + index * 0.1,
                }}
                className={`p-6 rounded-2xl border ${
                  isDark
                    ? 'bg-slate-800/50 border-red-500/20'
                    : 'bg-gradient-to-br from-white to-blue-50 border-blue-300/30 shadow-md'
                }`}
              >
                <h3
                  className={`text-lg font-bold mb-2 ${
                    isDark ? 'text-white' : 'text-gray-900'
                  }`}
                >
                  {challenge.title}
                </h3>
                <p className={isDark ? 'text-gray-400' : 'text-gray-700'}>
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
