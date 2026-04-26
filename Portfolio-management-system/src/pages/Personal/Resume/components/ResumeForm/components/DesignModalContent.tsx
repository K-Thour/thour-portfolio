import type { DesignModalType, DesignFormData } from "../types";
import { ModalTypeSelector } from "./ModalTypeSelector";
import { ModalFileSection } from "./ModalFileSection";
import { ModalLatexSection } from "./ModalLatexSection";

interface Props {
  modalType: DesignModalType;
  formData: DesignFormData;
  isDark: boolean;
  onTypeChange: (type: DesignModalType) => void;
  onFormDataChange: (data: DesignFormData) => void;
  onFileChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

export function DesignModalContent({
  modalType,
  formData,
  isDark,
  onTypeChange,
  onFormDataChange,
  onFileChange,
}: Props) {
  const inputClass = `w-full px-4 py-3 rounded-xl border focus:outline-none focus:ring-2 ${
    isDark
      ? "bg-slate-900/50 border-red-500/20 text-white focus:ring-red-500"
      : "bg-white border-blue-300/50 text-gray-900 focus:ring-blue-500"
  }`;

  return (
    <div className="space-y-6">
      <div>
        <label
          className={`block text-sm font-medium mb-2 ${isDark ? "text-gray-300" : "text-gray-800"}`}
        >
          Design Name *
        </label>
        <input
          type="text"
          value={formData.name}
          onChange={(e) =>
            onFormDataChange({ ...formData, name: e.target.value })
          }
          className={inputClass}
          placeholder="e.g., Modern Professional"
        />
      </div>

      <ModalTypeSelector
        selectedType={modalType}
        isDark={isDark}
        onChange={onTypeChange}
      />

      {modalType === "file" && (
        <ModalFileSection
          fileName={formData.file?.name}
          isDark={isDark}
          onFileChange={onFileChange}
        />
      )}

      {modalType === "latex" && (
        <ModalLatexSection
          latexCode={formData.latexCode}
          fileName={formData.file?.name}
          isDark={isDark}
          onCodeChange={(code) =>
            onFormDataChange({ ...formData, latexCode: code })
          }
          onFileChange={onFileChange}
        />
      )}
    </div>
  );
}
