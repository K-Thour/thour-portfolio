import { useCallback, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import type { RootState } from "../../../../store/store";
import type { SettingsData } from "../types";
import {
  setAISettings,
  setResumeSettings,
  setGeneralSettings,
  resetSettings,
  updateAIUsage,
} from "../../../../store/slices/settings.slice";
import { setTheme } from "../../../../store/slices/theme.slice";
import { setResumePageEnable } from "../../../../store/slices/pageEnable.slice";
import {
  setResumeLimit,
  setAiSettingsEnabled,
} from "../../../../store/slices/resume.slice";

export function useSettings() {
  const dispatch = useDispatch();
  const settings = useSelector((state: RootState) => state.settings);
  const hasChanges = false; // Always false since changes are persisted immediately

  // Sync related Redux states when settings change
  useEffect(() => {
    // Sync theme
    if (settings.general.theme !== "system") {
      dispatch(setTheme(settings.general.theme));
    }
    // Sync resume page visibility
    dispatch(setResumePageEnable(settings.resume.isGenerationEnabled));
    // Sync resume settings to resume slice
    dispatch(setResumeLimit(settings.resume.maxResumes));
    // Sync AI enabled state to resume slice (linked with AI settings)
    dispatch(setAiSettingsEnabled(settings.ai.isEnabled));
  }, [dispatch, settings]);

  const updateAI = useCallback(
    (ai: SettingsData["ai"]) => {
      dispatch(setAISettings(ai));
    },
    [dispatch],
  );

  const updateResume = useCallback(
    (resume: SettingsData["resume"]) => {
      dispatch(setResumeSettings(resume));
    },
    [dispatch],
  );

  const updateGeneral = useCallback(
    (general: SettingsData["general"]) => {
      dispatch(setGeneralSettings(general));
    },
    [dispatch],
  );

  const save = useCallback(() => {
    // No-op: settings are already persisted via Redux
    console.log("Settings already persisted:", settings);
  }, [settings]);

  const reset = useCallback(() => {
    dispatch(resetSettings());
  }, [dispatch]);

  const getAILimitStatus = useCallback(() => {
    const { dailyLimit, currentUsage } = settings.ai;
    const remaining = Math.max(0, dailyLimit - currentUsage);
    const percentage = Math.min(100, (currentUsage / dailyLimit) * 100);
    return { remaining, percentage, isNearLimit: percentage > 80 };
  }, [settings.ai]);

  // AI feature functions
  const incrementAIUsage = useCallback(
    (amount: number = 1) => {
      dispatch(updateAIUsage(amount));
    },
    [dispatch],
  );

  const checkAIAvailable = useCallback(() => {
    return (
      settings.ai.isEnabled && settings.ai.currentUsage < settings.ai.dailyLimit
    );
  }, [settings.ai]);

  return {
    settings,
    hasChanges,
    handlers: {
      handleUpdateAI: updateAI,
      handleUpdateResume: updateResume,
      handleUpdateGeneral: updateGeneral,
      handleSave: save,
      handleReset: reset,
    },
    getAILimitStatus,
    incrementAIUsage,
    checkAIAvailable,
  };
}
