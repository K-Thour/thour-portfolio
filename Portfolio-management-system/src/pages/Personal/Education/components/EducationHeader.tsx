import { Plus } from "lucide-react";
import type { EducationHeaderProps } from "../types";

export function EducationHeader({ onAdd }: EducationHeaderProps) {
  return (
    <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 mb-8">
      <div>
        <h1 className="text-2xl sm:text-3xl font-bold tracking-tight text-foreground mb-1">
          Education
        </h1>
        <p className="text-xs sm:text-sm text-muted-foreground">
          Manage your academic degrees, institutions, and credentials
        </p>
      </div>
      <button
        onClick={onAdd}
        type="button"
        className="flex items-center gap-2 px-5 py-2.5 rounded-xl font-medium text-sm transition-all bg-primary hover:bg-primary/90 text-primary-foreground active:scale-[0.97] shadow-sm cursor-pointer"
      >
        <Plus className="w-4 h-4" />
        Add Education
      </button>
    </div>
  );
}
