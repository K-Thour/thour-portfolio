export type ResumeDesignType = "image" | "pdf" | "latex" | null;

export interface Resume {
  id: string;
  name: string;
  description: string;
  jobLink: string;
  designType: ResumeDesignType;
  designFile?: string;
  designUrl?: string;
  latexCode?: string;
  status: "pending" | "generating" | "completed" | "failed";
  createdAt: string;
  updatedAt: string;
  generatedFileUrl?: string;
}

export interface ResumeFormData {
  name: string;
  description: string;
  jobLink: string;
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
