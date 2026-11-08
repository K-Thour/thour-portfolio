import React from "react";
import { Plus, Briefcase } from "lucide-react";
import Button from "../../../../components/ui/button/Button";

interface EmptyExperienceStateProps {
  isDark: boolean;
  onAddExperience: () => void;
}

export const EmptyExperienceState: React.FC<EmptyExperienceStateProps> = ({
  onAddExperience,
}) => {
  return (
    <div className="flex flex-col items-center justify-center py-16 px-4 rounded-3xl border border-dashed border-border/60 bg-card/40 backdrop-blur-md text-center">
      <div className="w-14 h-14 rounded-2xl flex items-center justify-center mb-4 bg-primary/10 text-primary border border-primary/20 shadow-xs">
        <Briefcase className="w-6 h-6" />
      </div>
      <h3 className="text-lg font-semibold tracking-tight text-foreground mb-1">
        No work experience yet
      </h3>
      <p className="text-sm text-muted-foreground mb-6 max-w-sm">
        Start building your career trajectory by adding your first professional role and achievements.
      </p>
      <Button
        onClick={onAddExperience}
        className="px-6 py-2.5 h-11 rounded-xl font-medium text-sm transition-all bg-primary hover:bg-primary/90 text-primary-foreground active:scale-[0.97] shadow-sm flex items-center gap-2 cursor-pointer"
      >
        <Plus className="w-4 h-4" />
        Add Experience
      </Button>
    </div>
  );
};

export default EmptyExperienceState;
