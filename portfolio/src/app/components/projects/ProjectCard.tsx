import { motion, useReducedMotion } from 'motion/react';
import { ExternalLink, Github, Sparkles, ArrowRight } from 'lucide-react';
import { Link, useNavigate } from 'react-router';
import { useContext, useState } from 'react';
import { ThemeContext } from '../../context/ThemeContext';

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
  isInView?: boolean;
}

const SMOOTH_EASE = [0.22, 1, 0.36, 1] as const;

export function ProjectCard({ project, index, isInView = true }: ProjectCardProps) {
  const themeCtx = useContext(ThemeContext);
  const isDark = themeCtx ? themeCtx.theme === 'avengers' : true;
  const shouldReduceMotion = useReducedMotion() ?? false;
  const navigate = useNavigate();
  const [imgError, setImgError] = useState(false);

  const handleCardClick = (e: React.MouseEvent) => {
    // If the click happened on an anchor or button, let that element handle it
    if ((e.target as HTMLElement).closest('a, button')) {
      return;
    }
    navigate(`/projects/${project.id}`);
  };

  return (
    <motion.div
      data-testid={`project-card-${project.id}`}
      initial={{ opacity: 0, y: shouldReduceMotion ? 0 : 24 }}
      animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: shouldReduceMotion ? 0 : 24 }}
      transition={
        shouldReduceMotion
          ? { duration: 0 }
          : { duration: 0.5, delay: index * 0.08, ease: SMOOTH_EASE }
      }
      whileHover={
        shouldReduceMotion
          ? undefined
          : { y: -4, scale: 1.01, transition: { type: 'spring', bounce: 0, duration: 0.3 } }
      }
      onClick={handleCardClick}
      className={`group relative rounded-2xl overflow-hidden border backdrop-blur-xl backdrop-saturate-[180%] flex flex-col shadow-lg transition-colors cursor-pointer ${
        isDark
          ? 'bg-slate-800/60 border-white/[0.08] hover:border-red-500/40 hover:shadow-red-500/10'
          : 'bg-white/90 border-black/[0.06] shadow-sm hover:border-blue-400/50 hover:shadow-md hover:shadow-blue-500/10'
      }`}
    >
      {/* Top hairline highlight */}
      <div
        aria-hidden="true"
        className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-white/30 to-transparent z-10"
      />

      {/* Media Container */}
      <div className="relative aspect-video overflow-hidden bg-slate-950">
        {!imgError ? (
          <img
            src={project.image}
            alt={project.title}
            loading="lazy"
            onError={() => setImgError(true)}
            className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
          />
        ) : (
          <div
            className={`w-full h-full flex items-center justify-center ${
              isDark ? 'bg-slate-800' : 'bg-slate-100'
            }`}
          >
            <span
              className={`text-4xl font-extrabold tracking-tight ${
                isDark ? 'text-slate-600' : 'text-slate-300'
              }`}
            >
              {project.title.slice(0, 2).toUpperCase()}
            </span>
          </div>
        )}

        {/* Status Badge */}
        <div className="absolute top-4 left-4 z-10">
          <span
            className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold backdrop-blur-md ${
              project.status === 'Completed' || project.status === 'Victory'
                ? isDark
                  ? 'bg-emerald-500/20 text-emerald-400 border border-emerald-500/30'
                  : 'bg-emerald-50 text-emerald-700 border border-emerald-200'
                : isDark
                  ? 'bg-yellow-500/20 text-yellow-400 border border-yellow-500/30'
                  : 'bg-yellow-50 text-yellow-700 border border-yellow-200'
            }`}
          >
            <Sparkles className="w-3 h-3" />
            <span>{project.status || 'Production'}</span>
          </span>
        </div>

        {/* External Hover Actions Overlay */}
        <div className="absolute inset-0 bg-gradient-to-t from-slate-950/80 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end justify-end p-4 gap-3 z-20">
          {project.github && project.github !== '#' && (
            <motion.a
              href={project.github}
              target="_blank"
              rel="noopener noreferrer"
              aria-label={`View ${project.title} source on GitHub`}
              onClick={(e) => e.stopPropagation()}
              whileTap={shouldReduceMotion ? undefined : { scale: 0.97 }}
              className="min-w-[44px] min-h-[44px] inline-flex items-center justify-center rounded-full bg-slate-900/90 text-white hover:bg-red-600 transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-white"
            >
              <Github className="w-4 h-4" />
            </motion.a>
          )}
          {project.link && project.link !== '#' && (
            <motion.a
              href={project.link}
              target="_blank"
              rel="noopener noreferrer"
              aria-label={`View ${project.title} live demo`}
              onClick={(e) => e.stopPropagation()}
              whileTap={shouldReduceMotion ? undefined : { scale: 0.97 }}
              className="min-w-[44px] min-h-[44px] inline-flex items-center justify-center rounded-full bg-slate-900/90 text-white hover:bg-blue-600 transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-white"
            >
              <ExternalLink className="w-4 h-4" />
            </motion.a>
          )}
        </div>
      </div>

      {/* Content Section */}
      <div className="p-6 sm:p-7 flex-1 flex flex-col justify-between">
        <div>
          <div
            className={`text-xs font-bold uppercase tracking-widest mb-1.5 ${
              isDark ? 'text-red-400' : 'text-blue-600'
            }`}
          >
            {project.subtitle}
          </div>

          <h3
            className={`text-xl sm:text-2xl font-bold tracking-tight mb-2 line-clamp-1 ${
              isDark ? 'text-white' : 'text-slate-900'
            }`}
            style={{ letterSpacing: '-0.01em' }}
          >
            <Link
              to={`/projects/${project.id}`}
              aria-label={`View case study for ${project.title}`}
              className="hover:underline focus:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 rounded"
            >
              {project.title}
            </Link>
          </h3>

          {project.description && (
            <p
              className={`text-sm leading-relaxed mb-4 line-clamp-2 ${
                isDark ? 'text-slate-300' : 'text-slate-600'
              }`}
            >
              {project.description}
            </p>
          )}
        </div>

        {/* Tags & Case Study Link */}
        <div>
          {project.tags.length > 0 && (
            <div
              className={`flex flex-wrap gap-2 pt-4 border-t mb-4 ${
                isDark ? 'border-white/[0.06]' : 'border-black/[0.06]'
              }`}
            >
              {project.tags.slice(0, 4).map((tag) => (
                <span
                  key={tag}
                  className={`px-2.5 py-1 rounded-md text-xs font-medium ${
                    isDark
                      ? 'bg-slate-700/60 text-slate-300'
                      : 'bg-blue-50 text-blue-700'
                  }`}
                >
                  {tag}
                </span>
              ))}
              {project.tags.length > 4 && (
                <span
                  className={`px-2 py-1 rounded-md text-xs font-medium ${
                    isDark ? 'bg-slate-700/40 text-slate-500' : 'bg-slate-100 text-slate-500'
                  }`}
                >
                  +{project.tags.length - 4}
                </span>
              )}
            </div>
          )}

          <div
            className={`flex items-center gap-1.5 text-xs font-bold transition-transform duration-200 group-hover:translate-x-1 ${
              isDark ? 'text-red-400' : 'text-blue-600'
            }`}
          >
            <span>Explore Case Study</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </div>
        </div>
      </div>
    </motion.div>
  );
}
