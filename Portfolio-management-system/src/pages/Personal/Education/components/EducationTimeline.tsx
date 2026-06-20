import { EducationCard } from "./EducationCard";
import type { EducationTimelineProps } from "../types";
import { useAppSelector } from "../../../../hooks/useRedux";
import utils from "../../../../utils";

const { cn } = utils.tailwindUtils;

export function EducationTimeline({
  educationList,
  onEdit,
  onDelete,
}: EducationTimelineProps) {
  const theme = useAppSelector((state) => state.theme.theme);
  const isDark = theme === "dark";

  if (educationList.length === 0) {
    return (
      <div
        className={cn(
          "flex flex-col items-center justify-center py-16 rounded-2xl border-2 border-dashed",
          isDark
            ? "border-slate-700 text-slate-500 bg-slate-800/10"
            : "border-slate-300 text-slate-400 bg-white shadow-lg shadow-blue-500/5",
        )}
      >
        <p className="text-lg font-medium mb-2">No education records yet</p>
        <p className="text-sm">Start by adding your first education history item</p>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {educationList.map((edu, index) => (
        <EducationCard
          key={edu.id}
          edu={edu}
          index={index}
          onEdit={onEdit}
          onDelete={onDelete}
        />
      ))}
    </div>
  );
}
