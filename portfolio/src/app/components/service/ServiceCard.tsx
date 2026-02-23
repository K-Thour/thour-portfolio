import { motion } from 'motion/react';
import { Link } from 'react-router';
import { ArrowRight, type LucideIcon } from 'lucide-react';
import { useTheme } from '../../context/ThemeContext';

export interface ServiceItem {
  icon: LucideIcon;
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

export function ServiceCard({ service, index, isInView }: ServiceCardProps) {
  const { theme } = useTheme();
  const isDark = theme === 'avengers';
  const Icon = service.icon;

  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
      transition={{ duration: 0.6, delay: index * 0.1 }}
    >
      <Link
        to={service.link}
        className={`block group p-6 rounded-2xl border transition-all duration-300 hover:-translate-y-2 cursor-pointer ${
          isDark
            ? 'bg-slate-800/50 border-red-500/20 hover:border-red-500/50'
            : 'bg-gradient-to-br from-blue-50 to-blue-100 border-blue-300/40 hover:border-blue-500/60 shadow-md hover:shadow-xl hover:shadow-blue-500/20'
        }`}
      >
        <div
          className={`w-14 h-14 bg-gradient-to-br ${service.color} rounded-xl flex items-center justify-center mb-4 group-hover:scale-110 transition-transform shadow-lg ${
            !isDark && 'shadow-blue-500/30'
          }`}
        >
          <Icon className="w-7 h-7 text-white" />
        </div>

        <h3
          className={`text-xl font-bold mb-3 ${
            isDark ? 'text-white' : 'text-gray-900'
          }`}
        >
          {service.title}
        </h3>
        <p
          className={`text-sm mb-4 ${
            isDark ? 'text-gray-400' : 'text-gray-700'
          }`}
        >
          {service.description}
        </p>

        <ul className="space-y-2 mb-4">
          {service.features.map((feature) => (
            <li
              key={feature}
              className={`text-sm flex items-center gap-2 ${
                isDark ? 'text-gray-500' : 'text-gray-600'
              }`}
            >
              <ArrowRight
                className={`w-4 h-4 ${
                  isDark ? 'text-red-500' : 'text-blue-600'
                }`}
              />
              {feature}
            </li>
          ))}
        </ul>

        <div
          className={`pt-4 border-t ${
            isDark ? 'border-red-500/10' : 'border-blue-300/40'
          }`}
        >
          <span
            className={`text-sm font-medium group-hover:underline ${
              isDark ? 'text-red-500' : 'text-blue-700'
            }`}
          >
            Learn More →
          </span>
        </div>
      </Link>
    </motion.div>
  );
}
