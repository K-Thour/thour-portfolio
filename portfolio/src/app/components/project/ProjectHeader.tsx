import { motion } from 'motion/react';
import { Calendar, ExternalLink, Github, Users } from 'lucide-react';
import { useTheme } from '../../context/ThemeContext';
import { type ProjectData } from '../../../data/projects';

interface ProjectHeaderProps {
  project: ProjectData;
  isInView: boolean;
}

export function ProjectHeader({ project, isInView }: ProjectHeaderProps) {
  const { theme } = useTheme();
  const isDark = theme === 'avengers';

  return (
    <div className="mb-12">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
        transition={{ duration: 0.6 }}
        className="mb-6"
      >
        <div className="flex items-center gap-3 mb-4">
          <span
            className={`px-4 py-1 rounded-full text-sm font-medium border ${
              project.status === 'Completed'
                ? isDark
                  ? 'bg-green-500/20 text-green-400 border-green-500/50'
                  : 'bg-green-100 text-green-700 border-green-300'
                : isDark
                  ? 'bg-yellow-500/20 text-yellow-400 border-yellow-500/50'
                  : 'bg-yellow-100 text-yellow-700 border-yellow-300'
            }`}
          >
            {project.status === 'Completed'
              ? isDark
                ? 'Completed'
                : 'Victory Achieved'
              : isDark
                ? 'In Progress'
                : 'Battle Ongoing'}
          </span>
          <span
            className={`px-4 py-1 rounded-full text-sm font-medium border ${
              isDark
                ? 'bg-slate-800/80 border-red-500/30 text-gray-300'
                : 'bg-blue-100 border-blue-300 text-blue-800'
            }`}
          >
            {project.category}
          </span>
        </div>

        <h1
          className={`text-4xl md:text-5xl font-bold mb-4 ${
            isDark ? 'text-white' : 'text-gray-900'
          }`}
        >
          {project.title}
        </h1>
        <p
          className={`text-xl mb-6 ${isDark ? 'text-gray-300' : 'text-gray-700'}`}
        >
          {project.description}
        </p>

        {/* Meta Info */}
        <div className="flex flex-wrap gap-6">
          <div className="flex items-center gap-2">
            <Calendar
              className={`w-5 h-5 ${isDark ? 'text-red-500' : 'text-blue-600'}`}
            />
            <span className={isDark ? 'text-gray-400' : 'text-gray-600'}>
              {project.date}
            </span>
          </div>
          <div className="flex items-center gap-2">
            <Users
              className={`w-5 h-5 ${isDark ? 'text-yellow-500' : 'text-blue-500'}`}
            />
            <span className={isDark ? 'text-gray-400' : 'text-gray-600'}>
              {project.team}
            </span>
          </div>
        </div>
      </motion.div>

      {/* Action Buttons */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
        transition={{ duration: 0.6, delay: 0.2 }}
        className="flex gap-4"
      >
        <a
          href={project.link}
          className={`inline-flex items-center gap-2 px-6 py-3 rounded-xl font-medium transition-all hover:scale-105 ${
            isDark
              ? 'bg-gradient-to-r from-red-600 to-yellow-500 text-white hover:shadow-lg hover:shadow-red-500/50'
              : 'bg-gradient-to-r from-blue-600 to-blue-500 text-white hover:shadow-lg hover:shadow-blue-500/50'
          }`}
        >
          <ExternalLink className="w-5 h-5" />
          {isDark ? 'View Live' : 'See in Action'}
        </a>
        <a
          href={project.github}
          className={`inline-flex items-center gap-2 px-6 py-3 rounded-xl border font-medium transition-all hover:scale-105 ${
            isDark
              ? 'border-red-500/50 text-white hover:bg-red-500/10'
              : 'border-blue-500 text-blue-700 hover:bg-blue-50'
          }`}
        >
          <Github className="w-5 h-5" />
          {isDark ? 'Source Code' : 'View Runes'}
        </a>
      </motion.div>
    </div>
  );
}
