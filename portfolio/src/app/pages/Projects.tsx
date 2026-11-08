import { motion, AnimatePresence, useReducedMotion } from 'motion/react';
import { useInView } from 'motion/react';
import { useRef, useEffect, useState, useContext } from 'react';
import { ThemeContext } from '../context/ThemeContext';
import { ProjectsHeader } from '../components/projects/ProjectsHeader';
import {
  ProjectCard,
  type ProjectItem,
} from '../components/projects/ProjectCard';
import { ProjectsCta } from '../components/projects/ProjectsCta';
import { ProjectSkeletonCard } from '../components/ui/skeleton';
import { fetchProjects } from '../../services/api';
import { SEOHead } from '../components/seo/SEOHead';

// Fallback project data if network request fails
const FALLBACK_PROJECTS: ProjectItem[] = [
  {
    id: 'neurogrid-fallback',
    title: 'NeuroGrid AI Dashboard',
    subtitle: 'AI & Data Visualization',
    description: 'High-throughput real-time AI metrics visualization platform powered by React and WebSockets.',
    image: '',
    tags: ['React', 'TypeScript', 'TailwindCSS', 'WebSockets'],
    link: '#',
    github: 'https://github.com/karanveerthour',
    status: 'Completed',
  },
  {
    id: 'portfolio-os-fallback',
    title: 'Developer Portfolio OS',
    subtitle: 'Apple-Grade Web App',
    description: 'macOS-inspired interactive portfolio featuring fluid spring physics, dual-theme engine, and AI assistant.',
    image: '',
    tags: ['React Router', 'Framer Motion', 'TailwindCSS', 'Vite'],
    link: '#',
    github: 'https://github.com/karanveerthour',
    status: 'Completed',
  },
];

export function Projects() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, amount: 0.1 });
  const themeCtx = useContext(ThemeContext);
  const isDark = themeCtx ? themeCtx.theme === 'avengers' : true;
  const shouldReduceMotion = useReducedMotion() ?? false;

  const [projects, setProjects] = useState<ProjectItem[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let isMounted = true;
    const loadProjects = async () => {
      try {
        const data = await fetchProjects();
        if (!isMounted) return;
        const formattedProjects: ProjectItem[] = (Array.isArray(data) ? data : []).map(
          (p: any, idx: number) => ({
            id: p._id || `proj-${idx}`,
            title: (p.title || 'Project').trim(),
            subtitle: (p.subtitle || p.device || 'Full Stack App').trim(),
            description: (p.description || '').trim(),
            image: p.image?.url || '',
            tags: Array.isArray(p.techStack)
              ? p.techStack
                  .map((tech: any) =>
                    typeof tech === 'object' && tech !== null
                      ? (tech.name || '').trim()
                      : String(tech).trim(),
                  )
                  .filter(Boolean)
              : [],
            link: p.workingUrl || '#',
            github: p.githubUrl || '#',
            status: p.isActive ? 'Completed' : 'Completed',
          }),
        );
        setProjects(formattedProjects.length > 0 ? formattedProjects : FALLBACK_PROJECTS);
      } catch (error) {
        console.error('Error fetching projects, loading fallback:', error);
        if (isMounted) {
          setProjects(FALLBACK_PROJECTS);
        }
      } finally {
        if (isMounted) setLoading(false);
      }
    };
    loadProjects();
    return () => {
      isMounted = false;
    };
  }, []);

  return (
    <div
      data-testid="projects-page"
      className={`min-h-screen pt-24 pb-20 ${
        isDark
          ? 'bg-gradient-to-b from-slate-950 to-slate-900'
          : 'bg-gradient-to-b from-slate-50 via-blue-50 to-white'
      }`}
    >
      <SEOHead
        title="Featured Projects & Work | Karanveer Thour"
        description="Browse full stack web applications, AI projects, and software engineering case studies built by Karanveer Thour."
      />
      <div className="container mx-auto px-6">
        <motion.div
          ref={ref}
          initial={{ opacity: 0, y: shouldReduceMotion ? 0 : 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: shouldReduceMotion ? 0 : 30 }}
          transition={{ duration: 0.6 }}
        >
          {/* Header */}
          <ProjectsHeader isInView={isInView} />

          {/* Projects Grid with Smooth Skeletons */}
          <AnimatePresence mode="wait">
            {loading ? (
              <motion.div
                key="projects-skeleton"
                data-testid="projects-skeleton-grid"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.25 }}
                className="grid md:grid-cols-2 gap-8 max-w-6xl mx-auto"
              >
                {Array.from({ length: 4 }).map((_, i) => (
                  <ProjectSkeletonCard key={i} />
                ))}
              </motion.div>
            ) : projects.length === 0 ? (
              <motion.div
                key="projects-empty"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="text-center py-16 text-slate-500"
              >
                No projects found.
              </motion.div>
            ) : (
              <motion.div
                key="projects-grid"
                data-testid="projects-grid"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.4 }}
                className="grid md:grid-cols-2 gap-8 max-w-6xl mx-auto"
              >
                {projects.map((project, index) => (
                  <ProjectCard
                    key={project.id}
                    project={project}
                    index={index}
                    isInView={true}
                  />
                ))}
              </motion.div>
            )}
          </AnimatePresence>

          {/* CTA Section */}
          <ProjectsCta isInView={isInView} />
        </motion.div>
      </div>
    </div>
  );
}
