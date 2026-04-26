import type { Resume } from "../types";

export interface ResumeCardProps {
  resume: Resume;
  isDark: boolean;
  onDownload: (resume: Resume) => void;
  onDelete: (id: string) => void;
}

export interface ResumeHeaderProps {
  isDark: boolean;
  onAddResume: () => void;
}

export interface EmptyResumeStateProps {
  isDark: boolean;
  onAddResume: () => void;
}

export interface ResumeListProps {
  resumes: Resume[];
  isDark: boolean;
  onDownload: (resume: Resume) => void;
  onDelete: (id: string) => void;
}
