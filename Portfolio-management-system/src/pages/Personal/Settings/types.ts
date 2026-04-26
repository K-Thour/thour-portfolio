export interface AISettings {
  dailyLimit: number;
  currentUsage: number;
  isEnabled: boolean;
}

export interface ResumeSettings {
  isGenerationEnabled: boolean;
  maxResumes: number;
}

export interface GeneralSettings {
  notificationsEnabled: boolean;
  autoSave: boolean;
  theme: "light" | "dark" | "system";
}

export interface SettingsData {
  ai: AISettings;
  resume: ResumeSettings;
  general: GeneralSettings;
}

export interface SettingsHeaderProps {
  onSave: () => void;
  onReset: () => void;
  onBack: () => void;
  hasChanges: boolean;
  autoSave: boolean;
}

export interface AISettingsCardProps {
  settings: AISettings;
  onUpdate: (settings: AISettings) => void;
}

export interface ResumeSettingsCardProps {
  settings: ResumeSettings;
  onUpdate: (settings: ResumeSettings) => void;
}

export interface GeneralSettingsCardProps {
  settings: GeneralSettings;
  onUpdate: (settings: GeneralSettings) => void;
}
