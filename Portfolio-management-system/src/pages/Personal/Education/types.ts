export interface EducationFormData {
  degree: string;
  institution: string;
  location: string;
  startDate: string;
  endDate: string;
  current: boolean;
  grade: string;
  description: string;
  achievements: string[];
}

export type EducationFormUpdateFn = <K extends keyof EducationFormData>(
  field: K,
  value: EducationFormData[K],
) => void;

export interface EducationFormProps {
  onSubmit: (data: EducationFormData) => void;
  onCancel: () => void;
  initialData?: Education | null;
}

export interface Education {
  id: number;
  degree: string;
  institution: string;
  period: string;
  description: string;
  grade: string;
}

export interface EducationCardProps {
  edu: Education;
  index: number;
  onEdit: (edu: Education) => void;
  onDelete: (id: number) => void;
}

export interface EducationModalsProps {
  isModalOpen: boolean;
  isDeleteModalOpen: boolean;
  editingEducation: Education | null;
  onCloseModal: () => void;
  onCloseDeleteModal: () => void;
  onSubmit: (data: EducationFormData) => void;
  onConfirmDelete: () => void;
}

export interface EducationTimelineProps {
  educationList: Education[];
  onEdit: (edu: Education) => void;
  onDelete: (id: number) => void;
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

export interface EducationHeaderProps {
  onAdd: () => void;
}
