import { motion } from "motion/react";
import { useAppSelector } from "../../../../hooks/useRedux";
import type { RootState } from "../../../../store/store";
import type { ProjectHeaderProps } from "../types";
import { StatusBadge } from "./StatusBadge";
import { CategoryBadge } from "./CategoryBadge";
import { MetaInfo } from "./MetaInfo";
import { ActionButtons } from "./ActionButtons";
import { BackButton } from "./BackButton";

export function ProjectHeader({ project, isInView }: ProjectHeaderProps) {
  const { theme } = useAppSelector((state: RootState) => state.theme);
  const isDark = theme === "dark";

  return (
    <div className="mb-12">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
        transition={{ duration: 0.6 }}
        className="mb-6"
      >
        <div className="flex items-center justify-between gap-3">
          <BackButton isDark={isDark} />
          <div className="flex items-center justify-end gap-2 mr-8 flex-1">
            <StatusBadge status={project.status} isDark={isDark} />
            <CategoryBadge category={project.category} isDark={isDark} />
          </div>
        </div>
        <h1
          className={`text-4xl md:text-5xl font-bold mb-4 ${isDark ? "text-white" : "text-gray-900"}`}
        >
          {project.title}
        </h1>
        <p
          className={`text-xl mb-6 ${isDark ? "text-gray-300" : "text-gray-700"}`}
        >
          {project.description}
        </p>
        <MetaInfo date={project.date} team={project.team} isDark={isDark} />
      </motion.div>
      <ActionButtons
        link={project.link}
        github={project.github}
        isInView={isInView}
        isDark={isDark}
      />
    </div>
  );
}
