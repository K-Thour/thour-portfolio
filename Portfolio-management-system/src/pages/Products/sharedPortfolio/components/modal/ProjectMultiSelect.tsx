import { X } from "lucide-react";
import type { ProjectMultiSelectProps } from "../../types";
import Multiselect from "../../../../../components/ui/multiSelect/MultiSelect";

export function ProjectMultiSelect({
  projects,
  selectedIds,
  onToggle,
}: ProjectMultiSelectProps) {
  const selectedProjects = projects.filter((p) => selectedIds.includes(p.id));
  const unselectedProjects = projects.filter(
    (p) => !selectedIds.includes(p.id),
  );

  return (
    <div className="space-y-3">
      <div className="flex items-center justify-between">
        <label className="block text-sm font-medium text-foreground">
          Select Projects <span className="text-destructive">*</span>
        </label>
        <span className="text-xs font-medium text-muted-foreground bg-accent/60 px-2 py-0.5 rounded-full border border-border/30">
          {selectedIds.length} selected
        </span>
      </div>

      {selectedProjects.length > 0 && (
        <div className="flex flex-wrap gap-1.5">
          {selectedProjects.map((project) => (
            <span
              key={project.id}
              className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-medium bg-primary/10 text-primary border border-primary/20"
            >
              <span className="truncate max-w-[180px]">{project.title}</span>
              <button
                type="button"
                onClick={() => onToggle(project.id)}
                className="p-0.5 rounded-full hover:bg-primary/20 transition-colors cursor-pointer"
                aria-label={`Remove ${project.title}`}
              >
                <X className="w-3 h-3" />
              </button>
            </span>
          ))}
        </div>
      )}

      <div className="bg-card text-foreground rounded-xl">
        <Multiselect
          Heading={`Choose Projects (${unselectedProjects.length} available)`}
          className="[&_button]:bg-accent/40! [&_button]:text-foreground! [&_button]:border-border/40! [&_button]:rounded-xl! z-60 [&>div]:bg-card [&>div]:border-border/40 [&>div]:shadow-lg [&>div]:p-0"
        >
          <div className="bg-card rounded-xl overflow-hidden border border-border/40">
            {unselectedProjects.length > 0 && (
              <div className="max-h-48 overflow-y-auto divide-y divide-border/20">
                {unselectedProjects.map((project) => (
                  <button
                    key={project.id}
                    type="button"
                    onClick={() => {
                      onToggle(project.id);
                    }}
                    className="w-full text-left px-4 py-2.5 text-sm transition-colors text-foreground hover:bg-accent/60 cursor-pointer"
                  >
                    <div className="font-medium text-foreground">{project.title}</div>
                    <div className="text-xs text-muted-foreground mt-0.5">
                      {project.category}
                    </div>
                  </button>
                ))}
              </div>
            )}
            {unselectedProjects.length === 0 && (
              <div className="px-4 py-3 text-sm text-muted-foreground text-center">
                All projects selected
              </div>
            )}
          </div>
        </Multiselect>
      </div>
    </div>
  );
}

