import { motion } from 'motion/react';
import { useReducedMotion } from 'motion/react';
import { Link } from 'react-router';
import { ArrowRight, Check, Code2, type LucideIcon } from 'lucide-react';
import { useContext, useState } from 'react';
import { ThemeContext } from '../../context/ThemeContext';

export interface ServiceItem {
  icon: LucideIcon | string;
  title: string;
  description: string;
  features: string[];
  color: string;
  link: string;
}

interface ServiceCardProps {
  service: ServiceItem;
  index: number;
  isInView: boolean;
}

/** Transform a Cloudinary URL to force a square smart crop at 80×80 */
function toSquareCloudinaryUrl(url: string): string {
  if (!url.includes('res.cloudinary.com')) return url;
  return url.replace(
    /\/upload\//,
    '/upload/c_fill,g_auto,w_80,h_80,f_auto,q_auto/',
  );
}

function IconBox({
  icon,
  title,
  color,
  isDark,
}: {
  icon: LucideIcon | string;
  title: string;
  color: string;
  isDark: boolean;
}) {
  const [imgError, setImgError] = useState(false);

  const gradientBox = (children: React.ReactNode) => (
    <div
      className={`w-11 h-11 bg-gradient-to-br ${color} rounded-xl flex items-center justify-center flex-shrink-0 shadow-lg`}
    >
      {children}
    </div>
  );

  if (
    typeof icon === 'string' &&
    (icon.startsWith('http') || icon.startsWith('/')) &&
    !imgError
  ) {
    const src = toSquareCloudinaryUrl(icon);
    return (
      <div
        className={`w-11 h-11 rounded-xl flex-shrink-0 overflow-hidden shadow-lg ring-1 ${
          isDark ? 'ring-white/10' : 'ring-black/5'
        }`}
      >
        <img
          src={src}
          alt={title}
          className="w-full h-full object-cover"
          onError={() => setImgError(true)}
        />
      </div>
    );
  }

  if (typeof icon === 'function') {
    const LucideIcon = icon as LucideIcon;
    return gradientBox(<LucideIcon className="w-5 h-5 text-white" />);
  }

  return gradientBox(<Code2 className="w-5 h-5 text-white" />);
}

export function ServiceCard({ service, index, isInView }: ServiceCardProps) {
  const themeCtx = useContext(ThemeContext);
  const isDark = themeCtx ? themeCtx.theme === 'avengers' : true;
  const shouldReduceMotion = useReducedMotion() ?? false;

  const visibleFeatures = service.features.slice(0, 5);

  return (
    <motion.div
      initial={{ opacity: 0, y: shouldReduceMotion ? 0 : 20 }}
      animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: shouldReduceMotion ? 0 : 20 }}
      transition={
        shouldReduceMotion
          ? { duration: 0 }
          : { duration: 0.5, delay: index * 0.08, ease: [0.22, 1, 0.36, 1] }
      }
      whileHover={shouldReduceMotion ? undefined : { y: -3, scale: 1.02 }}
      className="h-full"
    >
      <Link
        to={service.link}
        aria-label={`Learn more about ${service.title}`}
        className={`group flex flex-col gap-4 p-5 rounded-2xl border backdrop-blur-xl backdrop-saturate-[180%] transition-colors duration-300 cursor-pointer h-full relative overflow-hidden focus:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 ${
          isDark
            ? 'bg-slate-800/60 border-white/[0.08] hover:border-red-500/30 focus-visible:ring-red-500'
            : 'bg-white/90 border-black/[0.06] shadow-sm hover:border-blue-400/40 hover:shadow-md hover:shadow-blue-500/10 focus-visible:ring-blue-500'
        }`}
      >
        {/* Top hairline highlight */}
        <div
          aria-hidden="true"
          className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-white/30 to-transparent"
        />

        {/* Icon + Title row */}
        <div className="flex items-center gap-3">
          <div className="transition-transform duration-300 group-hover:scale-105 flex-shrink-0">
            <IconBox
              icon={service.icon}
              title={service.title}
              color={service.color}
              isDark={isDark}
            />
          </div>
          <h3
            className={`text-base font-bold leading-tight tracking-tight ${
              isDark ? 'text-white' : 'text-gray-900'
            }`}
          >
            {service.title}
          </h3>
        </div>

        {/* Truncated description */}
        {service.description && (
          <p
            className={`text-xs leading-relaxed line-clamp-3 ${
              isDark ? 'text-gray-400' : 'text-gray-600'
            }`}
          >
            {service.description}
          </p>
        )}

        {/* Feature bullets */}
        {visibleFeatures.length > 0 && (
          <ul className="space-y-1.5">
            {visibleFeatures.map((feature) => (
              <li
                key={feature}
                className={`text-xs flex items-start gap-2 ${
                  isDark ? 'text-gray-400' : 'text-gray-600'
                }`}
              >
                <Check
                  className={`w-3.5 h-3.5 mt-0.5 flex-shrink-0 ${
                    isDark ? 'text-red-400' : 'text-blue-500'
                  }`}
                />
                <span className="line-clamp-1">{feature}</span>
              </li>
            ))}
          </ul>
        )}

        {/* Learn More footer */}
        <div
          className={`mt-auto pt-3 border-t flex items-center gap-1 text-xs font-semibold ${
            isDark
              ? 'border-white/[0.06] text-red-400'
              : 'border-black/[0.06] text-blue-600'
          }`}
        >
          Learn More
          <ArrowRight className="w-3 h-3 transition-transform duration-200 group-hover:translate-x-0.5" />
        </div>
      </Link>
    </motion.div>
  );
}
