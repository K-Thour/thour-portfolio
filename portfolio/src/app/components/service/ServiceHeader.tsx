import { motion, useReducedMotion } from 'motion/react';
import { useContext } from 'react';
import { Code2 } from 'lucide-react';
import { ThemeContext } from '../../context/ThemeContext';

interface ServiceHeaderProps {
  service: any;
}

const SMOOTH_EASE = [0.22, 1, 0.36, 1] as const;

export function ServiceHeader({ service }: ServiceHeaderProps) {
  const themeCtx = useContext(ThemeContext);
  const isDark = themeCtx ? themeCtx.theme === 'avengers' : true;
  const shouldReduceMotion = useReducedMotion() ?? false;
  const icon = service.icon as string | null | undefined;

  const renderIcon = () => {
    if (icon && (icon.startsWith('http') || icon.startsWith('/'))) {
      return (
        <img
          src={icon}
          alt={service.title || service.name}
          className="w-8 h-8 object-contain rounded-lg"
        />
      );
    }
    return <Code2 className="w-8 h-8 text-white" />;
  };

  return (
    <div data-testid="service-header" className="mb-12">
      <motion.div
        initial={{ opacity: 0, y: shouldReduceMotion ? 0 : 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={
          shouldReduceMotion
            ? { duration: 0 }
            : { duration: 0.5, ease: SMOOTH_EASE }
        }
        className="flex flex-col sm:flex-row sm:items-center gap-5 mb-6"
      >
        <div
          className={`w-16 h-16 rounded-2xl flex items-center justify-center shadow-xl flex-shrink-0 border ${
            isDark
              ? 'bg-gradient-to-br from-red-600 to-yellow-500 border-red-500/30 shadow-red-500/20'
              : 'bg-gradient-to-br from-blue-600 to-indigo-600 border-blue-400/40 shadow-blue-500/20'
          }`}
        >
          {renderIcon()}
        </div>

        <div>
          {service.subtitle ? (
            <span
              className={`inline-block text-xs font-bold uppercase tracking-widest px-3 py-1 rounded-full border mb-2 backdrop-blur-md ${
                isDark
                  ? 'bg-red-500/10 border-red-500/30 text-red-400'
                  : 'bg-blue-100 border-blue-200 text-blue-700'
              }`}
            >
              {service.subtitle}
            </span>
          ) : null}

          <h1
            className={`text-3xl sm:text-4xl md:text-5xl font-extrabold tracking-tight ${
              isDark ? 'text-white' : 'text-slate-900'
            }`}
            style={{ letterSpacing: '-0.02em' }}
          >
            {service.title || service.name}
          </h1>
        </div>
      </motion.div>

      {service.description ? (
        <motion.p
          initial={{ opacity: 0, y: shouldReduceMotion ? 0 : 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={
            shouldReduceMotion
              ? { duration: 0 }
              : { duration: 0.55, delay: 0.1, ease: SMOOTH_EASE }
          }
          className={`text-lg sm:text-xl leading-relaxed max-w-3xl mb-8 ${
            isDark ? 'text-slate-300' : 'text-slate-600'
          }`}
        >
          {service.description}
        </motion.p>
      ) : null}

      {service.image ? (
        <motion.div
          initial={{ opacity: 0, scale: shouldReduceMotion ? 1 : 0.98 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={
            shouldReduceMotion
              ? { duration: 0 }
              : { duration: 0.6, delay: 0.15, ease: SMOOTH_EASE }
          }
          className={`rounded-2xl overflow-hidden mb-12 border backdrop-blur-xl relative aspect-[2.2/1] shadow-2xl ${
            isDark
              ? 'border-white/[0.08] bg-slate-950'
              : 'border-black/[0.06] shadow-xl shadow-blue-500/10 bg-slate-100'
          }`}
        >
          {/* Top hairline */}
          <div
            aria-hidden="true"
            className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-white/30 to-transparent z-10"
          />

          <img
            src={service.image}
            alt={service.title || service.name}
            className="w-full h-full object-cover"
          />
        </motion.div>
      ) : null}
    </div>
  );
}
