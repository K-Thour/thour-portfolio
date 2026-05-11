import { motion } from 'motion/react';
import { useInView } from 'motion/react';
import { useRef } from 'react';
import { useTheme } from '../context/ThemeContext';
import { ProjectsHeader } from '../components/projects/ProjectsHeader';
import {
  ProjectCard,
  type ProjectItem,
} from '../components/projects/ProjectCard';
import { ProjectsCta } from '../components/projects/ProjectsCta';
import { useEffect, useState } from 'react';
import { fetchProjects } from '../../services/api';

export function Projects() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, amount: 0.2 });
  const { theme } = useTheme();
  const isDark = theme === 'avengers';

  const [projects, setProjects] = useState<ProjectItem[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadProjects = async () => {
      try {
        const data = await fetchProjects();
        const formattedProjects = data.map((p: any) => ({
          id: p._id,
          title: p.title,
          subtitle: p.device || 'Project',
          description: p.description,
          image: p.image?.url || 'https://via.placeholder.com/1080',
          tags: p.techStack || [],
          link: p.workingUrl || '#',
          github: p.githubUrl || '#',
          status: p.isActive ? 'Active' : 'Completed',
        }));
        setProjects(formattedProjects);
      } catch (error) {
        console.error('Error fetching projects:', error);
      } finally {
        setLoading(false);
      }
    };
    loadProjects();
  }, []);

  return (
    <div
      className={`min-h-screen pt-24 pb-20 ${
        isDark
          ? 'bg-gradient-to-b from-slate-950 to-slate-900'
          : 'bg-gradient-to-b from-slate-50 via-blue-50 to-white'
      }`}
    >
      <div className="container mx-auto px-6">
        <motion.div
          ref={ref}
          initial={{ opacity: 0, y: 50 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 50 }}
          transition={{ duration: 0.8 }}
        >
          {/* Header */}
          <ProjectsHeader isInView={isInView} />

          {/* Projects Grid */}
          {loading ? (
            <div className="flex justify-center py-20">
              <div className="w-10 h-10 border-4 border-blue-500 border-t-transparent rounded-full animate-spin"></div>
            </div>
          ) : projects.length === 0 ? (
            <div className="text-center py-20 text-slate-500">No projects found.</div>
          ) : (
            <div className="grid md:grid-cols-2 gap-8 max-w-6xl mx-auto">
              {projects.map((project, index) => (
                <ProjectCard
                  key={project.id}
                  project={project}
                  index={index}
                  isInView={isInView}
                />
              ))}
            </div>
          )}

          {/* CTA Section */}
          <ProjectsCta isInView={isInView} />
        </motion.div>
      </div>
    </div>
  );
}
