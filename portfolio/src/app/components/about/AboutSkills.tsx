import { motion } from 'motion/react';
import { Code2 } from 'lucide-react';
import { useTheme } from '../../context/ThemeContext';
import { useNavigate } from 'react-router';
import { useEffect, useState } from 'react';
import { fetchServices } from '../../../services/api';
import { servicesData } from '../../../data/services';

interface AboutSkillsProps {
  isInView: boolean;
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
            icon: s.iconUrl?.url || (fallback ? fallback.icon : Code2),
            title: s.name || (fallback ? fallback.title : ''),
            description: s.decription || (fallback ? fallback.description : ''),
            techs:
              s.technologies?.map((t: any) => t.name) ||
              (fallback ? fallback.technologies : []),
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
        const Icon = skill.icon;
        return (
          <motion.div
            key={skill.id || skill.title}
            initial={{ opacity: 0, y: 30 }}
            animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
            transition={{ duration: 0.6, delay: 0.3 + index * 0.1 }}
            className={`p-6 rounded-2xl border cursor-pointer transition-all duration-300 hover:-translate-y-2 group ${
              isDark
                ? 'bg-slate-800/50 border-red-500/20 hover:border-red-500/50'
                : 'bg-gradient-to-br from-white to-blue-50 border-blue-300/40 hover:border-blue-500/60 shadow-md hover:shadow-xl hover:shadow-blue-500/20'
            }`}
            onClick={() => navigate(skill.link)}
          >
            <div
              className={`w-12 h-12 bg-gradient-to-br ${skill.color} rounded-xl flex items-center justify-center mb-4 group-hover:scale-110 transition-transform shadow-lg ${
                !isDark && 'shadow-blue-500/30'
              }`}
            >
              {typeof Icon === 'string' ? (
                Icon.startsWith('http://') ||
                Icon.startsWith('https://') ||
                Icon.startsWith('/') ||
                Icon.startsWith('data:') ? (
                  <img
                    src={Icon}
                    alt={skill.title}
                    className="w-6 h-6 object-contain"
                  />
                ) : (
                  <span className="text-xl text-white">{Icon}</span>
                )
              ) : (
                <Icon className="w-6 h-6 text-white" />
              )}
            </div>
            <h3
              className={`text-lg font-bold mb-2 ${
                isDark ? 'text-white' : 'text-gray-900'
              }`}
            >
              {skill.title}
            </h3>
            <p
              className={`text-sm mb-4 ${
                isDark ? 'text-gray-400' : 'text-gray-700'
              }`}
            >
              {skill.description}
            </p>
            <div className="flex flex-wrap gap-2">
              {skill.techs.map((tech: string) => (
                <span
                  key={tech}
                  className={`px-2 py-1 rounded-full text-xs ${
                    isDark
                      ? 'bg-slate-900/80 border border-red-500/20 text-gray-300'
                      : 'bg-blue-100 border border-blue-300/50 text-gray-800'
                  }`}
                >
                  {tech}
                </span>
              ))}
            </div>
          </motion.div>
        );
      })}
    </div>
  );
}
