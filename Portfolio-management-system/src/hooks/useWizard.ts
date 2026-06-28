import { useState, useCallback, useRef, useEffect } from "react";

interface StepConfig {
  id: number;

  schema: any | null;
  fields: string[];
}

interface UseWizardProps<TForm> {
  steps: StepConfig[];
  defaultValues: TForm;
  initialData?: Partial<TForm>;
  isEditing: boolean;
  isOpen: boolean;
  storageKey: string;
  stepStorageKey: string;
}

interface UseWizardReturn<TForm> {
  currentStep: number;
  visitedSteps: number[];
  setCurrentStep: (step: number | ((prev: number) => number)) => void;
  setVisitedSteps: (steps: number[] | ((prev: number[]) => number[])) => void;
  validateStep: (
    stepId: number,
    values: TForm,

    form: any,
  ) => Promise<boolean>;
  getInitialValues: () => TForm;
  handleClose: (onClose: () => void) => void;
  resetWizard: () => void;
}

/** Read persisted step state from localStorage */
function getSavedStepState(stepStorageKey: string): {
  currentStep: number;
  visitedSteps: number[];
} | null {
  try {
    const raw = localStorage.getItem(stepStorageKey);
    if (!raw) return null;
    return JSON.parse(raw);
  } catch {
    return null;
  }
}

/** Save step state to localStorage */
function saveStepState(
  stepStorageKey: string,
  currentStep: number,
  visitedSteps: number[],
) {
  localStorage.setItem(
    stepStorageKey,
    JSON.stringify({ currentStep, visitedSteps }),
  );
}

export const useWizard = <TForm extends Record<string, any>>({
  steps,
  defaultValues,
  initialData,
  isEditing,
  isOpen,
  storageKey,
  stepStorageKey,
}: UseWizardProps<TForm>): UseWizardReturn<TForm> => {
  // In add-mode, restore from localStorage if a draft exists
  const savedStep = !isEditing ? getSavedStepState(stepStorageKey) : null;

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
            saveStepState(stepStorageKey, next, vs);
            return vs;
          });
        }
        return next;
      });
    },
    [isEditing, stepStorageKey],
  );

  // Wrap setVisitedSteps to also persist step state
  const setVisitedSteps = useCallback(
    (updater: number[] | ((prev: number[]) => number[])) => {
      setVisitedStepsRaw((prev) => {
        const next = typeof updater === "function" ? updater(prev) : updater;
        if (!isEditing) {
          setCurrentStepRaw((cs) => {
            saveStepState(stepStorageKey, cs, next);
            return cs;
          });
        }
        return next;
      });
    },
    [isEditing, stepStorageKey],
  );

  // 🧠 Restore form values from localStorage in add-mode
  const getInitialValues = useCallback((): TForm => {
    if (isEditing && initialData) {
      return { ...defaultValues, ...initialData };
    }

    if (!isEditing) {
      const saved = localStorage.getItem(storageKey);
      if (saved) {
        try {
          return { ...defaultValues, ...JSON.parse(saved) };
        } catch {
          return defaultValues;
        }
      }
    }

    return { ...defaultValues, ...initialData } as TForm;
  }, [isEditing, initialData, defaultValues, storageKey]);

  // 🔥 VALIDATION — uses TanStack Form's own validateField so errors render natively
  const validateStep = useCallback(
    async (
      stepId: number,
      _values: TForm,

      form: any,
    ): Promise<boolean> => {
      const step = steps.find((s) => s.id === stepId);
      if (!step || step.fields.length === 0) return true;

      // 1️⃣ Touch all fields first — TanStack Form skips validateField when isTouched is false
      step.fields.forEach((field: string) => {
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
        localStorage.removeItem(storageKey);
        localStorage.removeItem(stepStorageKey);
      }
      resetWizard();
      onClose();
    },
    [isEditing, resetWizard, storageKey, stepStorageKey],
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
        const hasDraft = !!localStorage.getItem(storageKey);
        if (!hasDraft) {
          // No saved draft → reset to step 1
          setTimeout(resetWizard, 0);
        }
        // Has draft → keep the restored step state (already loaded in useState init)
      }
    }
  }, [isOpen, isEditing, resetWizard, storageKey]);

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
