import { createSlice, type PayloadAction } from "@reduxjs/toolkit";

export type pageEnable = boolean;

interface PageEnableState {
  resumeLimit: number;
  AiSettingsEnabled: boolean;
}

const initialState: PageEnableState = {
  resumeLimit: 5,
  AiSettingsEnabled: true,
};

const resumeSlice = createSlice({
  name: "resume",
  initialState,
  reducers: {
    setResumeLimit(state, action: PayloadAction<number>) {
      state.resumeLimit = action.payload;
    },
    setAiSettingsEnabled(state, action: PayloadAction<boolean>) {
      state.AiSettingsEnabled = action.payload;
    },
  },
});

export const { setResumeLimit, setAiSettingsEnabled } = resumeSlice.actions;
export default resumeSlice.reducer;
