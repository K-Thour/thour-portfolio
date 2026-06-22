import React, { useCallback, useEffect } from "react";
import { motion } from "motion/react";
import { useForm } from "@tanstack/react-form";
import { User, Camera, BarChart2, LayoutGrid } from "lucide-react";
import utils from "../../../../utils";
import type { ProfileFormData } from "./profileForm/types";
import {
  profileBasicInfoSchema,
  profileStatisticsSchema,
  profileAdditionalInfoSchema,
} from "../../../../validations/profile";
import { useWizard } from "../../../../hooks/useWizard";
import { WizardHeader } from "../../../../components/common/wizard/WizardHeader";
import { WizardStepper } from "../../../../components/common/wizard/WizardStepper";
import { WizardFooter } from "../../../../components/common/wizard/WizardFooter";
import {
  BasicInfoStep,
  PhotoStep,
  StatisticsStep,
  AdditionalInfoStep,
} from "./profileForm/steps";

const { cn } = utils.tailwindUtils;

const STORAGE_KEY = "profile_form_draft";
const STEP_STORAGE_KEY = "profile_form_step";

const steps = [
  {
    id: 1,
    title: "Basic Info",
    subtitle: "Personal details",
    icon: User,
    schema: profileBasicInfoSchema,
    fields: ["name", "email", "phoneNumber"],
  },
  {
    id: 2,
    title: "Photo",
    subtitle: "Profile image",
    icon: Camera,
    schema: null,
    fields: ["image"],
  },
  {
    id: 3,
    title: "Statistics",
    subtitle: "Career stats",
    icon: BarChart2,
    schema: profileStatisticsSchema,
    fields: [
      "experience",
      "completedProjects",
      "solvedProblems",
      "happyClients",
    ],
  },
  {
    id: 4,
    title: "Additional",
    subtitle: "Social & more",
    icon: LayoutGrid,
    schema: profileAdditionalInfoSchema,
    fields: ["InstagramURL", "LinkedInURL", "GitHubURL"],
  },
];

const defaultValues: ProfileFormData = {
  name: "",
  email: "",
  phoneNumber: "",
  image: {
    type: "url",
    url: "",
    file: null,
  },
  experience: 0,
  completedProjects: 0,
  solvedProblems: 0,
  happyClients: 0,
  InstagramURL: "",
  LinkedInURL: "",
  GitHubURL: "",
  hobbies: [],
  languages: [],
};

interface ProfileFormWizardProps {
  isOpen: boolean;
  onClose: () => void;
  onSubmit: (data: ProfileFormData) => void;
  initialData?: Partial<ProfileFormData>;
  isDark: boolean;
  isEditing?: boolean;
}

export const ProfileFormWizard: React.FC<ProfileFormWizardProps> = ({
  isOpen,
  onClose,
  onSubmit,
  initialData,
  isDark,
  isEditing = true,
}) => {
  const {
    currentStep,
    visitedSteps,
    setCurrentStep,
    setVisitedSteps,
    validateStep,
    getInitialValues,
    handleClose,
  } = useWizard({
    steps,
    defaultValues,
    initialData,
    isEditing,
    isOpen,
    storageKey: STORAGE_KEY,
    stepStorageKey: STEP_STORAGE_KEY,
  });

  const form = useForm({
    defaultValues: getInitialValues(),
    onSubmit: ({ value }: { value: ProfileFormData }) => {
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
          "relative z-10 w-full max-w-2xl rounded-2xl shadow-2xl overflow-hidden flex flex-col max-h-[calc(100vh-2rem)] md:max-h-[calc(100vh-4rem)]",
          isDark
            ? "bg-slate-800 border border-slate-700 text-white"
            : "bg-white border border-slate-200 text-slate-900",
        )}
      >
        <WizardHeader
          title={isEditing ? "Edit Profile" : "Add Profile"}
          isDark={isDark}
          onCancel={handleCancel}
        />
        <WizardStepper
          steps={steps}
          currentStep={currentStep}
          isDark={isDark}
          onStepClick={handleStepClick}
        />
        <div className="px-6 py-6 overflow-y-auto flex-1">
          {currentStep === 1 && <BasicInfoStep form={form} isDark={isDark} />}
          {currentStep === 2 && <PhotoStep form={form} isDark={isDark} />}
          {currentStep === 3 && <StatisticsStep form={form} isDark={isDark} />}
          {currentStep === 4 && (
            <AdditionalInfoStep form={form} isDark={isDark} />
          )}
        </div>
        <WizardFooter
          currentStep={currentStep}
          totalSteps={steps.length}
          isDark={isDark}
          submitText="Save Changes"
          onBack={handleBack}
          onNext={handleNext}
          onSubmit={handleSubmit}
        />
      </motion.div>
    </div>
  );
};

export default ProfileFormWizard;
