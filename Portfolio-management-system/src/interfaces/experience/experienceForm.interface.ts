export interface ExperienceFormData {
  jobTitle: string;
  company: string;
  location: string;
  startDate: string;
  endDate: string | null;
  isCurrent: boolean;
  description: string;
  technologies: string[];
  features: string[];
  linkedInUrl: string | null;
  companyUrl: string | null;
}

export interface ExperienceBasicInfoData {
  jobTitle: string;
  company: string;
  location: string;
  startDate: string;
  endDate: string | null;
  isCurrent: boolean;
}

export interface ExperienceDescriptionData {
  description: string;
}

export interface ExperienceTechData {
  technologies: string[];
  features: string[];
}

export interface ExperienceLinksData {
  linkedInUrl: string | null;
  companyUrl: string | null;
}

export interface ExperienceFormWizardProps {
  isOpen: boolean;
  onClose: () => void;
  onSubmit: (data: ExperienceFormData) => void;
  initialData?: Partial<ExperienceFormData>;
  isDark: boolean;
  isEditing?: boolean;
}
