export interface Project {
  id: number;
  title: string;
  subtitle: string;
  category: string;
  description: string;
  longDescription: string;
  image: string;
  technologies: string[];
  features: string[];
  github: string;
  liveUrl: string;
  status: "In Progress" | "Completed" | "On Hold";
  views: number;
}

export interface ProjectFormData {
  title: string;
  subtitle: string;
  category: string;
  description: string;
  longDescription: string;
  image: string;
  technologies: string[];
  features: string[];
  github: string;
  liveUrl: string;
  status: "In Progress" | "Completed" | "On Hold";
}

export interface ProjectFormProps {
  onSubmit: (data: ProjectFormData) => void;
  onCancel: () => void;
  initialData?: Project;
}

export interface ProjectCardProps {
  project: Project;
  index: number;
  onEdit: (project: Project) => void;
  onDelete: (id: number) => void;
  onView: (project: Project) => void;
}

export interface ProjectHeaderProps {
  onAdd: () => void;
}

export interface ProjectListProps {
  projects: Project[];
  onEdit: (project: Project) => void;
  onDelete: (id: number) => void;
  onView: (project: Project) => void;
}

export interface ProjectModalProps {
  isOpen: boolean;
  onClose: () => void;
  editingProject: Project | null;
  onSubmit: (data: ProjectFormData) => void;
}

export interface BasicInfoStepProps {
  formData: ProjectFormData;
  errors: Record<string, string>;
  onFormDataChange: (data: Partial<ProjectFormData>) => void;
}

export interface DescriptionStepProps {
  formData: ProjectFormData;
  errors: Record<string, string>;
  onFormDataChange: (data: Partial<ProjectFormData>) => void;
}

export interface LinksStepProps {
  formData: ProjectFormData;
  errors: Record<string, string>;
  onFormDataChange: (data: Partial<ProjectFormData>) => void;
}

export interface TechFeaturesStepProps {
  formData: ProjectFormData;
  errors: Record<string, string>;
  onAddArrayItem: (field: "technologies" | "features", value: string) => void;
  onRemoveArrayItem: (
    field: "technologies" | "features",
    index: number,
  ) => void;
}

export interface FormNavigationProps {
  currentStep: number;
  onPrevious: () => void;
  onNext: () => void;
  onCancel: () => void;
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
