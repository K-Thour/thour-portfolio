import { useEffect, useState } from 'react';
import { motion } from 'motion/react';
import { Link } from 'react-router';
import { ArrowRight, Sparkles, ExternalLink, Github } from 'lucide-react';
import { useTheme } from '../../context/ThemeContext';
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

export function HomeFeaturedProjects() {
  const { theme } = useTheme();
  const isDark = theme === 'avengers';
  const [featuredProjects, setFeaturedProjects] = useState<ProjectItem[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let isMounted = true;
    const load = async () => {
      try {
        const data = await fetchProjects();
        if (!isMounted) return;
        const formatted = data.slice(0, 3).map((p: any) => ({
          id: p._id,
          title: p.title || 'Project',
          subtitle: p.subtitle || p.device || 'Full Stack App',
          description: p.description || '',
          image: p.image?.url || 'https://via.placeholder.com/800x500',
          tags:
            p.techStack?.map((tech: any) => {
              if (typeof tech === 'object' && tech !== null) return tech.name;
              return tech;
            }) || [],
          link: p.workingUrl || '#',
          github: p.githubUrl || '#',
        }));
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
            >
              Recent Milestones &amp; Case Studies
            </h2>
          </div>

          <Link
            to="/projects"
            className={`inline-flex items-center gap-2 font-semibold text-sm transition-all group ${
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
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {loading
            ? Array.from({ length: 3 }).map((_, i) => (
                <div
                  key={i}
                  className={`rounded-2xl p-4 border animate-pulse ${
                    isDark
                      ? 'bg-slate-800/40 border-slate-700/50'
                      : 'bg-slate-100 border-slate-200'
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
                <motion.div
                  key={project.id || idx}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: idx * 0.1 }}
                  className={`group relative rounded-2xl overflow-hidden border flex flex-col transition-all duration-300 hover:scale-[1.02] hover:shadow-2xl ${
                    isDark
                      ? 'bg-slate-800/60 border-slate-700 hover:border-red-500/50 hover:shadow-red-500/10'
                      : 'bg-white border-slate-200 shadow-md hover:border-blue-500/50 hover:shadow-blue-500/10'
                  }`}
                >
                  {/* Thumbnail */}
                  <div className="relative aspect-video overflow-hidden bg-slate-950">
                    <img
                      src={project.image}
                      alt={project.title}
                      className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                      loading="lazy"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-slate-950/80 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity flex items-end justify-end p-4 gap-3">
                      {project.github && project.github !== '#' && (
                        <a
                          href={project.github}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="p-2 rounded-full bg-slate-900/90 text-white hover:bg-red-600 transition-colors"
                          aria-label="View Source Code on GitHub"
                        >
                          <Github className="w-4 h-4" />
                        </a>
                      )}
                      {project.link && project.link !== '#' && (
                        <a
                          href={project.link}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="p-2 rounded-full bg-slate-900/90 text-white hover:bg-blue-600 transition-colors"
                          aria-label="View Live Project Demo"
                        >
                          <ExternalLink className="w-4 h-4" />
                        </a>
                      )}
                    </div>
                  </div>

                  {/* Content */}
                  <div className="p-6 flex-1 flex flex-col justify-between">
                    <div>
                      <span
                        className={`text-xs font-semibold uppercase tracking-wider ${
                          isDark ? 'text-yellow-400' : 'text-blue-600'
                        }`}
                      >
                        {project.subtitle}
                      </span>
                      <h3
                        className={`text-xl font-bold mt-1 mb-2 line-clamp-1 ${
                          isDark ? 'text-white' : 'text-slate-900'
                        }`}
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
                    <div className="flex flex-wrap gap-2 pt-2 border-t border-slate-700/40">
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
                    </div>
                  </div>
                </motion.div>
              ))}
        </div>
      </div>
    </section>
  );
}
