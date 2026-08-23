import { motion, AnimatePresence } from 'motion/react';
import { useInView } from 'motion/react';
import { useRef, useEffect, useState } from 'react';
import { useTheme } from '../context/ThemeContext';
import { ProjectsHeader } from '../components/projects/ProjectsHeader';
import {
  ProjectCard,
  type ProjectItem,
} from '../components/projects/ProjectCard';
import { ProjectsCta } from '../components/projects/ProjectsCta';
import { ProjectSkeletonCard } from '../components/ui/skeleton';
import { fetchProjects } from '../../services/api';
import { SEOHead } from '../components/seo/SEOHead';

export function Projects() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, amount: 0.1 });
  const { theme } = useTheme();
  const isDark = theme === 'avengers';

  const [projects, setProjects] = useState<ProjectItem[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let isMounted = true;
    const loadProjects = async () => {
      try {
        const data = await fetchProjects();
        if (!isMounted) return;
        const formattedProjects = data.map((p: any) => ({
          id: p._id,
          title: p.title || '',
          subtitle: p.device || 'Project',
          description: p.description || '',
          image: p.image?.url || 'https://via.placeholder.com/1080',
          tags:
            p.techStack?.map((tech: any) => {
              if (typeof tech === 'object' && tech !== null) {
                return tech.name;
              }
              return tech;
            }) || [],
          link: p.workingUrl || '#',
          github: p.githubUrl || '#',
          status: p.isActive ? 'Completed' : 'Completed',
        }));
        setProjects(formattedProjects);
      } catch (error) {
        console.error('Error fetching projects:', error);
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
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
          transition={{ duration: 0.6 }}
        >
          {/* Header */}
          <ProjectsHeader isInView={isInView} />

          {/* Projects Grid with Smooth Skeletons */}
          <AnimatePresence mode="wait">
            {loading ? (
              <motion.div
                key="projects-skeleton"
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
