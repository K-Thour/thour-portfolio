import { motion } from 'motion/react';
import { CheckCircle2, Zap, Shield, Hammer } from 'lucide-react';
import { useTheme } from '../../context/ThemeContext';

interface Technology {
  _id?: string;
  name: string;
  category?: string;
  iconUrl?: string | null;
}

interface ServiceFeaturesProps {
  service: any;
}

export function ServiceFeatures({ service }: ServiceFeaturesProps) {
  const { theme } = useTheme();
  const isDark = theme === 'avengers';

  return (
    <>
      {service.features && service.features.length > 0 && (
        <div className="mb-12">
          <h2
            className={`text-2xl font-bold mb-6 flex items-center gap-2 ${
              isDark ? 'text-white' : 'text-gray-900'
            }`}
          >
            {isDark ? (
              <Shield className="w-6 h-6 text-red-500" />
            ) : (
              <Hammer className="w-6 h-6 text-blue-600" />
            )}
            {isDark ? 'Core Capabilities' : 'Skills & Abilities'}
          </h2>
          <div className="grid md:grid-cols-2 gap-4">
            {service.features.map((feature: any, index: number) => (
              <motion.div
                key={feature}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{
                  duration: 0.6,
                  delay: 0.4 + index * 0.05,
                }}
                className={`flex items-start gap-3 p-4 rounded-xl border transition-all hover:scale-105 ${
                  isDark
                    ? 'bg-slate-800/80 border-yellow-500/30 text-white hover:border-yellow-500/60'
                    : 'bg-gradient-to-br from-blue-100 to-blue-200 border-blue-400/40 text-gray-900 hover:border-blue-500/60 shadow-sm'
                }`}
              >
                <CheckCircle2
                  className={`w-6 h-6 flex-shrink-0 ${
                    isDark ? 'text-red-500' : 'text-amber-700'
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

      {service.technologies && service.technologies.length > 0 && (
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
            {isDark ? 'Tech Stack' : 'Forged With'}
          </h2>
          <div className="flex flex-wrap gap-3">
            {service.technologies.map((tech: Technology | string, index: number) => {
              const techObj: Technology =
                typeof tech === 'string' ? { name: tech } : tech;
              const hasIcon = Boolean(techObj.iconUrl);

              return (
                <motion.div
                  key={techObj._id || techObj.name}
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{
                    duration: 0.4,
                    delay: 0.6 + index * 0.05,
                  }}
                  className={`flex items-center gap-2.5 px-4 py-2.5 rounded-xl font-medium border transition-all hover:scale-105 ${
                    isDark
                      ? 'bg-slate-800/80 border-yellow-500/30 text-white hover:border-yellow-500/60 hover:bg-slate-700/80'
                      : 'bg-gradient-to-br from-blue-50 to-blue-100 border-blue-400/40 text-gray-900 hover:border-blue-500/60 shadow-sm hover:shadow-md'
                  }`}
                >
                  {/* Technology icon image */}
                  {hasIcon ? (
                    <img
                      src={techObj.iconUrl!}
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

                  {/* Fallback: colored initial avatar */}
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

                  {/* Category badge */}
                  {techObj.category && (
                    <span
                      className={`text-xs px-1.5 py-0.5 rounded-full ${
                        isDark
                          ? 'bg-slate-700 text-yellow-400'
                          : 'bg-blue-200 text-blue-700'
                      }`}
                    >
                      {techObj.category}
                    </span>
                  )}
                </motion.div>
              );
            })}
          </div>
        </div>
      )}
    </>
  );
}
