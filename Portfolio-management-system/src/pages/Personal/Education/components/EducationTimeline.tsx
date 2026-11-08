import { EducationCard } from "./EducationCard";
import type { EducationTimelineProps } from "../types";
import PageLoadingSkeleton from "../../../../components/common/loading/PageLoadingSkeleton";

export function EducationTimeline({
  educationList,
  isLoading = false,
  onEdit,
  onDelete,
}: EducationTimelineProps) {
  if (isLoading) {
    return <PageLoadingSkeleton count={3} type="card" />;
  }

  if (educationList.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center py-16 px-4 rounded-3xl border border-dashed border-border/60 bg-card/40 backdrop-blur-md text-center">
        <p className="text-lg font-semibold tracking-tight text-foreground mb-1">
          No education records yet
        </p>
        <p className="text-sm text-muted-foreground">
          Start by adding your first academic degree or certification.
        </p>
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
