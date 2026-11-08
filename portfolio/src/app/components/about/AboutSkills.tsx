import { motion, useReducedMotion } from 'motion/react';
import {
  ArrowRight,
  Clock,
  DollarSign,
  Code2,
  type LucideIcon,
} from 'lucide-react';
import { useContext, useEffect, useState } from 'react';
import { useNavigate } from 'react-router';
import { ThemeContext } from '../../context/ThemeContext';
import { fetchServices } from '../../../services/api';
import { servicesData } from '../../../data/services';

interface AboutSkillsProps {
  isInView?: boolean;
}

const SMOOTH_EASE = [0.22, 1, 0.36, 1] as const;

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

export function AboutSkills({ isInView = true }: AboutSkillsProps) {
  const themeCtx = useContext(ThemeContext);
  const isDark = themeCtx ? themeCtx.theme === 'avengers' : true;
  const shouldReduceMotion = useReducedMotion() ?? false;
  const navigate = useNavigate();

  const [services, setServices] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let isMounted = true;
    const loadServices = async () => {
      try {
        const data = await fetchServices({ populate: 'technologies' });
        if (!isMounted) return;
        const mappedData = (Array.isArray(data) ? data : []).map((s: any, index: number) => {
          const nameNormalized = (s.name || '')
            .toLowerCase()
            .replace(/[^a-z]/g, '');
          const fallback =
            Object.values(servicesData).find(
              (item) =>
                item.title.toLowerCase().replace(/[^a-z]/g, '') ===
                nameNormalized,
            ) ||
            Object.values(servicesData).find(
              (item) =>
                nameNormalized.includes(item.title.toLowerCase()) ||
                item.title.toLowerCase().includes(nameNormalized),
            );

          const colors = [
            isDark ? 'from-red-600 to-red-400' : 'from-blue-600 to-blue-400',
            isDark ? 'from-blue-600 to-blue-400' : 'from-blue-700 to-blue-500',
            isDark
              ? 'from-purple-600 to-purple-400'
              : 'from-blue-500 to-blue-300',
            isDark
              ? 'from-green-600 to-green-400'
              : 'from-blue-400 to-blue-200',
            isDark ? 'from-pink-600 to-pink-400' : 'from-blue-600 to-blue-300',
            isDark
              ? 'from-yellow-600 to-yellow-400'
              : 'from-blue-500 to-blue-400',
          ];
          const color = colors[index % colors.length];

          return {
            id: s._id || `skill-${index}`,
            icon: s.icon || (fallback ? fallback.icon : Code2),
            title: s.title || s.name || (fallback ? fallback.title : ''),
            subtitle: s.subtitle || (fallback ? fallback.subtitle : ''),
            description:
              s.description || (fallback ? fallback.description : ''),
            features:
              s.features && s.features.length > 0
                ? s.features
                : fallback
                  ? fallback.features
                  : [],
            techs:
              s.technologies && s.technologies.length > 0
                ? s.technologies
                : fallback
                  ? fallback.technologies
                  : [],
            duration: s.duration || '',
            pricing: s.pricing || '',
            color: color,
            link: `/services/${s._id || `skill-${index}`}`,
          };
        });
        setServices(mappedData);
      } catch (error) {
        console.error('Error fetching services:', error);
      } finally {
        if (isMounted) setLoading(false);
      }
    };
    loadServices();
    return () => {
      isMounted = false;
    };
  }, [isDark]);

  if (loading) {
    return (
      <div
        data-testid="about-skills-skeleton"
        className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 mb-16"
      >
        {Array.from({ length: 3 }).map((_, i) => (
          <div
            key={i}
            className={`p-6 rounded-2xl border animate-pulse ${
              isDark
                ? 'bg-slate-800/40 border-white/[0.06]'
                : 'bg-slate-100 border-black/[0.06]'
            }`}
          >
            <div className="flex items-center gap-3 mb-4">
              <div className="w-11 h-11 rounded-xl bg-slate-700/40" />
              <div className="h-5 bg-slate-700/40 rounded w-1/2" />
            </div>
            <div className="h-4 bg-slate-700/40 rounded w-full mb-2" />
            <div className="h-4 bg-slate-700/40 rounded w-3/4 mb-4" />
            <div className="flex gap-2">
              <div className="h-4 bg-slate-700/40 rounded w-12" />
              <div className="h-4 bg-slate-700/40 rounded w-16" />
            </div>
          </div>
        ))}
      </div>
    );
  }

  if (services.length === 0) {
    return (
      <div className="text-center py-20 text-slate-500">
        No skills or services found.
      </div>
    );
  }

  return (
    <div
      data-testid="about-skills-grid"
      className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 mb-16"
    >
      {services.map((skill, index) => {
        const visibleFeatures = skill.features
          ? skill.features.slice(0, 3)
          : [];
        const visibleTechs = skill.techs ? skill.techs.slice(0, 6) : [];

        return (
          <motion.div
            key={skill.id || skill.title}
            data-testid={`about-skill-card-${index}`}
            initial={{ opacity: 0, y: shouldReduceMotion ? 0 : 24 }}
            animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: shouldReduceMotion ? 0 : 24 }}
            transition={
              shouldReduceMotion
                ? { duration: 0 }
                : { duration: 0.5, delay: 0.1 + index * 0.08, ease: SMOOTH_EASE }
            }
            whileHover={
              shouldReduceMotion
                ? undefined
                : { y: -3, scale: 1.02, transition: { type: 'spring', bounce: 0, duration: 0.3 } }
            }
            whileTap={shouldReduceMotion ? undefined : { scale: 0.98 }}
            tabIndex={0}
            role="link"
            aria-label={`View details for ${skill.title}`}
            onKeyDown={(e) => {
              if (e.key === 'Enter' || e.key === ' ') {
                e.preventDefault();
                navigate(skill.link);
              }
            }}
            onClick={() => navigate(skill.link)}
            className={`relative p-6 rounded-2xl border backdrop-blur-xl backdrop-saturate-[180%] cursor-pointer transition-colors duration-300 group flex flex-col justify-between h-full shadow-lg overflow-hidden focus:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 ${
              isDark
                ? 'bg-slate-800/60 border-white/[0.08] hover:border-red-500/40 hover:shadow-red-500/10 focus-visible:ring-red-500'
                : 'bg-white/90 border-black/[0.06] shadow-sm hover:border-blue-400/50 hover:shadow-md hover:shadow-blue-500/10 focus-visible:ring-blue-500'
            }`}
          >
            {/* Top hairline highlight */}
            <div
              aria-hidden="true"
              className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-white/30 to-transparent"
            />

            <div>
              {/* Icon + Title + Category Header */}
              <div className="flex items-start gap-3.5 mb-3.5">
                <div className="transition-transform duration-300 group-hover:scale-105 flex-shrink-0">
                  <IconBox
                    icon={skill.icon}
                    title={skill.title}
                    color={skill.color}
                    isDark={isDark}
                  />
                </div>
                <div className="min-w-0">
                  <h3
                    className={`text-base font-bold leading-snug truncate tracking-tight ${
                      isDark ? 'text-white' : 'text-slate-900'
                    }`}
                    style={{ letterSpacing: '-0.01em' }}
                  >
                    {skill.title}
                  </h3>
                  {skill.subtitle && (
                    <span
                      className={`inline-block text-[10px] font-semibold tracking-wider uppercase mt-1 px-2 py-0.5 rounded-md ${
                        isDark
                          ? 'bg-red-500/10 text-red-400 border border-red-500/20'
                          : 'bg-blue-100 text-blue-800 border border-blue-200/50'
                      }`}
                    >
                      {skill.subtitle}
                    </span>
                  )}
                </div>
              </div>

              {/* Description */}
              {skill.description && (
                <p
                  className={`text-xs leading-relaxed mb-4 line-clamp-3 ${
                    isDark ? 'text-slate-300' : 'text-slate-600'
                  }`}
                >
                  {skill.description}
                </p>
              )}

              {/* Key Features / Highlights */}
              {visibleFeatures.length > 0 && (
                <div className="mb-4">
                  <h4
                    className={`text-[10px] font-bold uppercase tracking-wider mb-2 ${
                      isDark ? 'text-slate-400' : 'text-slate-500'
                    }`}
                  >
                    Key Highlights
                  </h4>
                  <ul className="space-y-1.5">
                    {visibleFeatures.map((feature: string) => (
                      <li
                        key={feature}
                        className="text-xs flex items-start gap-1.5"
                      >
                        <ArrowRight
                          className={`w-3.5 h-3.5 mt-0.5 flex-shrink-0 ${
                            isDark ? 'text-red-400' : 'text-blue-500'
                          }`}
                        />
                        <span
                          className={`line-clamp-1 ${
                            isDark ? 'text-slate-200' : 'text-slate-700'
                          }`}
                        >
                          {feature}
                        </span>
                      </li>
                    ))}
                  </ul>
                </div>
              )}

              {/* Key Technologies */}
              {visibleTechs.length > 0 && (
                <div className="mb-4">
                  <h4
                    className={`text-[10px] font-bold uppercase tracking-wider mb-2 ${
                      isDark ? 'text-slate-400' : 'text-slate-500'
                    }`}
                  >
                    Technologies &amp; Tools
                  </h4>
                  <div className="flex flex-wrap gap-1.5">
                    {visibleTechs.map((tech: string) => (
                      <span
                        key={tech}
                        className={`px-2 py-0.5 rounded text-[10px] font-medium ${
                          isDark
                            ? 'bg-slate-900/80 border border-red-500/10 text-slate-300'
                            : 'bg-blue-50 border border-blue-200/50 text-slate-700'
                        }`}
                      >
                        {tech}
                      </span>
                    ))}
                  </div>
                </div>
              )}
            </div>

            {/* Footer with Metadata & View Details */}
            <div
              className={`mt-4 pt-3 border-t flex items-center justify-between gap-2 min-h-[44px] ${
                isDark ? 'border-white/[0.06]' : 'border-black/[0.06]'
              }`}
            >
              <div className="flex items-center gap-3">
                {skill.duration && (
                  <div className="flex items-center gap-1 text-[10px] text-slate-400">
                    <Clock
                      className={`w-3.5 h-3.5 ${isDark ? 'text-red-400' : 'text-blue-500'}`}
                    />
                    <span>{skill.duration}</span>
                  </div>
                )}
                {skill.pricing && (
                  <div className="flex items-center gap-1 text-[10px] text-slate-400">
                    <DollarSign
                      className={`w-3.5 h-3.5 ${isDark ? 'text-red-400' : 'text-blue-500'}`}
                    />
                    <span>{skill.pricing}</span>
                  </div>
                )}
              </div>
              <div
                className={`text-xs font-bold flex items-center gap-1 group-hover:translate-x-0.5 transition-transform ${
                  isDark ? 'text-red-400' : 'text-blue-600'
                }`}
              >
                <span>View Details</span>
                <ArrowRight className="w-3 h-3" />
              </div>
            </div>
          </motion.div>
        );
      })}
    </div>
  );
}
