import { motion } from 'motion/react';
import { useTheme } from '../../context/ThemeContext';
import { type ServiceData } from '../../../data/services';

interface ServiceHeaderProps {
  service: ServiceData;
  isInView: boolean;
}

export function ServiceHeader({ service, isInView }: ServiceHeaderProps) {
  const { theme } = useTheme();
  const isDark = theme === 'avengers';
  const Icon = service.icon;

  return (
    <>
      <div className="mb-12">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
          transition={{ duration: 0.6 }}
          className="flex items-center gap-4 mb-6"
        >
          <div
            className={`w-16 h-16 rounded-2xl flex items-center justify-center ${
              isDark
                ? 'bg-gradient-to-br from-red-600 to-yellow-500'
                : 'bg-gradient-to-br from-amber-600 via-amber-500 to-yellow-600 shadow-lg shadow-amber-500/30'
            }`}
          >
            <Icon className="w-8 h-8 text-white" />
          </div>
          <div>
            <p
              className={`text-sm font-medium uppercase tracking-wider ${
                isDark ? 'text-red-500' : 'text-blue-600'
              }`}
            >
              {service.subtitle}
            </p>
            <h1
              className={`text-4xl md:text-5xl font-bold ${
                isDark ? 'text-white' : 'text-gray-900'
              }`}
            >
              {service.title}
            </h1>
          </div>
        </motion.div>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className={`text-xl leading-relaxed ${
            isDark ? 'text-gray-300' : 'text-gray-700'
          }`}
        >
          {service.description}
        </motion.p>
      </div>

      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={
          isInView ? { opacity: 1, scale: 1 } : { opacity: 0, scale: 0.95 }
        }
        transition={{ duration: 0.8, delay: 0.3 }}
        className={`rounded-2xl overflow-hidden mb-12 border ${
          isDark
            ? 'border-red-500/20'
            : 'border-amber-300/30 shadow-xl shadow-amber-500/10'
        }`}
      >
        <img
          src={service.image}
          alt={service.title}
          className="w-full h-96 object-cover"
        />
      </motion.div>
    </>
  );
}
