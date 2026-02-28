import { motion } from 'motion/react';
import { ExternalLink, Github } from 'lucide-react';
import { Link } from 'react-router';
import { useTheme } from '../../context/ThemeContext';

export interface ProjectItem {
  id: string;
  title: string;
  subtitle: string;
  description: string;
  image: string;
  tags: string[];
  link: string;
  github: string;
  status: string;
}

interface ProjectCardProps {
  project: ProjectItem;
  index: number;
  isInView: boolean;
}

export function ProjectCard({ project, index, isInView }: ProjectCardProps) {
  const { theme } = useTheme();
  const isDark = theme === 'avengers';

  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
      transition={{ duration: 0.6, delay: index * 0.1 }}
      className={`group rounded-2xl overflow-hidden border transition-all duration-300 hover:-translate-y-2 ${
        isDark
          ? 'bg-slate-800/50 border-red-500/20 hover:border-red-500/50'
          : 'bg-gradient-to-br from-white to-blue-50 border-blue-300/40 hover:border-blue-500/60 shadow-lg hover:shadow-xl hover:shadow-blue-500/20'
      }`}
    >
      <Link to={`/projects/${project.id}`} className="block">
        <div className="relative overflow-hidden h-64">
          <img
            src={project.image}
            alt={project.title}
            className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
          />
          <div
            className={`absolute inset-0 via-transparent opacity-60 ${
              isDark
                ? 'bg-gradient-to-t from-slate-900 via-slate-900/50'
                : 'bg-gradient-to-t from-white via-white/50'
            }`}
          />

          {/* Status Badge */}
          <div className="absolute top-4 right-4">
            <span
              className={`px-3 py-1 rounded-full text-xs font-medium ${
                project.status === 'Completed'
                  ? isDark
                    ? 'bg-green-500/20 text-green-400 border border-green-500/50'
                    : 'bg-green-100 text-green-800 border border-green-400/50'
                  : isDark
                    ? 'bg-yellow-500/20 text-yellow-400 border border-yellow-500/50'
                    : 'bg-yellow-100 text-yellow-800 border border-yellow-400/50'
              }`}
            >
              {project.status === 'Completed'
                ? isDark
                  ? 'Completed'
                  : 'Victory'
                : isDark
                  ? 'In Progress'
                  : 'In Battle'}
            </span>
          </div>

          {/* Hover Actions */}
          <div
            className={`absolute inset-0 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end justify-end p-4 gap-3 ${
              isDark
                ? 'bg-gradient-to-t from-black/80'
                : 'bg-gradient-to-t from-blue-900/80'
            }`}
          >
            <a
              href={project.link}
              onClick={(e) => e.stopPropagation()}
              className={`w-12 h-12 rounded-lg flex items-center justify-center transition-colors ${
                isDark
                  ? 'bg-red-600 hover:bg-red-700'
                  : 'bg-blue-600 hover:bg-blue-700'
              }`}
            >
              <ExternalLink className="w-5 h-5 text-white" />
            </a>
            <a
              href={project.github}
              onClick={(e) => e.stopPropagation()}
              className={`w-12 h-12 rounded-lg flex items-center justify-center transition-colors ${
                isDark
                  ? 'bg-slate-700 hover:bg-slate-600'
                  : 'bg-blue-700 hover:bg-blue-800'
              }`}
            >
              <Github className="w-5 h-5 text-white" />
            </a>
          </div>
        </div>

        <div className="p-6">
          <div
            className={`text-sm font-medium mb-1 ${
              isDark ? 'text-red-500' : 'text-blue-600'
            }`}
          >
            {project.subtitle}
          </div>
          <h3
            className={`text-2xl font-bold mb-2 ${
              isDark ? 'text-white' : 'text-gray-900'
            }`}
          >
            {project.title}
          </h3>
          <p className={`mb-4 ${isDark ? 'text-gray-400' : 'text-gray-700'}`}>
            {project.description}
          </p>
          <div className="flex flex-wrap gap-2">
            {project.tags.map((tag) => (
              <span
                key={tag}
                className={`px-3 py-1 rounded-full text-sm border ${
                  isDark
                    ? 'bg-slate-900/80 border-red-500/20 text-gray-300'
                    : 'bg-blue-100 border-blue-300/50 text-gray-800'
                }`}
              >
                {tag}
              </span>
            ))}
          </div>
        </div>
      </Link>
    </motion.div>
  );
}
