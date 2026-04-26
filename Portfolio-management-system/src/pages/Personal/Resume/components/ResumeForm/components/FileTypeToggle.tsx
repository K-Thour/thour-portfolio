import { Link2, Upload } from "lucide-react";

interface Props {
  hasFile: boolean;
  isDark: boolean;
  onSelectUrl: () => void;
  onSelectUpload: () => void;
}

export function FileTypeToggle({
  hasFile,
  isDark,
  onSelectUrl,
  onSelectUpload,
}: Props) {
  const btnClass = (isActive: boolean) =>
    `flex-1 flex items-center justify-center gap-2 px-4 py-2 rounded-lg border-2 font-medium transition-all ${
      isActive
        ? isDark
          ? "border-red-500 bg-red-500/20 text-white"
          : "border-blue-500 bg-blue-100 text-gray-900"
        : isDark
          ? "border-slate-700 text-gray-400"
          : "border-gray-300 text-gray-600"
    }`;

  return (
    <div className="flex gap-3">
      <button
        type="button"
        onClick={onSelectUrl}
        className={btnClass(!hasFile)}
      >
        <Link2 className="w-4 h-4" /> URL
      </button>
      <button
        type="button"
        onClick={onSelectUpload}
        className={btnClass(hasFile)}
      >
        <Upload className="w-4 h-4" /> Upload
      </button>
    </div>
  );
}
