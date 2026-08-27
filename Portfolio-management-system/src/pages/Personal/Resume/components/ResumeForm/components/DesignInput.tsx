import type { ResumeFormData } from "../../../types";
import { FileTypeToggle } from "./FileTypeToggle";
import { FileUploadDropzone } from "./FileUploadDropzone";
import { ImageUploadDropzone } from "./ImageUploadDropzone";
import { LatexInput } from "./LatexInput";

interface Props {
  formData: ResumeFormData;
  errors: Record<string, string>;
  isDark: boolean;
  updateField: <K extends keyof ResumeFormData>(
    field: K,
    value: ResumeFormData[K],
  ) => void;
}

export function DesignInput({ formData, errors, isDark, updateField }: Props) {
  const { designType, designFile, designUrl, latexCode } = formData;
  const inputClass = `w-full px-4 py-3 rounded-xl border focus:outline-none focus:ring-2 ${
    isDark
      ? "bg-slate-900/50 border-red-500/20 text-white focus:ring-red-500"
      : "bg-white border-blue-300/50 text-gray-900 focus:ring-blue-500"
  }`;

  const handleFileChange = (file?: File, previewUrl?: string) => {
    updateField("designFile", file);
    updateField("designUrl", previewUrl || "");
  };

  if (designType === "image" || designType === "pdf") {
    return (
      <div className="space-y-4">
        <FileTypeToggle
          hasFile={!!designFile}
          isDark={isDark}
          onSelectUrl={() => {
            updateField("designFile", undefined);
            updateField("designUrl", "");
          }}
          onSelectUpload={() => {
            updateField("designFile", undefined);
            updateField("designUrl", "");
          }}
        />
        {!designFile ? (
          <input
            type="url"
            value={designUrl}
            onChange={(e) => updateField("designUrl", e.target.value)}
            className={inputClass}
            placeholder={`https://example.com/design.${designType === "image" ? "png" : "pdf"}`}
          />
        ) : designType === "image" ? (
          <ImageUploadDropzone
            file={designFile}
            previewUrl={designUrl}
            isDark={isDark}
            onFileChange={handleFileChange}
          />
        ) : (
          <FileUploadDropzone
            fileName={designFile?.name}
            file={designFile}
            filePreviewUrl={designUrl}
            isDark={isDark}
            onFileChange={handleFileChange}
          />
        )}
      </div>
    );
  }

  if (designType === "latex") {
    return (
      <LatexInput
        value={latexCode}
        error={errors.latexCode}
        isDark={isDark}
        onChange={(v) => updateField("latexCode", v)}
      />
    );
  }

  return null;
}
