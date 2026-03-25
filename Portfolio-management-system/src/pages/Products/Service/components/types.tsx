export interface Service {
  id: number;
  title: string;
  subtitle: string;
  category: string;
  description: string;
  longDescription?: string;
  icon: string;
  iconType: "emoji" | "url" | "upload";
  iconUrl?: string;
  iconFile?: string;
  photoUrl: string;
  photoType: "url" | "upload";
  photoFile?: string;
  features: string[];
  benefits: string[];
  pricing: string;
  duration: string;
  deliverables: string[];
  active: boolean;
}

export interface ServiceFormProps {
  onSubmit: (data: Omit<Service, "id" | "active">) => void;
  onCancel: () => void;
  initialData?: Service;
}

export interface Step {
  id: number;
  title: string;
  description: string;
}

export interface FormStepperProps {
  steps: Step[];
  currentStep: number;
}

export interface ServiceFormData {
  title: string;
  subtitle: string;
  category: string;
  description: string;
  longDescription: string;
  photoType: "url" | "upload";
  photoUrl: string;
  photoFile: string | undefined;
  iconType: "url" | "upload" | "emoji";
  icon: string;
  iconUrl: string;
  iconFile: string | undefined;
  features: string[];
  benefits: string[];
  pricing: string;
  duration: string;
  deliverables: string[];
}

export interface MediaStepProps {
  formData: ServiceFormData;
  errors: Record<string, string>;
  photoType: "url" | "upload";
  iconType: "url" | "upload" | "emoji";
  emojiOptions: string[];
  onPhotoTypeChange: (type: "url" | "upload") => void;
  onIconTypeChange: (type: "url" | "upload" | "emoji") => void;
  onFormDataChange: (data: Partial<ServiceFormData>) => void;
  onPhotoFileChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onIconFileChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

export interface DetailsStepProps {
  formData: ServiceFormData;
  errors: Record<string, string>;
  onFormDataChange: (data: Partial<ServiceFormData>) => void;
  onAddArrayItem: (field: "deliverables") => void;
  onRemoveArrayItem: (field: "deliverables", index: number) => void;
}

export interface BasicInfoStepProps {
  formData: ServiceFormData;
  errors: Record<string, string>;
  categories: string[];
  onFormDataChange: (data: Partial<ServiceFormData>) => void;
}

export interface FeaturesStepProps {
  formData: ServiceFormData;
  errors: Record<string, string>;
  onFormDataChange: (data: Partial<ServiceFormData>) => void;
  onAddArrayItem: (field: "features" | "benefits") => void;
  onRemoveArrayItem: (field: "features" | "benefits", index: number) => void;
}

export interface FormNavigationProps {
  currentStep: number;
  onPrevious: () => void;
  onNext: () => void;
  onCancel: () => void;
}

export interface ServiceHeaderProps {
  onAdd: () => void;
}

export interface ServiceCardProps {
  service: Service;
  index: number;
  onEdit: (service: Service) => void;
  onDelete: (id: number) => void;
  onToggleActive: (id: number) => void;
}

export interface ServiceListProps {
  services: Service[];
  onEdit: (service: Service) => void;
  onDelete: (id: number) => void;
  onToggleActive: (id: number) => void;
}

export interface ServiceModalProps {
  isOpen: boolean;
  onClose: () => void;
  editingService: Service | null;
  onSubmit: (data: Omit<Service, "id" | "active">) => void;
}
