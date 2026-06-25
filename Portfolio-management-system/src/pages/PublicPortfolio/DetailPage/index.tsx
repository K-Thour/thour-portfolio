import { motion } from "motion/react";
import { ProjectHeader } from "./components/ProjectHeader";
import { ProjectFeatures } from "./components/ProjectFeatures";
import { ProjectResults } from "./components/ProjectResults";
import { ProjectHeroImage } from "./components/ProjectHeroImage";
import { ProjectNotFound } from "./components/ProjectNotFound";
import { useProjectDetail } from "./hooks/useProjectDetail";
import { useEffect } from "react";
import { LoadingState } from "../../../components/common/loadingState/LoadingState";

function ProjectDetailPage() {
  const { project, isLoading, ref, isInView, isDark } = useProjectDetail();
  const shouldAnimate = isInView || !isLoading;

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  }, []);

  if (isLoading) return <LoadingState isDark={isDark} />;

  if (!project) return <ProjectNotFound isDark={isDark} />;

  return (
    <div className={`min-h-screen pb-10`}>
      <div className="container mx-auto px-6">
        <motion.div
          ref={ref}
          initial={{ opacity: 0, y: 50 }}
          animate={shouldAnimate ? { opacity: 1, y: 0 } : { opacity: 0, y: 50 }}
          transition={{ duration: 0.8 }}
          className="max-w-6xl mx-auto"
        >
          <ProjectHeader project={project} isInView={shouldAnimate} />
          <ProjectHeroImage
            project={project}
            isInView={shouldAnimate}
            isDark={isDark}
          />
          {project.fullDescription &&
            project.fullDescription !== project.description && (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={
                  shouldAnimate ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }
                }
                transition={{ duration: 0.6, delay: 0.3 }}
                className={`mb-12 rounded-2xl p-8 border ${
                  isDark
                    ? "bg-slate-900/60 border-red-500/20"
                    : "bg-white/70 border-blue-200 shadow-lg shadow-blue-500/5"
                }`}
              >
                <h2
                  className={`text-2xl font-bold mb-4 ${isDark ? "text-white" : "text-gray-900"}`}
                >
                  {isDark ? "Mission Overview" : "The Legend Unfolds"}
                </h2>
                <div
                  className={`border-l-4 pl-5 ${isDark ? "border-red-500" : "border-blue-500"}`}
                >
                  <p
                    className={`text-base leading-relaxed whitespace-pre-line ${
                      isDark ? "text-gray-300" : "text-gray-700"
                    }`}
                  >
                    {project.fullDescription}
                  </p>
                </div>
              </motion.div>
            )}
          <ProjectFeatures project={project} isInView={shouldAnimate} />
          <ProjectResults project={project} isInView={shouldAnimate} />
        </motion.div>
      </div>
    </div>
  );
}

export default ProjectDetailPage;
