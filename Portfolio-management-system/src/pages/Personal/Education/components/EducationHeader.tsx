import { Plus } from "lucide-react";
import { useAppSelector } from "../../../../hooks/useRedux";
import type { EducationHeaderProps } from "../types";

export function EducationHeader({ onAdd }: EducationHeaderProps) {
  const { theme } = useAppSelector((state) => state.theme);
  const isDark = theme === "dark";

  return (
    <div className="flex items-center justify-between">
      <div>
        <h1
          className={`text-3xl font-bold mb-2 ${isDark ? "text-white" : "text-gray-900"}`}
        >
          Education
        </h1>
        <p className={isDark ? "text-gray-400" : "text-gray-600"}>
          Manage your educational background
        </p>
      </div>
      <button
        onClick={onAdd}
        className={`flex items-center gap-2 px-6 py-3 rounded-xl font-medium transition-all hover:scale-105 ${
          isDark
            ? "bg-linear-to-r from-red-600 to-yellow-500 text-white hover:shadow-lg hover:shadow-red-500/50"
            : "bg-linear-to-r from-blue-600 to-blue-500 text-white hover:shadow-lg hover:shadow-blue-500/50"
        }`}
      >
        <Plus className="w-5 h-5" />
        Add Education
      </button>
    </div>
  );
}
