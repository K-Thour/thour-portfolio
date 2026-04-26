import { createSlice, type PayloadAction } from "@reduxjs/toolkit";

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

export interface SettingsState {
  ai: AISettings;
  resume: ResumeSettings;
  general: GeneralSettings;
}

const initialState: SettingsState = {
  ai: {
    dailyLimit: 50,
    currentUsage: 12,
    isEnabled: true,
  },
  resume: {
    isGenerationEnabled: true,
    maxResumes: 10,
  },
  general: {
    notificationsEnabled: true,
    autoSave: true,
    theme: "system",
  },
};

const settingsSlice = createSlice({
  name: "settings",
  initialState,
  reducers: {
    setAISettings(state, action: PayloadAction<AISettings>) {
      state.ai = action.payload;
    },
    setResumeSettings(state, action: PayloadAction<ResumeSettings>) {
      state.resume = action.payload;
    },
    setGeneralSettings(state, action: PayloadAction<GeneralSettings>) {
      state.general = action.payload;
    },
    updateAIUsage(state, action: PayloadAction<number>) {
      state.ai.currentUsage = Math.min(
        state.ai.currentUsage + action.payload,
        state.ai.dailyLimit,
      );
    },
    resetAIUsage(state) {
      state.ai.currentUsage = 0;
    },
    resetSettings() {
      return initialState;
    },
  },
});

export const {
  setAISettings,
  setResumeSettings,
  setGeneralSettings,
  updateAIUsage,
  resetAIUsage,
  resetSettings,
} = settingsSlice.actions;

export default settingsSlice.reducer;
