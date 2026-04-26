import { ResumeCard } from "./ResumeCard";
import type { ResumeListProps } from "../types/props";

export function ResumeList({
  resumes,
  isDark,
  onDownload,
  onDelete,
}: ResumeListProps) {
  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
      {resumes.map((resume) => (
        <ResumeCard
          key={resume.id}
          resume={resume}
          isDark={isDark}
          onDownload={onDownload}
          onDelete={() => onDelete(resume.id)}
        />
      ))}
    </div>
  );
}
