export interface Portfolio {
  id: string;
  name: string;
  projectIds: string[];
  url: string;
  createdAt: string;
}

export interface Project {
  id: string;
  title: string;
  category: string;
  image?: string;
}

export interface FormData {
  name: string;
  projectIds: string[];
}

export interface PortfolioListProps {
  portfolios: Portfolio[];
  allProjects: { id: string; title: string; category: string }[];
  isDark: boolean;
  copiedId: string | null;
  onEdit: (portfolio: Portfolio) => void;
  onDelete: (id: string) => void;
  onCopy: (url: string, id: string) => void;
}

export interface ActionButtonsProps {
  url: string;
  isDark: boolean;
  isCopied: boolean;
  onCopy: () => void;
  onEdit: () => void;
  onDelete: () => void;
}

export interface EmptyStateProps {
  isDark: boolean;
}

export interface ListHeaderProps {
  isDark: boolean;
  count: number;
}

export interface ModalActionsProps {
  isDark: boolean;
  isEditing: boolean;
  onCancel: () => void;
}

export interface NameInputProps {
  isDark: boolean;
  value: string;
  onChange: (name: string) => void;
}

export interface PortfolioCardProps {
  portfolio: Portfolio;
  allProjects: { id: string; title: string; category: string }[];
  isDark: boolean;
  isCopied: boolean;
  onEdit: () => void;
  onDelete: () => void;
  onCopy: () => void;
}

export interface PortfolioHeaderProps {
  isDark: boolean;
  userName: string;
  onAdd: () => void;
}

export interface PortfolioModalProps {
  isOpen: boolean;
  isDark: boolean;
  editingPortfolio: Portfolio | null;
  formData: FormData;
  allProjects: Project[];
  isLoadingProjects?: boolean;
  onClose: () => void;
  onSubmit: (e: React.FormEvent) => void;
  onNameChange: (name: string) => void;
  onToggleProject: (projectId: string) => void;
}

export interface ProjectMultiSelectProps {
  isDark: boolean;
  projects: Project[];
  selectedIds: string[];
  onToggle: (id: string) => void;
  isLoading?: boolean;
}

export interface ProjectSelectorProps {
  isDark: boolean;
  projects: Project[];
  selectedIds: string[];
  onToggle: (id: string) => void;
}

export interface ProjectTagsProps {
  projectIds: string[];
  allProjects: { id: string; title: string }[];
  isDark: boolean;
}
