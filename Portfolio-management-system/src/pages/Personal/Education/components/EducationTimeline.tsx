import { EducationCard } from "./EducationCard";
import type { EducationTimelineProps } from "../types";

export function EducationTimeline({
  educationList,
  onEdit,
  onDelete,
}: EducationTimelineProps) {
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
