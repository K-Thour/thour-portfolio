import { motion } from 'motion/react';
import { useInView } from 'motion/react';
import { useRef } from 'react';
import { Link, useParams } from 'react-router';
import { ArrowLeft } from 'lucide-react';
import { useTheme } from '../context/ThemeContext';
import { ProjectHeader } from '../components/project/ProjectHeader';
import { ProjectFeatures } from '../components/project/ProjectFeatures';
import { ProjectResults } from '../components/project/ProjectResults';

import { useEffect, useState } from 'react';
import { fetchProjectById } from '../../services/api';

export function ProjectDetail() {
  const { projectId } = useParams();
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, amount: 0.2 });
  const { theme } = useTheme();
  const isDark = theme === 'avengers';

  const [project, setProject] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadProject = async () => {
      if (!projectId) return;
      try {
        const data = await fetchProjectById(projectId);
        if (data) {
          setProject({
            title: data.title,
            subtitle: data.device || 'Project',
            category: data.category || 'Category',
            description: data.description,
            image: data.image?.url || 'https://via.placeholder.com/1080',
            status: data.isActive ? 'Active' : 'Completed',
            date: new Date(data.year, 0, 1).getFullYear().toString() || '2024',
            team: data.role || 'Solo Developer',
            technologies: data.techStack || [],
            link: data.workingUrl || '#',
            github: data.githubUrl || '#',
            challenges: data.projectMetric || [],
            features: [data.fullDescription],
            results: data.projectTestimonial || [],
          });
        }
      } catch (error) {
        console.error('Error fetching project:', error);
      } finally {
        setLoading(false);
      }
    };
    loadProject();
  }, [projectId]);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="w-10 h-10 border-4 border-blue-500 border-t-transparent rounded-full animate-spin"></div>
      </div>
    );
  }

  if (!project) {
    return (
      <div className="min-h-screen flex items-center justify-center pt-16">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-white mb-4">
            Project Not Found
          </h1>
          <Link to="/projects" className="text-red-500 hover:underline">
            Back to Projects
          </Link>
        </div>
      </div>
    );
  }

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
          className="max-w-5xl mx-auto"
        >
          {/* Back Button */}
          <Link
            to="/projects"
            className={`inline-flex items-center gap-2 mb-8 transition-colors ${
              isDark
                ? 'text-gray-400 hover:text-white'
                : 'text-gray-600 hover:text-gray-900'
            }`}
          >
            <ArrowLeft className="w-5 h-5" />
            <span>{isDark ? 'Back to Projects' : 'Return to Saga'}</span>
          </Link>

          {/* Header */}
          <ProjectHeader project={project} isInView={isInView} />

          {/* Hero Image */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={
              isInView ? { opacity: 1, scale: 1 } : { opacity: 0, scale: 0.95 }
            }
            transition={{ duration: 0.8, delay: 0.3 }}
            className={`rounded-2xl overflow-hidden mb-12 border ${
              isDark
                ? 'border-red-500/20'
                : 'border-blue-300/30 shadow-xl shadow-blue-500/10'
            }`}
          >
            <img
              src={project.image}
              alt={project.title}
              className="w-full h-96 object-cover"
            />
          </motion.div>

          {/* Features, Technologies, Challenges */}
          <ProjectFeatures project={project} isInView={isInView} />

          {/* Results & CTA */}
          <ProjectResults project={project} isInView={isInView} />
        </motion.div>
      </div>
    </div>
  );
}
