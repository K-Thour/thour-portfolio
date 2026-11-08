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
    <div className="mb-10">
      <motion.div
        initial={{ opacity: 0, y: 16 }}
        animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 16 }}
        transition={{ type: "spring", damping: 26, stiffness: 280 }}
        className="mb-6"
      >
        <div className="flex flex-wrap items-center justify-between gap-3 mb-4">
          <BackButton isDark={isDark} />
          <div className="flex items-center gap-2">
            {project?.status && (
              <StatusBadge status={project.status} isDark={isDark} />
            )}
            {project?.category && (
              <CategoryBadge
                category={project.category}
                categoryIconUrl={project.categoryIconUrl}
                isDark={isDark}
              />
            )}
          </div>
        </div>
        <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold tracking-tight text-foreground mb-4">
          {project.title}
        </h1>
        {project?.description && (
          <p className="text-base sm:text-lg text-muted-foreground mb-6 leading-relaxed max-w-3xl">
            {project.description}
          </p>
        )}
        <MetaInfo date={project?.date} team={project?.team} isDark={isDark} />
      </motion.div>
      <ActionButtons
        link={project?.link}
        github={project?.github}
        isInView={isInView}
        isDark={isDark}
      />
    </div>
  );
}

