import { FileText, Link2, AlignLeft } from "lucide-react";
import { FormInput } from "./FormInput";
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
            <FileText className="inline w-4 h-4 mr-1" /> Resume Name *
          </>
        }
        value={formData.name}
        error={errors.name}
        isDark={isDark}
        placeholder="e.g., Software Engineer Resume"
        onChange={(v) => updateField("name", v)}
      />
      <FormInput
        label={
          <>
            <AlignLeft className="inline w-4 h-4 mr-1" /> Description *
          </>
        }
        value={formData.description}
        error={errors.description}
        isDark={isDark}
        placeholder="Brief description of the resume purpose..."
        rows={3}
        onChange={(v) => updateField("description", v)}
      />
      <FormInput
        label={
          <>
            <Link2 className="inline w-4 h-4 mr-1" /> Job Link *
          </>
        }
        type="url"
        value={formData.jobLink}
        error={errors.jobLink}
        isDark={isDark}
        placeholder="https://example.com/job-posting"
        onChange={(v) => updateField("jobLink", v)}
      />
    </div>
  );
}
