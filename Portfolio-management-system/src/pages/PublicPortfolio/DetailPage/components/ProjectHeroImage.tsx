import { motion } from "motion/react";
import type { ProjectData } from "../types";

interface ProjectHeroImageProps {
  project: ProjectData;
  isInView: boolean;
  isDark: boolean;
}

export function ProjectHeroImage({
  project,
  isInView,
  isDark,
}: ProjectHeroImageProps) {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.95 }}
      animate={
        isInView ? { opacity: 1, scale: 1 } : { opacity: 0, scale: 0.95 }
      }
      transition={{ duration: 0.8, delay: 0.3 }}
      className={`rounded-2xl overflow-hidden mb-12 border ${
        isDark
          ? "border-red-500/20"
          : "border-blue-300/30 shadow-xl shadow-blue-500/10"
      }`}
    >
      <img
        src={project.image}
        alt={project.title}
        className="w-full h-96 object-cover"
      />
    </motion.div>
  );
}
