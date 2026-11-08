import { motion } from "motion/react";
import type { PortfolioHeaderProps } from "../types";

export function PortfolioHeader({
  projectCount,
  userName,
}: PortfolioHeaderProps) {
  const displayName = userName?.trim() ? userName.trim() : "Portfolio";

  return (
    <motion.div
      initial={{ opacity: 0, y: 16 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ type: "spring", damping: 26, stiffness: 280 }}
      className="mb-10 text-center"
    >
      <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-medium bg-primary/10 text-primary border border-primary/20 mb-3">
        <span>Curated Showcase</span>
        <span>•</span>
        <span>{projectCount} {projectCount === 1 ? "Project" : "Projects"}</span>
      </div>
      <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold tracking-tight text-foreground">
        {displayName}
      </h1>
      <p className="mt-2 text-base text-muted-foreground max-w-lg mx-auto">
        Explore featured engineering and design deliverables selected for this presentation.
      </p>
    </motion.div>
  );
}

