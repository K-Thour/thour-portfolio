import type { ProjectTagsProps } from "../../types";

export function ProjectTags({
  projectIds,
  allProjects,
}: ProjectTagsProps) {
  const projects = allProjects.filter((p) => projectIds.includes(p.id));
  return (
    <div className="flex flex-wrap gap-1.5">
      {projects.map((project) => (
        <span
          key={project.id}
          className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-accent/60 text-muted-foreground border border-border/40"
        >
          {project.title}
        </span>
      ))}
    </div>
  );
}

