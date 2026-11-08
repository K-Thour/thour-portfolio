import { useContext, useEffect, useReducer, useRef, useState } from 'react';
import { motion } from 'motion/react';
import { useReducedMotion } from 'motion/react';
import { Link } from 'react-router';
import { ArrowRight, Sparkles, ExternalLink, Github } from 'lucide-react';
import { ThemeContext } from '../../context/ThemeContext';
import { fetchProjects } from '../../../services/api';

interface ProjectItem {
  id: string;
  title: string;
  subtitle: string;
  description: string;
  image: string;
  tags: string[];
  link: string;
  github: string;
}

const SMOOTH_EASE = [0.22, 1, 0.36, 1] as const;

interface ProjectCardProps {
  project: ProjectItem;
  idx: number;
  isDark: boolean;
  shouldReduceMotion: boolean;
}

function ProjectCard({ project, idx, isDark, shouldReduceMotion }: ProjectCardProps) {
  const [imgError, setImgError] = useState(false);

  return (
    <motion.div
      data-testid={`project-card-${idx}`}
      initial={{ opacity: 0, y: shouldReduceMotion ? 0 : 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={
        shouldReduceMotion
          ? { duration: 0 }
          : { duration: 0.5, delay: idx * 0.1, ease: SMOOTH_EASE }
      }
      whileHover={shouldReduceMotion ? undefined : { y: -4, scale: 1.01 }}
      className={`group relative rounded-2xl overflow-hidden border backdrop-blur-xl backdrop-saturate-[180%] flex flex-col shadow-lg ${
        isDark
          ? 'bg-slate-800/60 border-white/[0.08] hover:border-red-500/40 hover:shadow-red-500/10'
          : 'bg-white/90 border-black/[0.06] shadow-md hover:border-blue-500/40 hover:shadow-blue-500/10'
      }`}
    >
      {/* Top hairline highlight */}
      <div
        aria-hidden="true"
        className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-white/30 to-transparent"
      />

      {/* Thumbnail */}
      <div className="relative aspect-video overflow-hidden bg-slate-950">
        {!imgError ? (
          <img
            src={project.image}
            alt={project.title}
            className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
            loading="lazy"
            onError={() => setImgError(true)}
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

        {/* Hover overlay with actions */}
        <div className="absolute inset-0 bg-gradient-to-t from-slate-950/80 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end justify-end p-4 gap-3">
          {project.github && project.github !== '#' && (
            <motion.a
              href={project.github}
              target="_blank"
              rel="noopener noreferrer"
              aria-label={`View ${project.title} source code on GitHub`}
              whileTap={shouldReduceMotion ? undefined : { scale: 0.97 }}
              className="min-w-[44px] min-h-[44px] inline-flex items-center justify-center rounded-full bg-slate-900/90 text-white hover:bg-red-600 transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-red-500"
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
              whileTap={shouldReduceMotion ? undefined : { scale: 0.97 }}
              className="min-w-[44px] min-h-[44px] inline-flex items-center justify-center rounded-full bg-slate-900/90 text-white hover:bg-blue-600 transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-500"
            >
              <ExternalLink className="w-4 h-4" />
            </motion.a>
          )}
        </div>
      </div>

      {/* Content */}
      <div className="p-6 flex-1 flex flex-col justify-between">
        <div>
          <span
            className={`text-xs font-semibold uppercase tracking-widest ${
              isDark ? 'text-yellow-400' : 'text-blue-600'
            }`}
          >
            {project.subtitle}
          </span>
          <h3
            className={`text-xl font-bold tracking-tight mt-1 mb-2 line-clamp-1 ${
              isDark ? 'text-white' : 'text-slate-900'
            }`}
            style={{ letterSpacing: '-0.01em' }}
          >
            {project.title}
          </h3>
          <p
            className={`text-sm line-clamp-2 leading-relaxed mb-4 ${
              isDark ? 'text-slate-400' : 'text-slate-600'
            }`}
          >
            {project.description}
          </p>
        </div>

        {/* Tech Stack Pills */}
        <div
          className={`flex flex-wrap gap-2 pt-3 border-t ${
            isDark ? 'border-white/[0.06]' : 'border-black/[0.06]'
          }`}
        >
          {project.tags.slice(0, 3).map((tag, tagIdx) => (
            <span
              key={tagIdx}
              className={`text-xs px-2.5 py-1 rounded-md font-medium ${
                isDark
                  ? 'bg-slate-700/60 text-slate-300'
                  : 'bg-blue-50 text-blue-700'
              }`}
            >
              {tag}
            </span>
          ))}
          {project.tags.length > 3 && (
            <span
              className={`text-xs px-2.5 py-1 rounded-md font-medium ${
                isDark ? 'bg-slate-700/40 text-slate-500' : 'bg-slate-100 text-slate-500'
              }`}
            >
              +{project.tags.length - 3}
            </span>
          )}
        </div>
      </div>
    </motion.div>
  );
}

export function HomeFeaturedProjects() {
  const themeCtx = useContext(ThemeContext);
  const isDark = themeCtx ? themeCtx.theme === 'avengers' : true;
  const shouldReduceMotion = useReducedMotion() ?? false;

  const [featuredProjects, setFeaturedProjects] = useState<ProjectItem[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let isMounted = true;
    const load = async () => {
      try {
        const data = await fetchProjects();
        if (!isMounted) return;
        const formatted = (Array.isArray(data) ? data : []).slice(0, 3).map(
          (p: any) => ({
            id: p._id || String(Math.random()),
            title: (p.title || 'Project').trim(),
            subtitle: (p.subtitle || p.device || 'Full Stack App').trim(),
            description: (p.description || '').trim(),
            image: p.image?.url || '',
            tags: Array.isArray(p.techStack)
              ? p.techStack.map((tech: any) =>
                  typeof tech === 'object' && tech !== null
                    ? (tech.name || '').trim()
                    : String(tech).trim(),
                ).filter(Boolean)
              : [],
            link: p.workingUrl || '#',
            github: p.githubUrl || '#',
          }),
        );
        setFeaturedProjects(formatted);
      } catch (e) {
        console.error('Failed to load featured projects:', e);
      } finally {
        if (isMounted) setLoading(false);
      }
    };
    load();
    return () => {
      isMounted = false;
    };
  }, []);

  if (!loading && featuredProjects.length === 0) {
    return null;
  }

  return (
    <section
      data-testid="featured-projects-section"
      className={`py-24 relative ${isDark ? 'bg-slate-900/60' : 'bg-white/80'}`}
    >
      <div className="container mx-auto px-6 max-w-7xl">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-16 gap-6">
          <div>
            <div className="flex items-center gap-2 mb-3">
              <Sparkles
                className={`w-5 h-5 ${isDark ? 'text-yellow-500' : 'text-blue-600'}`}
              />
              <span
                className={`text-xs font-bold uppercase tracking-widest ${
                  isDark ? 'text-yellow-400' : 'text-blue-600'
                }`}
              >
                Featured Work
              </span>
            </div>
            <h2
              className={`text-3xl sm:text-4xl font-extrabold tracking-tight ${
                isDark ? 'text-white' : 'text-slate-900'
              }`}
              style={{ letterSpacing: '-0.02em' }}
            >
              Recent Milestones &amp; Case Studies
            </h2>
          </div>

          <Link
            to="/projects"
            aria-label="Explore all projects"
            className={`inline-flex items-center gap-2 font-semibold text-sm transition-all group min-h-[44px] px-1 ${
              isDark
                ? 'text-red-400 hover:text-red-300'
                : 'text-blue-600 hover:text-blue-800'
            }`}
          >
            <span>Explore All Projects</span>
            <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
          </Link>
        </div>

        {/* Projects Cards Grid */}
        <div
          data-testid="projects-grid"
          className="grid md:grid-cols-2 lg:grid-cols-3 gap-8"
        >
          {loading
            ? Array.from({ length: 3 }).map((_, i) => (
                <div
                  key={i}
                  data-testid="project-skeleton"
                  className={`rounded-2xl p-4 border animate-pulse ${
                    isDark
                      ? 'bg-slate-800/40 border-white/[0.06]'
                      : 'bg-slate-100 border-black/[0.06]'
                  }`}
                >
                  <div className="aspect-video rounded-xl bg-slate-700/40 mb-4" />
                  <div className="h-6 bg-slate-700/40 rounded w-3/4 mb-2" />
                  <div className="h-4 bg-slate-700/40 rounded w-full mb-4" />
                  <div className="flex gap-2">
                    <div className="h-5 bg-slate-700/40 rounded w-16" />
                    <div className="h-5 bg-slate-700/40 rounded w-16" />
                  </div>
                </div>
              ))
            : featuredProjects.map((project, idx) => (
                <ProjectCard
                  key={project.id || idx}
                  project={project}
                  idx={idx}
                  isDark={isDark}
                  shouldReduceMotion={shouldReduceMotion}
                />
              ))}
        </div>
      </div>
    </section>
  );
}
