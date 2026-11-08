import { motion, useReducedMotion } from 'motion/react';
import { Calendar, ExternalLink, Github, Users, Folder } from 'lucide-react';
import { useContext } from 'react';
import { ThemeContext } from '../../context/ThemeContext';
import { type ProjectData } from '../../../data/projects';

interface ProjectHeaderProps {
  project: ProjectData;
}

const SMOOTH_EASE = [0.22, 1, 0.36, 1] as const;

export function ProjectHeader({ project }: ProjectHeaderProps) {
  const themeCtx = useContext(ThemeContext);
  const isDark = themeCtx ? themeCtx.theme === 'avengers' : true;
  const shouldReduceMotion = useReducedMotion() ?? false;

  const isCompleted =
    project.outcome === 'Completed successfully' ||
    project.outcome === 'Victory Achieved' ||
    !project.outcome;

  return (
    <div data-testid="project-header" className="mb-12">
      <motion.div
        initial={{ opacity: 0, y: shouldReduceMotion ? 0 : 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={
          shouldReduceMotion
            ? { duration: 0 }
            : { duration: 0.5, ease: SMOOTH_EASE }
        }
        className="mb-6"
      >
        <div className="flex flex-wrap items-center gap-3 mb-4">
          <span
            className={`px-3.5 py-1 rounded-full text-xs font-semibold border backdrop-blur-md ${
              isCompleted
                ? isDark
                  ? 'bg-emerald-500/20 text-emerald-400 border-emerald-500/40'
                  : 'bg-emerald-50 text-emerald-700 border-emerald-200'
                : isDark
                  ? 'bg-yellow-500/20 text-yellow-400 border-yellow-500/40'
                  : 'bg-yellow-50 text-yellow-700 border-yellow-200'
            }`}
          >
            {isCompleted
              ? isDark
                ? 'Completed Successfully'
                : 'Victory Achieved'
              : isDark
                ? 'In Progress'
                : 'Battle Ongoing'}
          </span>

          <span
            className={`px-3.5 py-1 rounded-full text-xs font-semibold border backdrop-blur-md flex items-center gap-2 ${
              isDark
                ? 'bg-slate-800/80 border-white/[0.08] text-slate-300'
                : 'bg-blue-50 border-blue-200/60 text-blue-800'
            }`}
          >
            {project.category?.iconUrl ? (
              <img
                src={project.category.iconUrl}
                alt=""
                className="w-4 h-4 rounded-full object-cover"
                onError={(e) => {
                  e.currentTarget.style.display = 'none';
                }}
              />
            ) : (
              <Folder
                className={`w-3.5 h-3.5 ${isDark ? 'text-red-400' : 'text-blue-600'}`}
              />
            )}
            <span>
              {typeof project.category === 'object'
                ? project.category.name
                : project.category}
            </span>
          </span>

          {project.subtitle && (
            <span
              className={`px-3.5 py-1 rounded-full text-xs font-semibold border backdrop-blur-md ${
                isDark
                  ? 'bg-red-500/10 border-red-500/20 text-red-400'
                  : 'bg-blue-100 border-blue-200 text-blue-700'
              }`}
            >
              {project.subtitle}
            </span>
          )}
        </div>

        <h1
          className={`text-3xl sm:text-4xl md:text-5xl font-extrabold mb-4 tracking-tight ${
            isDark ? 'text-white' : 'text-slate-900'
          }`}
          style={{ letterSpacing: '-0.02em' }}
        >
          {project.title}
        </h1>

        <p
          className={`text-lg sm:text-xl mb-6 leading-relaxed ${
            isDark ? 'text-slate-300' : 'text-slate-600'
          }`}
        >
          {project.description}
        </p>

        {/* Meta Info */}
        <div className="flex flex-wrap gap-6 text-sm">
          {project.date && (
            <div className="flex items-center gap-2">
              <Calendar
                className={`w-4 h-4 ${isDark ? 'text-red-400' : 'text-blue-600'}`}
              />
              <span className={isDark ? 'text-slate-400' : 'text-slate-600'}>
                {project.date}
              </span>
            </div>
          )}
          {project.team && (
            <div className="flex items-center gap-2">
              <Users
                className={`w-4 h-4 ${isDark ? 'text-yellow-400' : 'text-amber-600'}`}
              />
              <span className={isDark ? 'text-slate-400' : 'text-slate-600'}>
                {project.team}
              </span>
            </div>
          )}
        </div>
      </motion.div>

      {/* Action Buttons */}
      <motion.div
        initial={{ opacity: 0, y: shouldReduceMotion ? 0 : 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={
          shouldReduceMotion
            ? { duration: 0 }
            : { duration: 0.5, delay: 0.15, ease: SMOOTH_EASE }
        }
        className="flex flex-wrap gap-4"
      >
        {project.link && project.link !== '#' && (
          <motion.a
            href={project.link}
            target="_blank"
            rel="noopener noreferrer"
            aria-label={`View ${project.title} live deployment`}
            whileHover={shouldReduceMotion ? undefined : { scale: 1.02 }}
            whileTap={shouldReduceMotion ? undefined : { scale: 0.97 }}
            className={`min-h-[44px] inline-flex items-center gap-2 px-6 py-2.5 rounded-xl font-bold shadow-lg transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 ${
              isDark
                ? 'bg-gradient-to-r from-red-600 to-yellow-500 text-white hover:shadow-red-500/30 focus-visible:ring-red-500'
                : 'bg-gradient-to-r from-blue-600 to-indigo-600 text-white hover:shadow-blue-500/30 focus-visible:ring-blue-500'
            }`}
          >
            <ExternalLink className="w-4 h-4" />
            <span>{isDark ? 'View Live' : 'See in Action'}</span>
          </motion.a>
        )}

        {project.github && project.github !== '#' && (
          <motion.a
            href={project.github}
            target="_blank"
            rel="noopener noreferrer"
            aria-label={`View ${project.title} source code on GitHub`}
            whileHover={shouldReduceMotion ? undefined : { scale: 1.02 }}
            whileTap={shouldReduceMotion ? undefined : { scale: 0.97 }}
            className={`min-h-[44px] inline-flex items-center gap-2 px-6 py-2.5 rounded-xl border font-bold transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 ${
              isDark
                ? 'border-white/[0.12] bg-slate-800/80 text-white hover:bg-slate-700/80 focus-visible:ring-red-500'
                : 'border-blue-200 bg-white text-blue-700 hover:bg-blue-50 focus-visible:ring-blue-500 shadow-sm'
            }`}
          >
            <Github className="w-4 h-4" />
            <span>{isDark ? 'Source Code' : 'View Runes'}</span>
          </motion.a>
        )}
      </motion.div>
    </div>
  );
}
