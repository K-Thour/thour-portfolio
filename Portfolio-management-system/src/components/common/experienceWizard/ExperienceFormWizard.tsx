import React, { useState, useEffect, useCallback } from "react";
import { motion, AnimatePresence } from "motion/react";
import { useForm } from "@tanstack/react-form";
import {
  Briefcase,
  FileText,
  Code,
  Link2,
  ChevronLeft,
  ChevronRight,
} from "lucide-react";
import Button from "../../ui/button/Button";
import utils from "../../../utils";
import type { ExperienceFormData } from "../../../validations/experienceSchema";
import {
  experienceBasicInfoSchema,
  experienceDescriptionSchema,
  experienceLinksSchema,
} from "../../../validations/experienceSchema";

const { cn } = utils.tailwindUtils;

const STORAGE_KEY = "experience_form_draft";

interface ExperienceFormWizardProps {
  isOpen: boolean;
  onClose: () => void;
  onSubmit: (data: ExperienceFormData) => void;
  initialData?: Partial<ExperienceFormData>;
  isDark: boolean;
  isEditing?: boolean;
}

const steps = [
  {
    id: 1,
    title: "Basic Info",
    subtitle: "Job details",
    icon: Briefcase,
    schema: experienceBasicInfoSchema,
  },
  {
    id: 2,
    title: "Description",
    subtitle: "Role overview",
    icon: FileText,
    schema: experienceDescriptionSchema,
  },
  {
    id: 3,
    title: "Tech & Features",
    subtitle: "Skills & achievements",
    icon: Code,
    schema: null,
  },
  {
    id: 4,
    title: "Links",
    subtitle: "URLs & references",
    icon: Link2,
    schema: experienceLinksSchema,
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

export const ExperienceFormWizard: React.FC<ExperienceFormWizardProps> = ({
  isOpen,
  onClose,
  onSubmit,
  initialData,
  isDark,
  isEditing = false,
}) => {
  const [currentStep, setCurrentStep] = useState(1);
  const [visitedSteps, setVisitedSteps] = useState<number[]>([1]);

  // Load from localStorage on mount (only for add mode)
  const getInitialValues = useCallback(() => {
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
    return { ...defaultValues, ...initialData };
  }, [isEditing, initialData]);

  const form = useForm({
    defaultValues: getInitialValues(),
    onSubmit: async ({ value }) => {
      onSubmit(value);
      if (!isEditing) {
        localStorage.removeItem(STORAGE_KEY);
      }
      handleClose();
    },
  });

  // Save to localStorage on field changes (only for add mode)
  useEffect(() => {
    if (!isEditing && isOpen) {
      const subscription = form.store.subscribe((state) => {
        const values = state.values;
        localStorage.setItem(STORAGE_KEY, JSON.stringify(values));
      });
      return () => subscription.unsubscribe();
    }
  }, [isEditing, isOpen, form.store]);

  // Reset form when opening/closing - use a ref to avoid setState in effect
  const isFirstRender = React.useRef(true);
  useEffect(() => {
    if (isFirstRender.current) {
      isFirstRender.current = false;
      return;
    }
    if (isOpen) {
      form.reset({ ...getInitialValues() });
    }
  }, [isOpen, form, getInitialValues]);

  const handleClose = () => {
    setCurrentStep(1);
    setVisitedSteps([1]);
    form.reset();
    onClose();
  };

  const validateStep = async (stepId: number): Promise<boolean> => {
    const step = steps.find((s) => s.id === stepId);
    if (!step || !step.schema) return true;

    // Get current form values from store state
    const state = form.store.state;
    const values = state.values as ExperienceFormData;

    try {
      await step.schema.validate(values, { abortEarly: false });
      return true;
    } catch {
      return false;
    }
  };

  const handleNext = async () => {
    // Define fields for each step
    const stepFields: Record<number, string[]> = {
      1: ["jobTitle", "company", "location", "startDate"],
      2: ["description"],
      3: [],
      4: ["linkedInUrl", "companyUrl"],
    };

    const fieldsToValidate = stepFields[currentStep] || [];
    let hasErrors = false;

    // Validate each field and set errors
    for (const fieldName of fieldsToValidate) {
      const value = form.getFieldValue(fieldName as keyof ExperienceFormData);

      let error: string | undefined;

      if (fieldName === "jobTitle") {
        if (!value || (value as string).length < 2)
          error = "Job title must be at least 2 characters";
        else if ((value as string).length > 100)
          error = "Job title must be less than 100 characters";
      } else if (fieldName === "company") {
        if (!value || (value as string).length < 2)
          error = "Company name must be at least 2 characters";
        else if ((value as string).length > 100)
          error = "Company name must be less than 100 characters";
      } else if (fieldName === "location") {
        if (!value || (value as string).length < 2)
          error = "Location must be at least 2 characters";
        else if ((value as string).length > 100)
          error = "Location must be less than 100 characters";
      } else if (fieldName === "startDate") {
        if (!value) error = "Start date is required";
      } else if (fieldName === "description") {
        if (value && (value as string).length > 2000)
          error = "Description must be less than 2000 characters";
      } else if (fieldName === "linkedInUrl" || fieldName === "companyUrl") {
        if (value && !(value as string).match(/^https?:\/\/.+/))
          error = "Please enter a valid URL";
      }

      // Set error on field meta - this updates the field's state
      form.setFieldMeta(fieldName as keyof ExperienceFormData, (prev) => ({
        ...prev,
        isTouched: true,
        errors: error ? [error] : [],
      }));

      if (error) {
        hasErrors = true;
      }
    }

    if (hasErrors) {
      return;
    }

    if (currentStep < steps.length) {
      const nextStep = currentStep + 1;
      setCurrentStep(nextStep);
      setVisitedSteps((prev) => [...new Set([...prev, nextStep])]);
    }
  };

  const handleBack = () => {
    if (currentStep > 1) {
      setCurrentStep((prev) => prev - 1);
    }
  };

  const handleStepClick = async (stepId: number) => {
    // Allow clicking visited steps or the next step
    const canNavigate =
      visitedSteps.includes(stepId) || stepId === Math.max(...visitedSteps) + 1;
    if (!canNavigate) return;

    // Validate current step before navigating away (if going forward)
    if (stepId > currentStep) {
      const isValid = await validateStep(currentStep);
      if (!isValid) {
        return;
      }
    }

    setCurrentStep(stepId);
    setVisitedSteps((prev) => [...new Set([...prev, stepId])]);
  };

  const handleSubmit = async () => {
    // Validate all steps before submitting
    for (let i = 1; i <= steps.length; i++) {
      const isValid = await validateStep(i);
      if (!isValid) {
        setCurrentStep(i);
        return;
      }
    }
    form.handleSubmit();
  };

  const handleCancel = () => {
    if (!isEditing) {
      localStorage.removeItem(STORAGE_KEY);
    }
    handleClose();
  };

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
        onClick={handleClose}
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
        <div
          className={cn(
            "flex items-center justify-between px-6 py-4 border-b",
            isDark ? "border-slate-700" : "border-slate-200",
          )}
        >
          <h2
            className={cn(
              "text-xl font-bold",
              isDark ? "text-white" : "text-slate-900",
            )}
          >
            {isEditing ? "Edit Experience" : "Add New Experience"}
          </h2>
          <button
            onClick={handleCancel}
            className={cn(
              "p-2 rounded-lg transition-colors",
              isDark
                ? "hover:bg-slate-700 text-slate-400"
                : "hover:bg-slate-100 text-slate-500",
            )}
          >
            <svg
              className="w-5 h-5"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M6 18L18 6M6 6l12 12"
              />
            </svg>
          </button>
        </div>

        <div
          className={cn(
            "px-6 py-6 border-b",
            isDark ? "border-slate-700" : "border-slate-200",
          )}
        >
          <div className="flex items-center justify-between">
            {steps.map((step, index) => {
              const Icon = step.icon;
              const isActive = step.id === currentStep;
              const isCompleted = step.id < currentStep;
              const isLast = index === steps.length - 1;

              return (
                <React.Fragment key={step.id}>
                  <button
                    onClick={() => handleStepClick(step.id)}
                    className="flex flex-col items-center gap-2 group"
                    disabled={step.id > currentStep}
                  >
                    <div
                      className={cn(
                        "w-10 h-10 rounded-full flex items-center justify-center transition-all duration-200",
                        isActive
                          ? "bg-linear-to-r from-orange-500 to-red-500 text-white shadow-lg shadow-orange-500/25"
                          : isCompleted
                            ? isDark
                              ? "bg-green-500/20 text-green-400 border border-green-500/30"
                              : "bg-green-100 text-green-600 border border-green-200"
                            : isDark
                              ? "bg-slate-700 text-slate-400 border border-slate-600"
                              : "bg-slate-100 text-slate-400 border border-slate-200",
                      )}
                    >
                      {isCompleted ? (
                        <svg
                          className="w-5 h-5"
                          fill="none"
                          viewBox="0 0 24 24"
                          stroke="currentColor"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M5 13l4 4L19 7"
                          />
                        </svg>
                      ) : (
                        <Icon className="w-5 h-5" />
                      )}
                    </div>
                    <div className="text-center">
                      <p
                        className={cn(
                          "text-sm font-medium",
                          isActive
                            ? isDark
                              ? "text-white"
                              : "text-slate-900"
                            : isDark
                              ? "text-slate-400"
                              : "text-slate-500",
                        )}
                      >
                        {step.title}
                      </p>
                      <p
                        className={cn(
                          "text-xs",
                          isDark ? "text-slate-500" : "text-slate-400",
                        )}
                      >
                        {step.subtitle}
                      </p>
                    </div>
                  </button>

                  {!isLast && (
                    <div
                      className={cn(
                        "flex-1 h-0.5 mx-4 transition-colors",
                        step.id < currentStep
                          ? isDark
                            ? "bg-green-500/30"
                            : "bg-green-200"
                          : isDark
                            ? "bg-slate-700"
                            : "bg-slate-200",
                      )}
                    />
                  )}
                </React.Fragment>
              );
            })}
          </div>
        </div>

        <div className="px-6 py-6">
          <AnimatePresence mode="wait">
            <motion.div
              key={currentStep}
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              transition={{ duration: 0.2 }}
            >
              {currentStep === 1 && (
                <BasicInfoStep form={form} isDark={isDark} />
              )}
              {currentStep === 2 && (
                <DescriptionStep form={form} isDark={isDark} />
              )}
              {currentStep === 3 && (
                <TechFeaturesStep form={form} isDark={isDark} />
              )}
              {currentStep === 4 && <LinksStep form={form} isDark={isDark} />}
            </motion.div>
          </AnimatePresence>
        </div>

        <div
          className={cn(
            "flex items-center justify-between px-6 py-4 border-t",
            isDark ? "border-slate-700" : "border-slate-200",
          )}
        >
          <Button
            onClick={handleBack}
            disabled={currentStep === 1}
            variant="outline"
            className={cn(
              isDark &&
                "border-slate-600 text-slate-300 hover:bg-slate-700 hover:text-white",
            )}
          >
            <ChevronLeft className="w-4 h-4 mr-2" />
            Back
          </Button>

          {currentStep < steps.length ? (
            <Button
              onClick={handleNext}
              className="bg-linear-to-r from-orange-500 to-red-500 text-white hover:from-orange-600 hover:to-red-600 shadow-lg shadow-orange-500/25"
            >
              Next
              <ChevronRight className="w-4 h-4 ml-2" />
            </Button>
          ) : (
            <Button
              onClick={handleSubmit}
              className="bg-linear-to-r from-orange-500 to-red-500 text-white hover:from-orange-600 hover:to-red-600 shadow-lg shadow-orange-500/25"
            >
              {isEditing ? "Save Changes" : "Add Experience"}
            </Button>
          )}
        </div>
      </motion.div>
    </div>
  );
};

// Step Components with proper typing
// eslint-disable-next-line @typescript-eslint/no-explicit-any
function BasicInfoStep({ form, isDark }: { form: any; isDark: boolean }) {
  return (
    <div className="space-y-4">
      <form.Field
        name="jobTitle"
        validators={{
          onChange: ({ value }: { value: string }) => {
            if (!value || value.length < 2)
              return "Job title must be at least 2 characters";
            if (value.length > 100)
              return "Job title must be less than 100 characters";
            return undefined;
          },
        }}
      >
        {(field: FieldType) => (
          <div>
            <label
              className={cn(
                "block text-sm font-medium mb-2",
                isDark ? "text-slate-300" : "text-slate-700",
              )}
            >
              Job Title <span className="text-red-500">*</span>
            </label>
            <input
              type="text"
              value={field.state.value}
              onChange={(e) => field.handleChange(e.target.value)}
              placeholder="e.g. Senior Full Stack Developer"
              className={cn(
                "w-full px-4 py-3 rounded-xl border bg-transparent outline-none transition-all",
                isDark
                  ? "border-slate-600 text-white placeholder:text-slate-500 focus:border-orange-500/50 focus:ring-2 focus:ring-orange-500/20"
                  : "border-slate-300 text-slate-900 placeholder:text-slate-400 focus:border-orange-500/50 focus:ring-2 focus:ring-orange-500/20",
              )}
            />
            {field.state.meta.isTouched &&
              field.state.meta.errors.length > 0 && (
                <motion.p
                  initial={{ opacity: 0, y: -4 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="mt-1.5 text-xs text-red-500 font-medium flex items-center gap-1"
                >
                  <span className="inline-block w-1 h-1 rounded-full bg-red-500" />
                  {field.state.meta.errors.join(", ")}
                </motion.p>
              )}
          </div>
        )}
      </form.Field>

      <form.Field
        name="company"
        validators={{
          onChange: ({ value }: { value: string }) => {
            if (!value || value.length < 2)
              return "Company name must be at least 2 characters";
            if (value.length > 100)
              return "Company name must be less than 100 characters";
            return undefined;
          },
        }}
      >
        {(field: FieldType) => (
          <div>
            <label
              className={cn(
                "block text-sm font-medium mb-2",
                isDark ? "text-slate-300" : "text-slate-700",
              )}
            >
              Company <span className="text-red-500">*</span>
            </label>
            <input
              type="text"
              value={field.state.value}
              onChange={(e) => field.handleChange(e.target.value)}
              placeholder="e.g. Tech Giants Inc."
              className={cn(
                "w-full px-4 py-3 rounded-xl border bg-transparent outline-none transition-all",
                isDark
                  ? "border-slate-600 text-white placeholder:text-slate-500 focus:border-orange-500/50 focus:ring-2 focus:ring-orange-500/20"
                  : "border-slate-300 text-slate-900 placeholder:text-slate-400 focus:border-orange-500/50 focus:ring-2 focus:ring-orange-500/20",
              )}
            />
            {field.state.meta.isTouched &&
              field.state.meta.errors.length > 0 && (
                <motion.p
                  initial={{ opacity: 0, y: -4 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="mt-1.5 text-xs text-red-500 font-medium flex items-center gap-1"
                >
                  <span className="inline-block w-1 h-1 rounded-full bg-red-500" />
                  {field.state.meta.errors.join(", ")}
                </motion.p>
              )}
          </div>
        )}
      </form.Field>

      <form.Field
        name="location"
        validators={{
          onChange: ({ value }: { value: string }) => {
            if (!value || value.length < 2)
              return "Location must be at least 2 characters";
            if (value.length > 100)
              return "Location must be less than 100 characters";
            return undefined;
          },
        }}
      >
        {(field: FieldType) => (
          <div>
            <label
              className={cn(
                "block text-sm font-medium mb-2",
                isDark ? "text-slate-300" : "text-slate-700",
              )}
            >
              Location <span className="text-red-500">*</span>
            </label>
            <input
              type="text"
              value={field.state.value}
              onChange={(e) => field.handleChange(e.target.value)}
              placeholder="e.g. San Francisco, CA"
              className={cn(
                "w-full px-4 py-3 rounded-xl border bg-transparent outline-none transition-all",
                isDark
                  ? "border-slate-600 text-white placeholder:text-slate-500 focus:border-orange-500/50 focus:ring-2 focus:ring-orange-500/20"
                  : "border-slate-300 text-slate-900 placeholder:text-slate-400 focus:border-orange-500/50 focus:ring-2 focus:ring-orange-500/20",
              )}
            />
            {field.state.meta.isTouched &&
              field.state.meta.errors.length > 0 && (
                <motion.p
                  initial={{ opacity: 0, y: -4 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="mt-1.5 text-xs text-red-500 font-medium flex items-center gap-1"
                >
                  <span className="inline-block w-1 h-1 rounded-full bg-red-500" />
                  {field.state.meta.errors.join(", ")}
                </motion.p>
              )}
          </div>
        )}
      </form.Field>

      <div className="grid grid-cols-2 gap-4">
        <form.Field
          name="startDate"
          validators={{
            onChange: ({ value }: { value: string }) => {
              if (!value) return "Start date is required";
              return undefined;
            },
          }}
        >
          {(field: FieldType) => (
            <div>
              <label
                className={cn(
                  "block text-sm font-medium mb-2",
                  isDark ? "text-slate-300" : "text-slate-700",
                )}
              >
                Start Date <span className="text-red-500">*</span>
              </label>
              <input
                type="month"
                value={field.state.value}
                onChange={(e) => field.handleChange(e.target.value)}
                className={cn(
                  "w-full px-4 py-3 rounded-xl border bg-transparent outline-none transition-all",
                  isDark
                    ? "border-slate-600 text-white placeholder:text-slate-500 focus:border-orange-500/50 focus:ring-2 focus:ring-orange-500/20"
                    : "border-slate-300 text-slate-900 placeholder:text-slate-400 focus:border-orange-500/50 focus:ring-2 focus:ring-orange-500/20",
                )}
              />
              {field.state.meta.isTouched &&
                field.state.meta.errors.length > 0 && (
                  <motion.p
                    initial={{ opacity: 0, y: -4 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="mt-1.5 text-xs text-red-500 font-medium flex items-center gap-1"
                  >
                    <span className="inline-block w-1 h-1 rounded-full bg-red-500" />
                    {field.state.meta.errors.join(", ")}
                  </motion.p>
                )}
            </div>
          )}
        </form.Field>

        <form.Field name="endDate">
          {(field: FieldTypeNull) => (
            <div>
              <label
                className={cn(
                  "block text-sm font-medium mb-2",
                  isDark ? "text-slate-300" : "text-slate-700",
                )}
              >
                End Date
              </label>
              <input
                type="month"
                value={field.state.value || ""}
                onChange={(e) => field.handleChange(e.target.value || null)}
                className={cn(
                  "w-full px-4 py-3 rounded-xl border bg-transparent outline-none transition-all",
                  isDark
                    ? "border-slate-600 text-white placeholder:text-slate-500 focus:border-orange-500/50 focus:ring-2 focus:ring-orange-500/20"
                    : "border-slate-300 text-slate-900 placeholder:text-slate-400 focus:border-orange-500/50 focus:ring-2 focus:ring-orange-500/20",
                )}
              />
            </div>
          )}
        </form.Field>
      </div>

      <form.Field name="isCurrent">
        {(field: FieldTypeBool) => (
          <label className="flex items-center gap-3 cursor-pointer">
            <input
              type="checkbox"
              checked={field.state.value}
              onChange={(e) => field.handleChange(e.target.checked)}
              className="w-5 h-5 rounded border-slate-400 text-orange-500 focus:ring-orange-500/20"
            />
            <span
              className={cn(
                "text-sm",
                isDark ? "text-slate-300" : "text-slate-700",
              )}
            >
              I currently work here
            </span>
          </label>
        )}
      </form.Field>
    </div>
  );
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
function DescriptionStep({ form, isDark }: { form: any; isDark: boolean }) {
  return (
    <div className="space-y-4">
      <form.Field
        name="description"
        validators={{
          onChange: ({ value }: { value: string }) => {
            if (value && value.length > 2000)
              return "Description must be less than 2000 characters";
            return undefined;
          },
        }}
      >
        {(field: FieldType) => (
          <div>
            <label
              className={cn(
                "block text-sm font-medium mb-2",
                isDark ? "text-slate-300" : "text-slate-700",
              )}
            >
              Job Description
            </label>
            <textarea
              value={field.state.value}
              onChange={(e) => field.handleChange(e.target.value)}
              placeholder="Describe your role, responsibilities, and achievements..."
              rows={8}
              className={cn(
                "w-full px-4 py-3 rounded-xl border bg-transparent outline-none transition-all resize-none",
                isDark
                  ? "border-slate-600 text-white placeholder:text-slate-500 focus:border-orange-500/50 focus:ring-2 focus:ring-orange-500/20"
                  : "border-slate-300 text-slate-900 placeholder:text-slate-400 focus:border-orange-500/50 focus:ring-2 focus:ring-orange-500/20",
              )}
            />
            {field.state.meta.isTouched &&
              field.state.meta.errors.length > 0 && (
                <motion.p
                  initial={{ opacity: 0, y: -4 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="mt-1.5 text-xs text-red-500 font-medium flex items-center gap-1"
                >
                  <span className="inline-block w-1 h-1 rounded-full bg-red-500" />
                  {field.state.meta.errors.join(", ")}
                </motion.p>
              )}
            <p
              className={cn(
                "mt-2 text-xs",
                isDark ? "text-slate-500" : "text-slate-400",
              )}
            >
              {field.state.value?.length || 0} / 2000 characters
            </p>
          </div>
        )}
      </form.Field>
    </div>
  );
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
function TechFeaturesStep({ form, isDark }: { form: any; isDark: boolean }) {
  const [techInput, setTechInput] = useState("");
  const [featureInput, setFeatureInput] = useState("");

  return (
    <div className="space-y-6">
      <div>
        <label
          className={cn(
            "block text-sm font-medium mb-2",
            isDark ? "text-slate-300" : "text-slate-700",
          )}
        >
          Technologies Used
        </label>
        <form.Field name="technologies">
          {(field: FieldTypeArray) => {
            const technologies: string[] = field.state.value || [];

            const addTech = () => {
              if (
                techInput.trim() &&
                !technologies.includes(techInput.trim())
              ) {
                field.handleChange([...technologies, techInput.trim()]);
                setTechInput("");
              }
            };

            const removeTech = (tech: string) => {
              field.handleChange(
                technologies.filter((t: string) => t !== tech),
              );
            };

            return (
              <div>
                <div className="flex gap-2">
                  <input
                    type="text"
                    value={techInput}
                    onChange={(e) => setTechInput(e.target.value)}
                    onKeyDown={(e) =>
                      e.key === "Enter" && (e.preventDefault(), addTech())
                    }
                    placeholder="e.g. React, TypeScript"
                    className={cn(
                      "flex-1 px-4 py-3 rounded-xl border bg-transparent outline-none transition-all",
                      isDark
                        ? "border-slate-600 text-white placeholder:text-slate-500 focus:border-orange-500/50 focus:ring-2 focus:ring-orange-500/20"
                        : "border-slate-300 text-slate-900 placeholder:text-slate-400 focus:border-orange-500/50 focus:ring-2 focus:ring-orange-500/20",
                    )}
                  />
                  <Button
                    type="button"
                    onClick={addTech}
                    variant="outline"
                    className={cn(
                      isDark &&
                        "border-slate-600 text-slate-300 hover:bg-slate-700",
                    )}
                  >
                    Add
                  </Button>
                </div>
                <div className="flex flex-wrap gap-2 mt-3">
                  {technologies.map((tech: string) => (
                    <span
                      key={tech}
                      className={cn(
                        "inline-flex items-center gap-1 px-3 py-1 rounded-full text-sm",
                        isDark
                          ? "bg-orange-500/20 text-orange-400 border border-orange-500/30"
                          : "bg-orange-100 text-orange-700 border border-orange-200",
                      )}
                    >
                      {tech}
                      <button
                        onClick={() => removeTech(tech)}
                        className="hover:text-red-400"
                      >
                        <svg
                          className="w-3 h-3"
                          fill="none"
                          viewBox="0 0 24 24"
                          stroke="currentColor"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M6 18L18 6M6 6l12 12"
                          />
                        </svg>
                      </button>
                    </span>
                  ))}
                </div>
              </div>
            );
          }}
        </form.Field>
      </div>

      <div>
        <label
          className={cn(
            "block text-sm font-medium mb-2",
            isDark ? "text-slate-300" : "text-slate-700",
          )}
        >
          Key Achievements
        </label>
        <form.Field name="features">
          {(field: FieldTypeArray) => {
            const features: string[] = field.state.value || [];

            const addFeature = () => {
              if (
                featureInput.trim() &&
                !features.includes(featureInput.trim())
              ) {
                field.handleChange([...features, featureInput.trim()]);
                setFeatureInput("");
              }
            };

            const removeFeature = (feature: string) => {
              field.handleChange(features.filter((f: string) => f !== feature));
            };

            return (
              <div>
                <div className="flex gap-2">
                  <input
                    type="text"
                    value={featureInput}
                    onChange={(e) => setFeatureInput(e.target.value)}
                    onKeyDown={(e) =>
                      e.key === "Enter" && (e.preventDefault(), addFeature())
                    }
                    placeholder="e.g. Increased performance by 40%"
                    className={cn(
                      "flex-1 px-4 py-3 rounded-xl border bg-transparent outline-none transition-all",
                      isDark
                        ? "border-slate-600 text-white placeholder:text-slate-500 focus:border-orange-500/50 focus:ring-2 focus:ring-orange-500/20"
                        : "border-slate-300 text-slate-900 placeholder:text-slate-400 focus:border-orange-500/50 focus:ring-2 focus:ring-orange-500/20",
                    )}
                  />
                  <Button
                    type="button"
                    onClick={addFeature}
                    variant="outline"
                    className={cn(
                      isDark &&
                        "border-slate-600 text-slate-300 hover:bg-slate-700",
                    )}
                  >
                    Add
                  </Button>
                </div>
                <ul className="mt-3 space-y-2">
                  {features.map((feature: string) => (
                    <li
                      key={feature}
                      className={cn(
                        "flex items-center justify-between px-4 py-2 rounded-lg",
                        isDark
                          ? "bg-slate-700/50 text-slate-300"
                          : "bg-slate-100 text-slate-700",
                      )}
                    >
                      <span className="flex items-center gap-2">
                        <span className="w-1.5 h-1.5 rounded-full bg-red-500" />
                        {feature}
                      </span>
                      <button
                        onClick={() => removeFeature(feature)}
                        className={cn(
                          "p-1 rounded transition-colors",
                          isDark
                            ? "hover:bg-slate-600 text-slate-400"
                            : "hover:bg-slate-200 text-slate-500",
                        )}
                      >
                        <svg
                          className="w-4 h-4"
                          fill="none"
                          viewBox="0 0 24 24"
                          stroke="currentColor"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M6 18L18 6M6 6l12 12"
                          />
                        </svg>
                      </button>
                    </li>
                  ))}
                </ul>
              </div>
            );
          }}
        </form.Field>
      </div>
    </div>
  );
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
function LinksStep({ form, isDark }: { form: any; isDark: boolean }) {
  return (
    <div className="space-y-4">
      <form.Field
        name="linkedInUrl"
        validators={{
          onChange: ({ value }: { value: string | null }) => {
            if (value && !value.match(/^https?:\/\/.+/))
              return "Please enter a valid URL";
            return undefined;
          },
        }}
      >
        {(field: FieldTypeNull) => (
          <div>
            <label
              className={cn(
                "block text-sm font-medium mb-2",
                isDark ? "text-slate-300" : "text-slate-700",
              )}
            >
              LinkedIn Profile URL
            </label>
            <input
              type="url"
              value={field.state.value || ""}
              onChange={(e) => field.handleChange(e.target.value || null)}
              placeholder="https://linkedin.com/in/username"
              className={cn(
                "w-full px-4 py-3 rounded-xl border bg-transparent outline-none transition-all",
                isDark
                  ? "border-slate-600 text-white placeholder:text-slate-500 focus:border-orange-500/50 focus:ring-2 focus:ring-orange-500/20"
                  : "border-slate-300 text-slate-900 placeholder:text-slate-400 focus:border-orange-500/50 focus:ring-2 focus:ring-orange-500/20",
              )}
            />
            {field.state.meta.isTouched &&
              field.state.meta.errors.length > 0 && (
                <motion.p
                  initial={{ opacity: 0, y: -4 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="mt-1.5 text-xs text-red-500 font-medium flex items-center gap-1"
                >
                  <span className="inline-block w-1 h-1 rounded-full bg-red-500" />
                  {field.state.meta.errors.join(", ")}
                </motion.p>
              )}
          </div>
        )}
      </form.Field>

      <form.Field
        name="companyUrl"
        validators={{
          onChange: ({ value }: { value: string | null }) => {
            if (value && !value.match(/^https?:\/\/.+/))
              return "Please enter a valid URL";
            return undefined;
          },
        }}
      >
        {(field: FieldTypeNull) => (
          <div>
            <label
              className={cn(
                "block text-sm font-medium mb-2",
                isDark ? "text-slate-300" : "text-slate-700",
              )}
            >
              Company Website URL
            </label>
            <input
              type="url"
              value={field.state.value || ""}
              onChange={(e) => field.handleChange(e.target.value || null)}
              placeholder="https://company.com"
              className={cn(
                "w-full px-4 py-3 rounded-xl border bg-transparent outline-none transition-all",
                isDark
                  ? "border-slate-600 text-white placeholder:text-slate-500 focus:border-orange-500/50 focus:ring-2 focus:ring-orange-500/20"
                  : "border-slate-300 text-slate-900 placeholder:text-slate-400 focus:border-orange-500/50 focus:ring-2 focus:ring-orange-500/20",
              )}
            />
            {field.state.meta.isTouched &&
              field.state.meta.errors.length > 0 && (
                <motion.p
                  initial={{ opacity: 0, y: -4 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="mt-1.5 text-xs text-red-500 font-medium flex items-center gap-1"
                >
                  <span className="inline-block w-1 h-1 rounded-full bg-red-500" />
                  {field.state.meta.errors.join(", ")}
                </motion.p>
              )}
          </div>
        )}
      </form.Field>
    </div>
  );
}

// Type definitions
type FieldType = {
  state: {
    value: string;
    meta: { errors: string[]; isTouched: boolean };
  };
  handleChange: (v: string) => void;
};

type FieldTypeNull = {
  state: {
    value: string | null;
    meta: { errors: string[]; isTouched: boolean };
  };
  handleChange: (v: string | null) => void;
};

type FieldTypeBool = {
  state: {
    value: boolean;
    meta: { errors: string[]; isTouched: boolean };
  };
  handleChange: (v: boolean) => void;
};

type FieldTypeArray = {
  state: {
    value: string[];
    meta: { errors: string[]; isTouched: boolean };
  };
  handleChange: (v: string[]) => void;
};

export default ExperienceFormWizard;
