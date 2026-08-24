import { useState } from "react";
import { useAppSelector } from "../../../../../hooks/useRedux";
import type { RootState } from "../../../../../store/store";
import type { ResumeFormProps, ResumeDesignType } from "../../types";
import { motion, AnimatePresence } from "motion/react";
import { Eye, Edit3 } from "lucide-react";
import { useResumeForm } from "../../hooks/useResumeForm";
import { BasicInfoFields } from "./components/BasicInfoFields";
import { ProjectRoleSelector } from "./components/ProjectRoleSelector";
import { TemplateSelector } from "./components/TemplateSelector";
import { LatexUploadEditor } from "./components/LatexUploadEditor";
import { ResumeDesignPreview } from "./components/ResumeDesignPreview";
import { FormActions } from "./components/FormActions";

export function ResumeForm({
  onSubmit,
  onCancel,
  initialData,
}: ResumeFormProps) {
  const { theme } = useAppSelector((store: RootState) => store.theme);
  const isDark = theme === "dark";
  const [mobileTab, setMobileTab] = useState<"edit" | "preview">("edit");

  const { formData, errors, updateField, validateForm } =
    useResumeForm(initialData);

  const onSelectTemplateType = (type: ResumeDesignType) => {
    updateField("designType", type);
  };

  const onSubmitForm = () => {
    if (validateForm()) {
      onSubmit(formData);
    }
  };

  return (
    <div className="flex flex-col gap-6">
      {/* Mobile Tab Toggle (< md breakpoint) */}
      <div className="flex md:hidden bg-slate-200 dark:bg-slate-800/80 p-1 rounded-xl border border-slate-300 dark:border-slate-700">
        <button
          type="button"
          onClick={() => setMobileTab("edit")}
          className={`flex-1 py-2 text-xs font-semibold rounded-lg flex items-center justify-center gap-1.5 transition-all ${
            mobileTab === "edit"
              ? "bg-blue-600 text-white shadow-sm"
              : "text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white"
          }`}
        >
          <Edit3 className="w-3.5 h-3.5" />
          Edit Details
        </button>
        <button
          type="button"
          onClick={() => setMobileTab("preview")}
          className={`flex-1 py-2 text-xs font-semibold rounded-lg flex items-center justify-center gap-1.5 transition-all ${
            mobileTab === "preview"
              ? "bg-blue-600 text-white shadow-sm"
              : "text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white"
          }`}
        >
          <Eye className="w-3.5 h-3.5" />
          Live Preview
        </button>
      </div>

      {/* 2-Column Split Layout on Desktop / Tabs on Mobile */}
      <div className="grid grid-cols-1 md:grid-cols-12 gap-6 items-start">
        {/* Left Column: Form Controls */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          className={`md:col-span-6 space-y-6 ${
            mobileTab === "edit" ? "block" : "hidden md:block"
          }`}
        >
          {/* Section 1: Resume Name, Job Link & Description */}
          <div
            className={`p-4 rounded-xl border ${
              isDark
                ? "bg-slate-900/40 border-slate-800"
                : "bg-slate-50/60 border-slate-200"
            }`}
          >
            <BasicInfoFields
              formData={formData}
              errors={errors}
              isDark={isDark}
              updateField={updateField}
            />
          </div>

          {/* Section 2: Target Role & Role-Based Project Selector */}
          <div
            className={`p-4 rounded-xl border ${
              isDark
                ? "bg-slate-900/40 border-slate-800"
                : "bg-slate-50/60 border-slate-200"
            }`}
          >
            <ProjectRoleSelector
              targetRole={formData.targetRole || "Full Stack Software Engineer"}
              jobDescription={formData.description}
              selectedProjectIds={formData.selectedProjectIds || []}
              isDark={isDark}
              onRoleChange={(role) => updateField("targetRole", role)}
              onProjectsChange={(projectIds) => updateField("selectedProjectIds", projectIds)}
            />
          </div>

          {/* Section 3: Template Selector & Dedicated LaTeX Editor */}
          <div
            className={`p-4 rounded-xl border space-y-4 ${
              isDark
                ? "bg-slate-900/40 border-slate-800"
                : "bg-slate-50/60 border-slate-200"
            }`}
          >
            <TemplateSelector
              selectedType={formData.designType}
              isDark={isDark}
              onSelectType={onSelectTemplateType}
            />

            {/* In-place LaTeX Editor & .tex Uploader */}
            <AnimatePresence mode="wait">
              {formData.designType === "latex" && (
                <motion.div
                  key="latex-uploader"
                  initial={{ opacity: 0, height: 0 }}
                  animate={{ opacity: 1, height: "auto" }}
                  exit={{ opacity: 0, height: 0 }}
                  className="pt-3 border-t border-slate-700/60 overflow-hidden"
                >
                  <LatexUploadEditor
                    latexCode={formData.latexCode || ""}
                    isDark={isDark}
                    onChange={(code) => updateField("latexCode", code)}
                  />
                  {errors.latexCode && (
                    <p className="text-xs text-red-500 mt-1">{errors.latexCode}</p>
                  )}
                </motion.div>
              )}
            </AnimatePresence>
          </div>

          <FormActions
            isDark={isDark}
            onCancel={onCancel}
            onSubmit={onSubmitForm}
          />
        </motion.div>

        {/* Right Column: Interactive Live Preview */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          className={`md:col-span-6 md:sticky md:top-2 h-[580px] ${
            mobileTab === "preview" ? "block" : "hidden md:block"
          }`}
        >
          <ResumeDesignPreview formData={formData} isDark={isDark} />
        </motion.div>
      </div>
    </div>
  );
}

export default ResumeForm;
