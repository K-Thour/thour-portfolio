export interface Experience {
  id: string;
  jobTitle: string;
  company: string;
  location: string;
  startDate: string;
  endDate: string | null;
  isCurrent: boolean;
  employmentType?: string;
  achievements: string[];
  technologies?: string[];
  icon?: React.ReactNode;
}

export interface ExperienceCardProps {
  experience: Experience;
  isDark: boolean;
  isLast?: boolean;
  onEdit?: (id: string) => void;
  onDelete?: (id: string) => void;
}
