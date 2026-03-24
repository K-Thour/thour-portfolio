import { Plus } from "lucide-react";
import Button from "../../../../components/ui/button/Button";
import utils from "../../../../utils";

const { cn } = utils.tailwindUtils;

interface ExperienceHeaderProps {
  isDark: boolean;
  onAddExperience: () => void;
}

export const ExperienceHeader: React.FC<ExperienceHeaderProps> = ({
  isDark,
  onAddExperience,
}) => {
  return (
    <div className="flex items-start justify-between mb-8">
      <div>
        <h1
          className={cn(
            "text-3xl font-bold tracking-tight mb-2",
            isDark ? "text-white" : "text-slate-900",
          )}
        >
          Work Experience
        </h1>
        <p
          className={cn(
            "text-sm",
            isDark ? "text-slate-400" : "text-slate-500",
          )}
        >
          Manage your professional experience
        </p>
      </div>

      <Button
        onClick={onAddExperience}
        className={cn(
          isDark
            ? "bg-linear-to-br from-orange-500 to-red-500 text-white shadow-lg shadow-orange-500/30"
            : "bg-blue-500 text-white shadow-lg shadow-blue-500/30",
          "text-white border-0",
          "shadow-lg",
          "px-6 py-2.5 rounded-xl",
          "flex items-center gap-2",
        )}
      >
        <Plus className="w-5 h-5" />
        <span>Add Experience</span>
      </Button>
    </div>
  );
};

export default ExperienceHeader;
