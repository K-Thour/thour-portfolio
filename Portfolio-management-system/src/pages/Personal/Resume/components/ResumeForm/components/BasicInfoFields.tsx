import { FileText, AlignLeft } from "lucide-react";
import { FormInput } from "./FormInput";
import { JobLinkInput } from "./JobLinkInput";
import type { FormSectionProps } from "../types";

export function BasicInfoFields({
  formData,
  errors,
  isDark,
  updateField,
}: FormSectionProps) {
  return (
    <div className="space-y-4">
      <FormInput
        label={
          <>
            <FileText className="inline w-4 h-4 mr-1 text-blue-500" /> Resume Title *
          </>
        }
        value={formData.name}
        error={errors.name}
        isDark={isDark}
        placeholder="e.g., Senior Full Stack Engineer - Cloud & AI"
        onChange={(v) => updateField("name", v)}
      />

      <JobLinkInput
        value={formData.jobLink}
        error={errors.jobLink}
        isDark={isDark}
        onChange={(v) => updateField("jobLink", v)}
      />

      <FormInput
        label={
          <>
            <AlignLeft className="inline w-4 h-4 mr-1 text-blue-500" /> Target Role Summary & Focus *
          </>
        }
        value={formData.description}
        error={errors.description}
        isDark={isDark}
        placeholder="Highlight key skills, experience level, and domain expertise to emphasize for this role..."
        rows={3}
        onChange={(v) => updateField("description", v)}
      />
    </div>
  );
}
