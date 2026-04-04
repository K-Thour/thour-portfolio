import type { ProjectTagsProps } from "../../types";

export function ProjectTags({
  projectIds,
  allProjects,
  isDark,
}: ProjectTagsProps) {
  const projects = allProjects.filter((p) => projectIds.includes(p.id));
  return (
    <div className="flex flex-wrap gap-2">
      {projects.map((project) => (
        <span
          key={project.id}
          className={`px-3 py-1 rounded-full text-xs font-medium ${
            isDark
              ? "bg-red-500/20 text-red-300 border border-red-500/30"
              : "bg-blue-100 text-blue-700 border border-blue-200"
          }`}
        >
          {project.title}
        </span>
      ))}
    </div>
  );
}
