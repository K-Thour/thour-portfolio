import { Plus } from "lucide-react";

interface TechnologyHeaderProps {
  onAdd: () => void;
}

export function TechnologyHeader({ onAdd }: TechnologyHeaderProps) {
  return (
    <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 mb-6">
      <div>
        <h1 className="text-2xl sm:text-3xl font-bold tracking-tight text-foreground mb-1">
          Technologies & Skills
        </h1>
        <p className="text-xs sm:text-sm text-muted-foreground">
          Manage your technical competencies, frameworks, and developer tools
        </p>
      </div>
      <button
        onClick={onAdd}
        type="button"
        className="flex items-center gap-2 px-5 py-2.5 rounded-xl font-medium text-sm transition-all bg-primary hover:bg-primary/90 text-primary-foreground active:scale-[0.97] shadow-sm cursor-pointer"
      >
        <Plus className="w-4 h-4" />
        Add Technology
      </button>
    </div>
  );
}
