export type ResumeDesignType =
  | "modern"
  | "ats"
  | "latex"
  | "pdf"
  | "image"
  | null;

export interface Resume {
  id: string;
  _id?: string;
  name: string;
  description: string;
  jobLink: string;
  targetRole?: string;
  selectedProjectIds?: string[];
  selectedExperienceIds?: string[];
  designType: ResumeDesignType;
  designFile?: string;
  designUrl?: string;
  latexCode?: string;
  isActive?: boolean;
  status: "pending" | "generating" | "completed" | "failed";
  createdAt: string;
  updatedAt: string;
  generatedFileUrl?: string;
  projectCount?: number;
  serviceCount?: number;
  technologyCount?: number;
}

export interface ResumeFormData {
  name: string;
  description: string;
  jobLink: string;
  targetRole?: string;
  selectedProjectIds?: string[];
  selectedExperienceIds?: string[];
  designType: ResumeDesignType;
  designFile?: File;
  designUrl?: string;
  latexCode?: string;
}

export interface ResumeFormProps {
  onSubmit: (data: ResumeFormData) => void;
  onCancel: () => void;
  initialData?: ResumeFormData | null;
}
