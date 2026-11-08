import { motion, AnimatePresence, useReducedMotion } from 'motion/react';
import { useEffect, useState, useContext } from 'react';
import { useParams } from 'react-router';
import { ThemeContext } from '../context/ThemeContext';
import { ProjectHeader } from '../components/project/ProjectHeader';
import { ProjectFeatures } from '../components/project/ProjectFeatures';
import { ProjectResults } from '../components/project/ProjectResults';
import { ProjectDetailSkeleton } from '../components/ui/skeleton';
import { BackButton } from '../components/ui/BackButton';
import { fetchProjectById } from '../../services/api';
import { SEOHead } from '../components/seo/SEOHead';

export function ProjectDetail() {
  const { projectId } = useParams();
  const themeCtx = useContext(ThemeContext);
  const isDark = themeCtx ? themeCtx.theme === 'avengers' : true;
  const shouldReduceMotion = useReducedMotion() ?? false;

  const [project, setProject] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [heroImgError, setHeroImgError] = useState(false);

  useEffect(() => {
    let isMounted = true;
    const loadProject = async () => {
      if (!projectId) {
        setLoading(false);
        return;
      }
      setLoading(true);
      try {
        const data = await fetchProjectById(projectId);
        if (!isMounted) return;
        if (data) {
          setProject({
            title: data.title,
            subtitle: data.device || 'Project Case Study',
            category:
              data.category && typeof data.category === 'object'
                ? {
                    name: data.category.name,
                    iconUrl: data.category.iconUrl?.url || null,
                  }
                : { name: data.category || 'Engineering', iconUrl: null },
            description: data.description,
            fullDescription: data.fullDescription || '',
            image: data.image?.url || '',
            outcome: data.outcome || '',
            date: data.year ? data.year.toString() : '2026',
            team: data.role || 'Lead Engineer',
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
            challenges: Array.isArray(data.projectMetric) ? data.projectMetric : [],
            features: Array.isArray(data.features) ? data.features : [],
            results: Array.isArray(data.projectTestimonial) ? data.projectTestimonial : [],
          });
        } else {
          setProject(null);
        }
      } catch (error) {
        console.error('Error fetching project:', error);
        if (isMounted) setProject(null);
      } finally {
        if (isMounted) setLoading(false);
      }
    };
    loadProject();
    return () => {
      isMounted = false;
    };
  }, [projectId]);

  return (
    <div
      data-testid="project-detail-page"
      className={`min-h-screen pt-24 pb-20 ${
        isDark
          ? 'bg-gradient-to-b from-slate-950 to-slate-900'
          : 'bg-gradient-to-b from-slate-50 via-blue-50 to-white'
      }`}
    >
      <SEOHead
        title={project ? `${project.title} | Case Study` : 'Project Case Study'}
        description={project?.description || 'Deep-dive case study and engineering architecture.'}
      />
      <div className="container mx-auto px-6">
        <AnimatePresence mode="wait">
          {loading ? (
            <motion.div
              key="detail-skeleton"
              data-testid="detail-skeleton"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.2 }}
            >
              <ProjectDetailSkeleton />
            </motion.div>
          ) : !project ? (
            <motion.div
              key="detail-empty"
              data-testid="detail-empty"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="text-center py-20 max-w-md mx-auto"
            >
              <h1
                className={`text-3xl font-extrabold mb-4 tracking-tight ${
                  isDark ? 'text-white' : 'text-slate-900'
                }`}
                style={{ letterSpacing: '-0.02em' }}
              >
                Project Not Found
              </h1>
              <p
                className={`text-sm mb-8 leading-relaxed ${
                  isDark ? 'text-slate-400' : 'text-slate-600'
                }`}
              >
                The case study you requested could not be located. It may have been archived or moved.
              </p>
              <div className="flex justify-center">
                <BackButton fallbackPath="/projects" label="Back to Projects" />
              </div>
            </motion.div>
          ) : (
            <motion.div
              key="detail-content"
              data-testid="detail-content"
              initial={{ opacity: 0, y: shouldReduceMotion ? 0 : 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4 }}
              className="max-w-5xl mx-auto"
            >
              {/* Top Navigation */}
              <div className="mb-8">
                <BackButton fallbackPath="/projects" label="Back to Projects" />
              </div>

              {/* Header */}
              <ProjectHeader project={project} />

              {/* Hero Image */}
              <motion.div
                initial={{ opacity: 0, scale: shouldReduceMotion ? 1 : 0.98 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.5 }}
                className={`rounded-2xl overflow-hidden mb-12 border backdrop-blur-xl relative aspect-[16/9] shadow-2xl ${
                  isDark
                    ? 'border-white/[0.08] bg-slate-950'
                    : 'border-black/[0.06] shadow-xl shadow-blue-500/10 bg-slate-100'
                }`}
              >
                {/* Top hairline */}
                <div
                  aria-hidden="true"
                  className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-white/30 to-transparent z-10"
                />

                {!heroImgError && project.image ? (
                  <img
                    src={project.image}
                    alt={project.title}
                    onError={() => setHeroImgError(true)}
                    className="w-full h-full object-cover"
                  />
                ) : (
                  <div className="w-full h-full flex items-center justify-center">
                    <span
                      className={`text-6xl font-extrabold tracking-tight ${
                        isDark ? 'text-slate-700' : 'text-slate-300'
                      }`}
                    >
                      {project.title.slice(0, 2).toUpperCase()}
                    </span>
                  </div>
                )}
              </motion.div>

              {/* Full Description & Mission Overview */}
              {project.fullDescription &&
                project.fullDescription !== project.description && (
                  <div
                    data-testid="project-mission-overview"
                    className={`mb-14 rounded-3xl p-8 sm:p-10 border backdrop-blur-xl backdrop-saturate-[180%] shadow-lg relative overflow-hidden ${
                      isDark
                        ? 'bg-slate-900/60 border-white/[0.08]'
                        : 'bg-white/90 border-black/[0.06] shadow-sm'
                    }`}
                  >
                    {/* Top hairline */}
                    <div
                      aria-hidden="true"
                      className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-white/30 to-transparent"
                    />

                    <h2
                      className={`text-2xl font-bold mb-4 tracking-tight ${
                        isDark ? 'text-white' : 'text-slate-900'
                      }`}
                      style={{ letterSpacing: '-0.01em' }}
                    >
                      {isDark ? 'Mission Overview & Architecture' : 'About This Case Study'}
                    </h2>

                    <div
                      className={`border-l-4 pl-5 ${
                        isDark ? 'border-red-500' : 'border-blue-500'
                      }`}
                    >
                      <p
                        className={`text-base leading-relaxed whitespace-pre-line ${
                          isDark ? 'text-slate-300' : 'text-slate-600'
                        }`}
                      >
                        {project.fullDescription}
                      </p>
                    </div>
                  </div>
                )}

              {/* Features, Technologies, Challenges */}
              <ProjectFeatures project={project} />

              {/* Results & Conversion */}
              <ProjectResults project={project} />
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}
