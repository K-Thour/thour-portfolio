import { createSlice, type PayloadAction } from "@reduxjs/toolkit";

export type pageEnable = boolean;

interface PageEnableState {
  resumePageEnable: pageEnable;
}

const initialState: PageEnableState = {
  resumePageEnable: true,
};

const pageEnableSlice = createSlice({
  name: "pageEnable",
  initialState,
  reducers: {
    setResumePageEnable(state, action: PayloadAction<pageEnable>) {
      state.resumePageEnable = action.payload;
    },
  },
});

export const { setResumePageEnable } = pageEnableSlice.actions;
export default pageEnableSlice.reducer;
