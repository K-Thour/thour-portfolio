import React from "react";
import { Plus } from "lucide-react";
import Button from "../../../components/ui/button/Button";
import utils from "../../../utils";

const { cn } = utils.tailwindUtils;

interface EmptyExperienceStateProps {
  isDark: boolean;
  onAddExperience: () => void;
}

export const EmptyExperienceState: React.FC<EmptyExperienceStateProps> = ({
  isDark,
  onAddExperience,
}) => {
  return (
    <div
      className={cn(
        "flex flex-col items-center justify-center py-16 rounded-2xl border-2 border-dashed",
        isDark
          ? "border-slate-700 text-slate-500"
          : "border-slate-300 text-slate-400",
      )}
    >
      <p className="text-lg font-medium mb-2">No experience yet</p>
      <p className="text-sm mb-6">Start by adding your first work experience</p>
      <Button
        onClick={onAddExperience}
        className={cn(
          "bg-linear-to-r from-orange-500 to-red-500",
          "hover:from-orange-600 hover:to-red-600",
          "text-white border-0",
          "shadow-lg shadow-orange-500/25",
        )}
      >
        <Plus className="w-4 h-4 mr-2" />
        Add Experience
      </Button>
    </div>
  );
};

export default EmptyExperienceState;
