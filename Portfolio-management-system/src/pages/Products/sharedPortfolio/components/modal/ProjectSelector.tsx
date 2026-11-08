import { CheckCircle } from "lucide-react";
import type { ProjectSelectorProps } from "../../types";

export function ProjectSelector({
  projects,
  selectedIds,
  onToggle,
}: ProjectSelectorProps) {
  return (
    <div>
      <div className="flex items-center justify-between mb-3">
        <label className="block text-sm font-medium text-foreground">
          Select Projects <span className="text-destructive">*</span>
        </label>
        <span className="text-xs font-medium text-muted-foreground bg-accent/60 px-2 py-0.5 rounded-full border border-border/30">
          {selectedIds.length} selected
        </span>
      </div>
      <div className="grid grid-cols-1 gap-2 max-h-80 overflow-y-auto pr-1">
        {projects.map((project) => {
          const isSelected = selectedIds.includes(project.id);
          return (
            <label
              key={project.id}
              className={`flex items-center gap-3 p-3.5 rounded-xl border cursor-pointer transition-all active:scale-[0.99] ${
                isSelected
                  ? "border-primary/50 bg-primary/10 shadow-xs"
                  : "border-border/40 hover:border-border bg-card/60"
              }`}
            >
              <input
                type="checkbox"
                checked={isSelected}
                onChange={() => onToggle(project.id)}
                className="w-4 h-4 rounded border-border/60 text-primary focus:ring-primary/20 cursor-pointer"
              />
              <div className="flex-1 min-w-0">
                <div className="font-medium text-sm text-foreground truncate">
                  {project.title}
                </div>
                <div className="text-xs text-muted-foreground">
                  {project.category}
                </div>
              </div>
              {isSelected && (
                <CheckCircle className="w-4 h-4 text-primary shrink-0" />
              )}
            </label>
          );
        })}
      </div>
    </div>
  );
}

