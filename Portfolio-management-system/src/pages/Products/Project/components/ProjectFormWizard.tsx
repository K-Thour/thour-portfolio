import React, { useCallback, useEffect, useState } from "react";
import { motion } from "motion/react";
import { useForm } from "@tanstack/react-form";
import { FileText, Cpu, Link2, Info } from "lucide-react";
import utils from "../../../../utils";
import type { Project, ProjectFormData } from "./types";
import {
  projectBasicInfoSchema,
  projectDescriptionSchema,
  projectTechSchema,
  projectLinksSchema,
} from "../../../../validations/project";
import { useWizard } from "../../../../hooks/useWizard";
import { WizardHeader } from "../../../../components/common/wizard/WizardHeader";
import { WizardStepper } from "../../../../components/common/wizard/WizardStepper";
import { WizardFooter } from "../../../../components/common/wizard/WizardFooter";
import { BasicInfoStep } from "./projectForm/steps/BasicInfoStep";
import { DescriptionStep } from "./projectForm/steps/DescriptionStep";
import { TechFeaturesStep } from "./projectForm/steps/TechFeaturesStep";
import { LinksStep } from "./projectForm/steps/LinksStep";
import { fetchServices } from "../../../../services/api";

const { cn } = utils.tailwindUtils;

const STORAGE_KEY = "project_form_draft";
const STEP_STORAGE_KEY = "project_form_step";

const steps = [
  {
    id: 1,
    title: "Basic Info",
    subtitle: "Title & category",
    icon: Info,
    schema: projectBasicInfoSchema,
    fields: ["title", "subtitle", "category"],
  },
  {
    id: 2,
    title: "Description",
    subtitle: "Project details",
    icon: FileText,
    schema: projectDescriptionSchema,
    fields: ["description", "longDescription"],
  },
  {
    id: 3,
    title: "Tech & Features",
    subtitle: "Tools & capabilities",
    icon: Cpu,
    schema: projectTechSchema,
    fields: ["technologies", "features"],
  },
  {
    id: 4,
    title: "Links",
    subtitle: "Repository & preview",
    icon: Link2,
    schema: projectLinksSchema,
    fields: ["github", "liveUrl"],
  },
];

const defaultValues: ProjectFormData = {
  title: "",
  subtitle: "",
  category: "",
  description: "",
  longDescription: "",
  image: "",
  technologies: [],
  features: [],
  github: "",
  liveUrl: "",
  status: "In Progress",
};

interface ProjectFormWizardProps {
  isOpen: boolean;
  onClose: () => void;
  onSubmit: (data: ProjectFormData) => void;
  initialData?: Project;
  isDark: boolean;
  isEditing?: boolean;
}

export const ProjectFormWizard: React.FC<ProjectFormWizardProps> = ({
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
    onSubmit: ({ value }: { value: ProjectFormData }) => {
      onSubmit(value);
      handleClose(onClose);
    },
  });

  const [services, setServices] = useState<any[]>([]);

  useEffect(() => {
    if (!isOpen) return;
    const loadServices = async () => {
      try {
        const data = await fetchServices();
        setServices(data || []);
      } catch (err) {
        console.error("Failed to fetch services in ProjectFormWizard:", err);
      }
    };
    loadServices();
  }, [isOpen]);

  // 🔄 When editing, ensure the form is seeded with the full initialData on open
  useEffect(() => {
    if (isEditing && isOpen && initialData) {
      const values = getInitialValues();
      // Reset with the full initial values atomically so features/technologies
      // are never wiped to [] by a plain form.reset() call first
      form.reset();
      // Use setTimeout to let the reset settle before re-seeding values
      setTimeout(() => {
        Object.entries(values).forEach(([key, val]) => {
          form.setFieldValue(key as any, val);
        });
      }, 0);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isOpen, isEditing]);

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
          title={isEditing ? "Edit Project" : "Add Project"}
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
          {currentStep === 1 && (
            <BasicInfoStep form={form} isDark={isDark} services={services} />
          )}
          {currentStep === 2 && <DescriptionStep form={form} isDark={isDark} />}
          {currentStep === 3 && (
            <TechFeaturesStep form={form} isDark={isDark} />
          )}
          {currentStep === 4 && <LinksStep form={form} isDark={isDark} />}
        </div>
        <WizardFooter
          currentStep={currentStep}
          totalSteps={steps.length}
          isDark={isDark}
          submitText={isEditing ? "Save Changes" : "Add Project"}
          onBack={handleBack}
          onNext={handleNext}
          onSubmit={handleSubmit}
        />
      </motion.div>
    </div>
  );
};

export default ProjectFormWizard;
