import React from "react";
import { Plus } from "lucide-react";
import Button from "../../../../components/ui/button/Button";

interface ExperienceHeaderProps {
  isDark: boolean;
  onAddExperience: () => void;
}

export const ExperienceHeader: React.FC<ExperienceHeaderProps> = ({
  onAddExperience,
}) => {
  return (
    <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 mb-8">
      <div>
        <h1 className="text-2xl sm:text-3xl font-bold tracking-tight text-foreground mb-1">
          Work Experience
        </h1>
        <p className="text-xs sm:text-sm text-muted-foreground">
          Manage your career milestones, roles, and achievements
        </p>
      </div>

      <Button
        onClick={onAddExperience}
        className="px-5 py-2.5 rounded-xl font-medium text-sm transition-all bg-primary hover:bg-primary/90 text-primary-foreground active:scale-[0.97] shadow-sm flex items-center gap-2 cursor-pointer"
      >
        <Plus className="w-4 h-4" />
        <span>Add Experience</span>
      </Button>
    </div>
  );
};

export default ExperienceHeader;
