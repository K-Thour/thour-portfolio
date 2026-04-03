import { motion } from "motion/react";
import { ProjectHeader } from "./components/ProjectHeader";
import { ProjectFeatures } from "./components/ProjectFeatures";
import { ProjectResults } from "./components/ProjectResults";
import { ProjectHeroImage } from "./components/ProjectHeroImage";
import { ProjectNotFound } from "./components/ProjectNotFound";
import { useProjectDetail } from "./hooks/useProjectDetail";
import { useEffect } from "react";

function ProjectDetailPage() {
  const { project, ref, isInView, isDark } = useProjectDetail();
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  }, []);

  if (!project) return <ProjectNotFound isDark={isDark} />;

  return (
    <div className={`min-h-screen pb-10`}>
      <div className="container mx-auto px-6">
        <motion.div
          ref={ref}
          initial={{ opacity: 0, y: 50 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 50 }}
          transition={{ duration: 0.8 }}
          className="max-w-6xl mx-auto"
        >
          <ProjectHeader project={project} isInView={isInView} />
          <ProjectHeroImage
            project={project}
            isInView={isInView}
            isDark={isDark}
          />
          <ProjectFeatures project={project} isInView={isInView} />
          <ProjectResults project={project} isInView={isInView} />
        </motion.div>
      </div>
    </div>
  );
}

export default ProjectDetailPage;
