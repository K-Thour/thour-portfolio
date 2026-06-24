import { motion } from 'motion/react';
import { useTheme } from '../../context/ThemeContext';
import { Code2 } from 'lucide-react';

interface ServiceHeaderProps {
  service: any;
}

export function ServiceHeader({ service }: ServiceHeaderProps) {
  const { theme } = useTheme();
  const isDark = theme === 'avengers';
  const icon = service.icon as string | null | undefined;

  const renderIcon = () => {
    if (icon && (icon.startsWith('http') || icon.startsWith('/'))) {
      return (
        <img
          src={icon}
          alt={service.title || service.name}
          className="w-8 h-8 object-contain rounded"
        />
      );
    }
    return <Code2 className="w-8 h-8 text-white" />;
  };

  return (
    <>
      <div className="mb-12">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
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
            {renderIcon()}
          </div>
          <div>
            {service.subtitle ? (
              <p
                className={`text-sm font-medium uppercase tracking-wider ${
                  isDark ? 'text-red-500' : 'text-blue-600'
                }`}
              >
                {service.subtitle}
              </p>
            ) : null}
            <h1
              className={`text-4xl md:text-5xl font-bold ${
                isDark ? 'text-white' : 'text-gray-900'
              }`}
            >
              {service.title || service.name}
            </h1>
          </div>
        </motion.div>

        {service.description ? (
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className={`text-xl leading-relaxed ${
              isDark ? 'text-gray-300' : 'text-gray-700'
            }`}
          >
            {service.description}
          </motion.p>
        ) : null}
      </div>

      {service.image ? (
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8, delay: 0.3 }}
          className={`rounded-2xl overflow-hidden mb-12 border ${
            isDark
              ? 'border-red-500/20 bg-slate-950'
              : 'border-amber-300/30 shadow-xl shadow-amber-500/10 bg-slate-950'
          }`}
        >
          <img
            src={service.image}
            alt={service.title || service.name}
            className="w-full aspect-[2.4/1] object-cover"
          />
        </motion.div>
      ) : null}
    </>
  );
}
