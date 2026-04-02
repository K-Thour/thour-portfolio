export interface ProfileFormData {
  name: string;
  email: string;
  phoneNumber: string;
  image: {
    type: "url" | "file";
    url: string;
    file: string | null;
  };
  experience: number;
  completedProjects: number;
  solvedProblems: number;
  happyClients: number;
  InstagramURL: string;
  LinkedInURL: string;
  GitHubURL: string;
  hobbies: string[];
  languages: Array<{
    name: string;
    proficiency: number;
  }>;
}

export interface ProfileFormErrors {
  name?: string;
  email?: string;
  phoneNumber?: string;
  image?: string;
  experience?: string;
  completedProjects?: string;
  solvedProblems?: string;
  happyClients?: string;
}

export interface ProfileFormProps {
  onSubmit: (data: ProfileFormData) => void;
  onCancel: () => void;
  initialData?: Partial<ProfileFormData>;
}

export interface FormStep {
  id: number;
  title: string;
  description: string;
}

export const FORM_STEPS: FormStep[] = [
  { id: 1, title: "Basic Info", description: "Personal details" },
  { id: 2, title: "Photo", description: "Profile image" },
  { id: 3, title: "Statistics", description: "Career stats" },
  { id: 4, title: "Additional", description: "Social & more" },
];

interface Language {
  name: string;
  proficiency: number;
}

export interface AdditionalInfoStepProps {
  formData: {
    InstagramURL: string;
    LinkedInURL: string;
    GitHubURL: string;
    hobbies: string[];
    languages: Language[];
  };
  isDark: boolean;
  onSocialChange: (field: string, value: string) => void;
  onAddHobby: (value: string) => void;
  onRemoveHobby: (index: number) => void;
  onAddLanguage: (name: string, proficiency: number) => void;
  onRemoveLanguage: (index: number) => void;
}

export interface BasicInfoStepProps {
  formData: {
    name: string;
    email: string;
    phoneNumber: string;
  };
  errors: {
    name?: string;
    email?: string;
    phoneNumber?: string;
  };
  isDark: boolean;
  onChange: (field: string, value: string) => void;
}

export interface PhotoStepProps {
  formData: {
    image: {
      url: string;
      file: string | null;
    };
  };
  imageType: "url" | "file";
  error?: string;
  isDark: boolean;
  onImageTypeChange: (type: "url" | "file") => void;
  onUrlChange: (url: string) => void;
  onFileChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

export interface StatisticsStepProps {
  formData: {
    experience: number;
    completedProjects: number;
    solvedProblems: number;
    happyClients: number;
  };
  errors: {
    experience?: string;
    completedProjects?: string;
    solvedProblems?: string;
    happyClients?: string;
  };
  isDark: boolean;
  onChange: (field: string, value: number) => void;
}

export type FormStepsProps = {
  currentStep: number;
  formData: ProfileFormData;
  imageType: "url" | "file";
  errors: ProfileFormErrors;
  isDark: boolean;
  setField: <K extends keyof ProfileFormData>(
    field: K,
    value: ProfileFormData[K],
  ) => void;
  setImageField: (field: "url" | "file", value: string | null) => void;
  setImageType: (type: "url" | "file") => void;
  clearError: (field: keyof ProfileFormErrors) => void;
  handleImageFileChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  addHobby: (value: string) => void;
  removeHobby: (index: number) => void;
  addLanguage: (name: string, proficiency: number) => void;
  removeLanguage: (index: number) => void;
};

export type LanguagesInputProps = Pick<
  AdditionalInfoStepProps,
  "formData" | "isDark" | "onAddLanguage" | "onRemoveLanguage"
>;

export type SocialInputsProps = Pick<
  AdditionalInfoStepProps,
  "formData" | "isDark" | "onSocialChange"
>;
