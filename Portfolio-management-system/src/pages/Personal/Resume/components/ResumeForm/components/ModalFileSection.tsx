import { Upload } from "lucide-react";

interface Props {
  fileName?: string;
  isDark: boolean;
  onFileChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

export function ModalFileSection({ fileName, isDark, onFileChange }: Props) {
  return (
    <div>
      <label
        className={`block text-sm font-medium mb-2 ${isDark ? "text-gray-300" : "text-gray-800"}`}
      >
        Upload File *
      </label>
      <label
        className={`block w-full cursor-pointer border-2 border-dashed rounded-xl p-8 text-center transition-all ${
          isDark
            ? "border-red-500/20 hover:border-red-500/50 bg-slate-900/50"
            : "border-blue-300/50 hover:border-blue-500/70 bg-gray-50"
        }`}
      >
        <Upload
          className={`w-10 h-10 mx-auto mb-3 ${isDark ? "text-gray-400" : "text-gray-500"}`}
        />
        <p
          className={`text-sm mb-1 ${isDark ? "text-gray-300" : "text-gray-700"}`}
        >
          {fileName || "Click to upload file"}
        </p>
        <p className={`text-xs ${isDark ? "text-gray-500" : "text-gray-500"}`}>
          PDF, DOCX, PNG, JPG, WEBP (max 10MB)
        </p>
        <input
          type="file"
          accept=".pdf,.docx,image/*"
          onChange={onFileChange}
          className="hidden"
        />
      </label>
    </div>
  );
}
