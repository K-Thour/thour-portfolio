export interface Contact {
  id: number;
  label: string;
  email: string;
  phone: string;
  address: string;
  city: string;
  state: string;
  country: string;
  zipCode: string;
  website: string;
  linkedin: string;
  github: string;
  twitter: string;
  instagram: string;
  facebook: string;
  youtube: string;
  availability: string;
  timezone: string;
  isActive: boolean;
}

export interface ContactFormData {
  label: string;
  email: string;
  phone: string;
  address: string;
  city: string;
  state: string;
  country: string;
  zipCode: string;
  website: string;
  linkedin: string;
  github: string;
  twitter: string;
  instagram: string;
  facebook: string;
  youtube: string;
  availability: string;
  timezone: string;
}

export interface ContactsHeaderProps {
  isDark: boolean;
  onAdd: () => void;
}

export interface ActiveContactBannerProps {
  contact: Contact | undefined;
  isDark: boolean;
}

export interface ContactsGridProps {
  contacts: Contact[];
  isDark: boolean;
  onView: (contact: Contact) => void;
  onEdit: (contact: Contact) => void;
  onDelete: (id: number) => void;
  onSetActive: (id: number) => void;
}

export interface ContactCardProps {
  contact: Contact;
  index: number;
  isDark: boolean;
  onView: (contact: Contact) => void;
  onEdit: (contact: Contact) => void;
  onDelete: (id: number) => void;
  onSetActive: (id: number) => void;
}

export interface ContactDetailsModalProps {
  isOpen: boolean;
  onClose: () => void;
  contact: Contact | null;
}

export interface ContactFormProps {
  onSubmit: (data: ContactFormData) => void;
  onCancel: () => void;
  initialData?: Contact | null;
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
