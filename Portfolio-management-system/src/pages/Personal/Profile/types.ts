import type { LucideIcon } from "lucide-react";

export interface ProfileImage {
  type: "url" | "file";
  url: string;
  file: string | null;
}

export interface Language {
  name: string;
  proficiency: number;
}

export interface ProfileData {
  name: string;
  email: string;
  phoneNumber: string;
  image: ProfileImage;
  experience: number;
  completedProjects: number;
  solvedProblems: number;
  happyClients: number;
  InstagramURL: string;
  LinkedInURL: string;
  GitHubURL: string;
  hobbies: string[];
  languages: Language[];
}

export interface Stat {
  icon: LucideIcon;
  label: string;
  value: number;
  suffix: string;
}

export interface SocialLink {
  icon: LucideIcon;
  label: string;
  url: string;
  color: string;
}

export interface ConnectorLineProps {
  isCompleted: boolean;
  isDark: boolean;
}

export interface StepCircleProps {
  stepId: number;
  currentStep: number;
  isDark: boolean;
}

export interface StepLabelProps {
  title: string;
  description: string;
  isActive: boolean;
  isDark: boolean;
}

interface Step {
  id: number;
  title: string;
  description: string;
}

export interface FormStepperProps {
  steps: Step[];
  currentStep: number;
}

export interface HobbiesCardProps {
  hobbies: string[];
}

export interface LanguagesCardProps {
  languages: Language[];
}

export interface ProfileCardProps {
  profileData: ProfileData;
}

export interface ProfileHeaderProps {
  onEdit: () => void;
  onBack: () => void;
}

export interface ProfileModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSubmit: (data: ProfileData) => void;
  initialData: ProfileData;
}

export interface StatsGridProps {
  profileData: ProfileData;
}

export type SocialLinksProps = Pick<ProfileCardProps, "profileData">;
