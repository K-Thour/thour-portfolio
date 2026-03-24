import React, { useCallback, useEffect } from "react";
import { motion } from "motion/react";
import { useForm } from "@tanstack/react-form";
import { Briefcase, FileText, Code, Link2 } from "lucide-react";
import utils from "../../../../../utils";
import type { ExperienceFormData } from "../../../../../interfaces/experience/experienceForm.interface";
import {
  experienceBasicInfoSchema,
  experienceDescriptionSchema,
  experienceLinksSchema,
} from "../../../../../validations/experience";
import { STORAGE_KEY } from "../../../../../constraints/experience/expeirinceForm.constraints";
import { useWizard } from "../../hooks/useWizard";
import {
  WizardHeader,
  WizardStepper,
  WizardContent,
  WizardFooter,
} from "./components";

const { cn } = utils.tailwindUtils;

const steps = [
  {
    id: 1,
    title: "Basic Info",
    subtitle: "Job details",
    icon: Briefcase,
    schema: experienceBasicInfoSchema,
    fields: ["jobTitle", "company", "location", "startDate"],
  },
  {
    id: 2,
    title: "Description",
    subtitle: "Role overview",
    icon: FileText,
    schema: experienceDescriptionSchema,
    fields: ["description"],
  },
  {
    id: 3,
    title: "Tech & Features",
    subtitle: "Skills & achievements",
    icon: Code,
    schema: null,
    fields: [],
  },
  {
    id: 4,
    title: "Links",
    subtitle: "URLs & references",
    icon: Link2,
    schema: experienceLinksSchema,
    fields: ["linkedInUrl", "companyUrl"],
  },
];

const defaultValues: ExperienceFormData = {
  jobTitle: "",
  company: "",
  location: "",
  startDate: "",
  endDate: null,
  isCurrent: false,
  description: "",
  technologies: [],
  features: [],
  linkedInUrl: null,
  companyUrl: null,
};

interface ExperienceFormWizardProps {
  isOpen: boolean;
  onClose: () => void;
  onSubmit: (data: ExperienceFormData) => void;
  initialData?: Partial<ExperienceFormData>;
  isDark: boolean;
  isEditing?: boolean;
}

export const ExperienceFormWizard: React.FC<ExperienceFormWizardProps> = ({
  isOpen,
  onClose,
  onSubmit,
  initialData,
  isDark,
  isEditing = false,
}) => {
  const {
    currentStep,
    visitedSteps,
    setCurrentStep,
    setVisitedSteps,
    validateStep,
    getInitialValues,
    handleClose,
  } = useWizard({ steps, defaultValues, initialData, isEditing, isOpen });

  const form = useForm({
    defaultValues: getInitialValues(),
    onSubmit: ({ value }: { value: ExperienceFormData }) => {
      onSubmit(value);
      handleClose(onClose);
    },
  });

  // 💾 Auto-save form values to localStorage on every change (add-mode only)
  useEffect(() => {
    if (isEditing) return;
    const subscription = form.store.subscribe(() => {
      const values = form.store.state.values;
      localStorage.setItem(STORAGE_KEY, JSON.stringify(values));
    });
    return () => subscription.unsubscribe();
  }, [form, isEditing]);

  const handleStepClick = useCallback(
    async (stepId: number) => {
      const canNavigate =
        visitedSteps.includes(stepId) ||
        stepId === Math.max(...visitedSteps) + 1;
      if (!canNavigate) return;
      if (
        stepId > currentStep &&
        !(await validateStep(currentStep, form.store.state.values, form))
      )
        return;
      setCurrentStep(stepId);
      setVisitedSteps((prev) => [...new Set([...prev, stepId])]);
    },
    [
      currentStep,
      visitedSteps,
      validateStep,
      form,
      setCurrentStep,
      setVisitedSteps,
    ],
  );

  const handleNext = useCallback(async () => {
    const values = form.store.state.values;
    const validated = await validateStep(currentStep, values, form);
    if (!validated) return;
    if (currentStep < steps.length) {
      setCurrentStep((prev) => prev + 1);
      setVisitedSteps((prev) => [...new Set([...prev, currentStep + 1])]);
    }
  }, [currentStep, validateStep, form, setCurrentStep, setVisitedSteps]);

  const handleBack = useCallback(() => {
    if (currentStep > 1) setCurrentStep((prev) => prev - 1);
  }, [currentStep, setCurrentStep]);

  const handleSubmit = useCallback(async () => {
    const values = form.store.state.values;
    for (let i = 1; i <= steps.length; i++) {
      if (!(await validateStep(i, values, form))) {
        setCurrentStep(i);
        return;
      }
    }
    form.handleSubmit();
  }, [form, validateStep, setCurrentStep]);

  const handleCancel = useCallback(() => {
    form.reset();
    handleClose(onClose);
  }, [form, handleClose, onClose]);

  useEffect(() => {
    if (!isOpen) return;

    const scrollY = window.scrollY;

    // Lock scroll
    document.body.style.position = "fixed";
    document.body.style.top = `-${scrollY}px`;
    document.body.style.left = "0";
    document.body.style.right = "0";

    return () => {
      document.body.style.position = "";
      document.body.style.top = "";
      document.body.style.left = "";
      document.body.style.right = "";

      window.scrollTo(0, scrollY);
    };
  }, [isOpen]);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center">
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className={cn(
          "absolute inset-0 backdrop-blur-sm",
          isDark ? "bg-black/60" : "bg-black/40",
        )}
      />
      <motion.div
        initial={{ opacity: 0, scale: 0.95, y: 20 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        exit={{ opacity: 0, scale: 0.95, y: 20 }}
        transition={{ duration: 0.2 }}
        className={cn(
          "relative z-10 w-full max-w-2xl rounded-2xl shadow-2xl overflow-hidden",
          isDark
            ? "bg-slate-800 border border-slate-700"
            : "bg-white border border-slate-200",
        )}
      >
        <WizardHeader
          isDark={isDark}
          isEditing={isEditing}
          onCancel={handleCancel}
        />
        <WizardStepper
          steps={steps}
          currentStep={currentStep}
          isDark={isDark}
          onStepClick={handleStepClick}
        />
        <WizardContent currentStep={currentStep} form={form} isDark={isDark} />
        <WizardFooter
          currentStep={currentStep}
          totalSteps={steps.length}
          isEditing={isEditing}
          isDark={isDark}
          onBack={handleBack}
          onNext={handleNext}
          onSubmit={handleSubmit}
        />
      </motion.div>
    </div>
  );
};

export default ExperienceFormWizard;
