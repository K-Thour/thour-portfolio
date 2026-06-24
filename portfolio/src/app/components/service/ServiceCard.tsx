import { motion } from 'motion/react';
import { Link } from 'react-router';
import { ArrowRight, Code2, type LucideIcon } from 'lucide-react';
import { useState } from 'react';
import { useTheme } from '../../context/ThemeContext';

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
  // Only transform if it's a Cloudinary URL
  if (!url.includes('res.cloudinary.com')) return url;
  // Insert transformation before the version segment (v followed by digits)
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

  // Image URL (e.g. Cloudinary)
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

  // Lucide component icon
  if (typeof icon === 'function') {
    const LucideIcon = icon as LucideIcon;
    return gradientBox(<LucideIcon className="w-5 h-5 text-white" />);
  }

  // Fallback — Code2 icon on gradient
  return gradientBox(<Code2 className="w-5 h-5 text-white" />);
}

export function ServiceCard({ service, index, isInView }: ServiceCardProps) {
  const { theme } = useTheme();
  const isDark = theme === 'avengers';

  const visibleFeatures = service.features.slice(0, 5);

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
      transition={{ duration: 0.5, delay: index * 0.08 }}
      className="h-full"
    >
      <Link
        to={service.link}
        className={`group flex flex-col gap-3 p-4 rounded-xl border transition-all duration-300 hover:-translate-y-1 cursor-pointer h-full ${
          isDark
            ? 'bg-slate-800/50 border-red-500/20 hover:border-red-500/40 hover:bg-slate-800/80'
            : 'bg-white border-blue-200/60 hover:border-blue-400/60 shadow-sm hover:shadow-md hover:shadow-blue-500/10'
        }`}
      >
        {/* Icon + Title row */}
        <div className="flex items-center gap-3">
          <div className="transition-transform duration-300 group-hover:scale-105">
            <IconBox
              icon={service.icon}
              title={service.title}
              color={service.color}
              isDark={isDark}
            />
          </div>
          <h3
            className={`text-base font-bold leading-tight ${
              isDark ? 'text-white' : 'text-gray-900'
            }`}
          >
            {service.title}
          </h3>
        </div>

        {/* Truncated description */}
        {service.description && (
          <p
            className={`text-xs leading-relaxed line-clamp-5 ${
              isDark ? 'text-gray-400' : 'text-gray-600'
            }`}
          >
            {service.description}
          </p>
        )}

        {/* Feature bullets */}
        {visibleFeatures.length > 0 && (
          <ul className="space-y-1">
            {visibleFeatures.map((feature) => (
              <li
                key={feature}
                className={`text-xs flex items-start gap-1.5 ${
                  isDark ? 'text-gray-500' : 'text-gray-500'
                }`}
              >
                <ArrowRight
                  className={`w-3 h-3 mt-0.5 flex-shrink-0 ${
                    isDark ? 'text-red-500' : 'text-blue-500'
                  }`}
                />
                <span className="line-clamp-1">{feature}</span>
              </li>
            ))}
          </ul>
        )}

        {/* Learn More */}
        <div
          className={`mt-auto pt-2 border-t text-xs font-medium ${
            isDark
              ? 'border-red-500/10 text-red-500'
              : 'border-blue-200/50 text-blue-600'
          }`}
        >
          Learn More →
        </div>
      </Link>
    </motion.div>
  );
}
