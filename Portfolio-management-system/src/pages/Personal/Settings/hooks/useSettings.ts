import { useCallback, useEffect, useState } from "react";
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
  const [initialSettings, setInitialSettings] = useState<SettingsData>(settings);
  const [isSaving, setIsSaving] = useState(false);

  const hasChanges =
    JSON.stringify(settings) !== JSON.stringify(initialSettings);

  // Sync related Redux states when settings change
  useEffect(() => {
    // Sync theme
    if (settings.general.theme === "system") {
      const matchMedia = window.matchMedia("(prefers-color-scheme: dark)");
      dispatch(setTheme(matchMedia.matches ? "dark" : "light"));
      const listener = (e: MediaQueryListEvent) => {
        dispatch(setTheme(e.matches ? "dark" : "light"));
      };
      matchMedia.addEventListener("change", listener);
      return () => matchMedia.removeEventListener("change", listener);
    } else {
      dispatch(setTheme(settings.general.theme));
    }
  }, [dispatch, settings.general.theme]);

  useEffect(() => {
    // Sync resume page visibility
    dispatch(setResumePageEnable(settings.resume.isGenerationEnabled));
    // Sync resume settings to resume slice
    dispatch(setResumeLimit(settings.resume.maxResumes));
    // Sync AI enabled state to resume slice (linked with AI settings)
    dispatch(setAiSettingsEnabled(settings.ai.isEnabled));
  }, [dispatch, settings.resume, settings.ai]);

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

  const save = useCallback(async () => {
    setIsSaving(true);
    // Persist baseline and provide brief tactile feedback
    await new Promise((resolve) => setTimeout(resolve, 350));
    setInitialSettings(settings);
    setIsSaving(false);
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
    isSaving,
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
