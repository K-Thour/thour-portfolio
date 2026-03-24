import { useState, useCallback, useRef, useEffect } from "react";
import {
  STORAGE_KEY,
  STEP_STORAGE_KEY,
} from "../../../../constraints/experience/expeirinceForm.constraints";

interface StepConfig {
  id: number;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  schema: any | null;
  fields: string[];
}

interface UseWizardProps<TForm> {
  steps: StepConfig[];
  defaultValues: TForm;
  initialData?: Partial<TForm>;
  isEditing: boolean;
  isOpen: boolean;
}

interface UseWizardReturn<TForm> {
  currentStep: number;
  visitedSteps: number[];
  setCurrentStep: (step: number | ((prev: number) => number)) => void;
  setVisitedSteps: (steps: number[] | ((prev: number[]) => number[])) => void;
  validateStep: (
    stepId: number,
    values: TForm,
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    form: any,
  ) => Promise<boolean>;
  getInitialValues: () => TForm;
  handleClose: (onClose: () => void) => void;
  resetWizard: () => void;
}

/** Read persisted step state from localStorage */
function getSavedStepState(): {
  currentStep: number;
  visitedSteps: number[];
} | null {
  try {
    const raw = localStorage.getItem(STEP_STORAGE_KEY);
    if (!raw) return null;
    return JSON.parse(raw);
  } catch {
    return null;
  }
}

/** Save step state to localStorage */
function saveStepState(currentStep: number, visitedSteps: number[]) {
  localStorage.setItem(
    STEP_STORAGE_KEY,
    JSON.stringify({ currentStep, visitedSteps }),
  );
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const useWizard = <TForm extends Record<string, any>>({
  steps,
  defaultValues,
  initialData,
  isEditing,
  isOpen,
}: UseWizardProps<TForm>): UseWizardReturn<TForm> => {
  // In add-mode, restore from localStorage if a draft exists
  const savedStep = !isEditing ? getSavedStepState() : null;

  const [currentStep, setCurrentStepRaw] = useState(
    savedStep?.currentStep ?? 1,
  );
  const [visitedSteps, setVisitedStepsRaw] = useState<number[]>(
    savedStep?.visitedSteps ?? [1],
  );
  const isFirstRender = useRef(true);

  // Wrap setCurrentStep to also persist step state
  const setCurrentStep = useCallback(
    (step: number | ((prev: number) => number)) => {
      setCurrentStepRaw((prev) => {
        const next = typeof step === "function" ? step(prev) : step;
        if (!isEditing) {
          setVisitedStepsRaw((vs) => {
            saveStepState(next, vs);
            return vs;
          });
        }
        return next;
      });
    },
    [isEditing],
  );

  // Wrap setVisitedSteps to also persist step state
  const setVisitedSteps = useCallback(
    (updater: number[] | ((prev: number[]) => number[])) => {
      setVisitedStepsRaw((prev) => {
        const next = typeof updater === "function" ? updater(prev) : updater;
        if (!isEditing) {
          setCurrentStepRaw((cs) => {
            saveStepState(cs, next);
            return cs;
          });
        }
        return next;
      });
    },
    [isEditing],
  );

  // 🧠 Restore form values from localStorage in add-mode
  const getInitialValues = useCallback((): TForm => {
    if (isEditing && initialData) {
      return { ...defaultValues, ...initialData };
    }

    if (!isEditing) {
      const saved = localStorage.getItem(STORAGE_KEY);
      if (saved) {
        try {
          return { ...defaultValues, ...JSON.parse(saved) };
        } catch {
          return defaultValues;
        }
      }
    }

    return { ...defaultValues, ...initialData } as TForm;
  }, [isEditing, initialData, defaultValues]);

  // 🔥 VALIDATION — uses TanStack Form's own validateField so errors render natively
  const validateStep = useCallback(
    async (
      stepId: number,
      _values: TForm,
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      form: any,
    ): Promise<boolean> => {
      const step = steps.find((s) => s.id === stepId);
      if (!step || step.fields.length === 0) return true;

      // 1️⃣ Touch all fields first — TanStack Form skips validateField when isTouched is false
      step.fields.forEach((field: string) => {
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        form.setFieldMeta(field, (meta: any) => ({ ...meta, isTouched: true }));
      });

      // 2️⃣ Trigger each field's own onChange validators
      const results = await Promise.all(
        step.fields.map((field: string) => form.validateField(field, "change")),
      );

      const hasErrors = results.some((r: unknown[]) => r && r.length > 0);
      return !hasErrors;
    },
    [steps],
  );

  const resetWizard = useCallback(() => {
    setCurrentStepRaw(1);
    setVisitedStepsRaw([1]);
  }, []);

  // ❌ Clear ALL draft data when user explicitly dismisses with the X button
  const handleClose = useCallback(
    (onClose: () => void) => {
      if (!isEditing) {
        localStorage.removeItem(STORAGE_KEY);
        localStorage.removeItem(STEP_STORAGE_KEY);
      }
      resetWizard();
      onClose();
    },
    [isEditing, resetWizard],
  );

  // 🔁 Reset only when there's no saved draft (fresh open), not when restoring
  useEffect(() => {
    if (isFirstRender.current) {
      isFirstRender.current = false;
      return;
    }

    if (isOpen) {
      if (isEditing) {
        // Editing always starts at step 1
        setTimeout(resetWizard, 0);
      } else {
        const hasDraft = !!localStorage.getItem(STORAGE_KEY);
        if (!hasDraft) {
          // No saved draft → reset to step 1
          setTimeout(resetWizard, 0);
        }
        // Has draft → keep the restored step state (already loaded in useState init)
      }
    }
  }, [isOpen, isEditing, resetWizard]);

  return {
    currentStep,
    visitedSteps,
    setCurrentStep,
    setVisitedSteps,
    validateStep,
    getInitialValues,
    handleClose,
    resetWizard,
  };
};
