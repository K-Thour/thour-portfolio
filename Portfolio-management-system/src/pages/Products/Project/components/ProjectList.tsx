import { ProjectCard } from "./ProjectCard";
import type { ProjectListProps } from "./types";

export function ProjectList({
  projects,
  onEdit,
  onDelete,
  onView,
}: ProjectListProps) {
  return (
    <div className="space-y-4">
      {projects.map((project, index) => (
        <ProjectCard
          key={project.id}
          project={project}
          index={index}
          onEdit={onEdit}
          onDelete={onDelete}
          onView={onView}
        />
      ))}
    </div>
  );
}
