import { motion } from "motion/react";
import type { ProjectData } from "../types";

interface ProjectHeroImageProps {
  project: ProjectData;
  isInView: boolean;
  isDark?: boolean;
}

export function ProjectHeroImage({
  project,
  isInView,
}: ProjectHeroImageProps) {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.98 }}
      animate={
        isInView ? { opacity: 1, scale: 1 } : { opacity: 0, scale: 0.98 }
      }
      transition={{ type: "spring", damping: 26, stiffness: 280, delay: 0.2 }}
      className="rounded-3xl overflow-hidden mb-12 border border-border/40 bg-card/75 backdrop-blur-xl shadow-xs"
    >
      <img
        src={project?.image}
        alt={project?.title}
        className="w-full h-80 sm:h-96 md:h-[450px] object-cover"
      />
    </motion.div>
  );
}

