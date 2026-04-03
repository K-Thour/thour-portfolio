import type { ProjectsGridProps } from "../types";
import { ProjectCard } from "./ProjectCard";

export function ProjectsGrid({ projects, isDark }: ProjectsGridProps) {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {projects.map((project, index) => (
        <ProjectCard
          key={project.id}
          project={project}
          index={index}
          isDark={isDark}
        />
      ))}
    </div>
  );
}
