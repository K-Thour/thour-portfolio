import { motion } from 'motion/react';
import { CheckCircle2, Zap, Shield, Hammer } from 'lucide-react';
import { useTheme } from '../../context/ThemeContext';
import { type ServiceData } from '../../../data/services';

interface ServiceFeaturesProps {
  service: ServiceData;
  isInView: boolean;
}

export function ServiceFeatures({ service, isInView }: ServiceFeaturesProps) {
  const { theme } = useTheme();
  const isDark = theme === 'avengers';

  return (
    <>
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
          {service.features.map((feature, index) => (
            <motion.div
              key={feature}
              initial={{ opacity: 0, x: -20 }}
              animate={isInView ? { opacity: 1, x: 0 } : { opacity: 0, x: -20 }}
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
          {service.technologies.map((tech, index) => (
            <motion.span
              key={tech}
              initial={{ opacity: 0, scale: 0.8 }}
              animate={
                isInView ? { opacity: 1, scale: 1 } : { opacity: 0, scale: 0.8 }
              }
              transition={{
                duration: 0.4,
                delay: 0.6 + index * 0.05,
              }}
              className={`px-6 py-3 rounded-xl font-medium border transition-all hover:scale-105 ${
                isDark
                  ? 'bg-slate-800/80 border-yellow-500/30 text-white hover:border-yellow-500/60'
                  : 'bg-gradient-to-br from-blue-100 to-blue-200 border-blue-400/40 text-gray-900 hover:border-blue-500/60 shadow-sm'
              }`}
            >
              {tech}
            </motion.span>
          ))}
        </div>
      </div>
    </>
  );
}
