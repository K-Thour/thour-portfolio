import { motion } from 'motion/react';
import {
  ArrowRight,
  Clock,
  DollarSign,
  Code2,
  type LucideIcon,
} from 'lucide-react';
import { useTheme } from '../../context/ThemeContext';
import { useNavigate } from 'react-router';
import { useEffect, useState } from 'react';
import { fetchServices } from '../../../services/api';
import { servicesData } from '../../../data/services';

interface AboutSkillsProps {
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

export function AboutSkills({ isInView }: AboutSkillsProps) {
  const { theme } = useTheme();
  const isDark = theme === 'avengers';
  const navigate = useNavigate();

  const [services, setServices] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadServices = async () => {
      try {
        const data = await fetchServices({ populate: 'technologies' });
        const mappedData = data.map((s: any, index: number) => {
          // Normalize name to lookup static fallback
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
            id: s._id,
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
            link: `/services/${s._id}`,
          };
        });
        setServices(mappedData);
      } catch (error) {
        console.error('Error fetching services:', error);
      } finally {
        setLoading(false);
      }
    };
    loadServices();
  }, [isDark]);

  if (loading) {
    return (
      <div className="flex justify-center py-20">
        <div className="w-10 h-10 border-4 border-blue-500 border-t-transparent rounded-full animate-spin"></div>
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
    <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 mb-16">
      {services.map((skill, index) => {
        const visibleFeatures = skill.features
          ? skill.features.slice(0, 3)
          : [];
        const visibleTechs = skill.techs ? skill.techs.slice(0, 6) : [];

        return (
          <motion.div
            key={skill.id || skill.title}
            initial={{ opacity: 0, y: 30 }}
            animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
            transition={{ duration: 0.6, delay: 0.3 + index * 0.1 }}
            className={`p-5 rounded-2xl border cursor-pointer transition-all duration-300 hover:-translate-y-2 group flex flex-col justify-between h-full ${
              isDark
                ? 'bg-slate-800/50 border-red-500/20 hover:border-red-500/50 hover:bg-slate-800/80 shadow-md hover:shadow-xl hover:shadow-red-500/10'
                : 'bg-gradient-to-br from-white to-blue-50/30 border-blue-200/50 hover:border-blue-400/60 shadow-md hover:shadow-xl hover:shadow-blue-500/20'
            }`}
            onClick={() => navigate(skill.link)}
          >
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
                    className={`text-base font-bold leading-snug truncate ${
                      isDark ? 'text-white' : 'text-gray-900'
                    }`}
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
                    isDark ? 'text-gray-400' : 'text-gray-600'
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
                      isDark ? 'text-gray-500' : 'text-gray-400'
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
                            isDark ? 'text-red-500' : 'text-blue-500'
                          }`}
                        />
                        <span
                          className={`line-clamp-1 ${
                            isDark ? 'text-gray-300' : 'text-gray-700'
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
                      isDark ? 'text-gray-500' : 'text-gray-400'
                    }`}
                  >
                    Technologies & Tools
                  </h4>
                  <div className="flex flex-wrap gap-1.5">
                    {visibleTechs.map((tech: string) => (
                      <span
                        key={tech}
                        className={`px-2 py-0.5 rounded text-[10px] font-medium ${
                          isDark
                            ? 'bg-slate-900/80 border border-red-500/10 text-gray-300'
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
              className={`mt-4 pt-3 border-t border-dashed flex items-center justify-between gap-2 ${
                isDark ? 'border-red-500/10' : 'border-slate-200'
              }`}
            >
              <div className="flex items-center gap-3">
                {skill.duration && (
                  <div className="flex items-center gap-1 text-[10px] text-gray-400">
                    <Clock
                      className={`w-3.5 h-3.5 ${isDark ? 'text-red-500/60' : 'text-blue-500/60'}`}
                    />
                    <span>{skill.duration}</span>
                  </div>
                )}
                {skill.pricing && (
                  <div className="flex items-center gap-1 text-[10px] text-gray-400">
                    <DollarSign
                      className={`w-3.5 h-3.5 ${isDark ? 'text-red-500/60' : 'text-blue-500/60'}`}
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
                View Details →
              </div>
            </div>
          </motion.div>
        );
      })}
    </div>
  );
}
