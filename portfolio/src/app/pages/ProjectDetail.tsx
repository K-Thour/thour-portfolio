import { motion } from 'motion/react';
import { useRef, useEffect, useState } from 'react';
import { Link, useParams } from 'react-router';
import { ArrowLeft } from 'lucide-react';
import { useTheme } from '../context/ThemeContext';
import { ProjectHeader } from '../components/project/ProjectHeader';
import { ProjectFeatures } from '../components/project/ProjectFeatures';
import { ProjectResults } from '../components/project/ProjectResults';
import { fetchProjectById } from '../../services/api';

export function ProjectDetail() {
  const { projectId } = useParams();
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
            category:
              data.category && typeof data.category === 'object'
                ? {
                    name: data.category.name,
                    iconUrl: data.category.iconUrl?.url || null,
                  }
                : { name: data.category || 'Category', iconUrl: null },
            description: data.description,
            fullDescription: data.fullDescription || '',
            image: data.image?.url || 'https://via.placeholder.com/1080',
            outcome: data.outcome || '',
            date: data.year ? data.year.toString() : '2026',
            team: data.role || 'Solo Developer',
            technologies: Array.isArray(data.techStack)
              ? data.techStack.map((t: any) =>
                  typeof t === 'object' && t?.name
                    ? {
                        _id: t._id,
                        name: t.name,
                        category: t.category || '',
                        iconUrl: t.iconUrl?.url || null,
                      }
                    : { name: String(t) },
                )
              : [],
            link: data.workingUrl || '#',
            github: data.githubUrl || '#',
            challenges: data.projectMetric || [],
            features: Array.isArray(data.features) ? data.features : [],
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
      <div
        className={`min-h-screen flex items-center justify-center pt-16 ${
          isDark
            ? 'bg-gradient-to-b from-slate-950 to-slate-900 text-white'
            : 'bg-gradient-to-b from-slate-50 via-blue-50 to-white text-gray-900'
        }`}
      >
        <div
          className={`w-10 h-10 border-4 border-t-transparent rounded-full animate-spin ${
            isDark ? 'border-red-500' : 'border-blue-500'
          }`}
        />
      </div>
    );
  }

  if (!project) {
    return (
      <div
        className={`min-h-screen flex items-center justify-center pt-16 ${
          isDark
            ? 'bg-gradient-to-b from-slate-950 to-slate-900'
            : 'bg-gradient-to-b from-slate-50 via-blue-50 to-white'
        }`}
      >
        <div className="text-center bg-transparent">
          <h1
            className={`text-2xl font-bold mb-4 ${
              isDark ? 'text-white' : 'text-gray-900'
            }`}
          >
            Project Not Found
          </h1>
          <Link
            to="/projects"
            className={`hover:underline font-semibold ${
              isDark
                ? 'text-red-500 hover:text-red-400'
                : 'text-blue-600 hover:text-blue-500'
            }`}
          >
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
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="max-w-5xl mx-auto"
        >
          {/* Back Button */}
          <Link
            to="../projects"
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
          <ProjectHeader project={project} />

          {/* Hero Image */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className={`rounded-2xl overflow-hidden mb-12 border ${
              isDark
                ? 'border-red-500/20 bg-slate-950'
                : 'border-blue-300/30 shadow-xl shadow-blue-500/10 bg-slate-950'
            }`}
          >
            <img
              src={project.image}
              alt={project.title}
              className="w-full aspect-[16/9] object-cover"
            />
          </motion.div>

          {/* Full Description */}
          {project.fullDescription &&
            project.fullDescription !== project.description && (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.3 }}
                className={`mb-12 rounded-2xl p-8 border ${
                  isDark
                    ? 'bg-slate-900/60 border-red-500/20'
                    : 'bg-white/70 border-blue-200 shadow-lg shadow-blue-500/5'
                }`}
              >
                <h2
                  className={`text-2xl font-bold mb-4 ${
                    isDark ? 'text-white' : 'text-gray-900'
                  }`}
                >
                  {isDark ? 'Mission Overview' : 'About This Project'}
                </h2>
                <div
                  className={`border-l-4 pl-5 ${
                    isDark ? 'border-red-500' : 'border-blue-500'
                  }`}
                >
                  <p
                    className={`text-base leading-relaxed whitespace-pre-line ${
                      isDark ? 'text-gray-300' : 'text-gray-700'
                    }`}
                  >
                    {project.fullDescription}
                  </p>
                </div>
              </motion.div>
            )}

          {/* Features, Technologies, Challenges */}
          <ProjectFeatures project={project} />

          {/* Results & CTA */}
          <ProjectResults project={project} />
        </motion.div>
      </div>
    </div>
  );
}
