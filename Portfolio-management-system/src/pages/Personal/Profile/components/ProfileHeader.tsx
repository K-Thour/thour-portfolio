import { ArrowBigLeft, Edit2 } from "lucide-react";
import { useAppSelector } from "../../../../hooks/useRedux";
import type { ProfileHeaderProps } from "../types";
import { ThemeToggle } from "../../../../components/ui/themeToggle/ThemeToggle";

export function ProfileHeader({ onEdit, onBack }: ProfileHeaderProps) {
  const { theme } = useAppSelector((state) => state.theme);
  const isDark = theme === "dark";

  return (
    <div className="flex items-center justify-between mx-4 mt-3">
      <button
        onClick={onBack}
        className={`flex items-center gap-2 px-6 py-3 rounded-xl font-medium transition-all hover:scale-105 ${
          isDark
            ? "bg-linear-to-r from-red-600 to-yellow-500 text-white hover:shadow-lg hover:shadow-red-500/50"
            : "bg-linear-to-r from-blue-600 to-blue-500 text-white hover:shadow-lg hover:shadow-blue-500/50"
        }`}
      >
        <ArrowBigLeft className="w-5 h-5" />
        Back
      </button>
      <div className="text-center ml-30">
        <h1
          className={`text-3xl font-bold mb-2 ${isDark ? "text-white" : "text-gray-900"}`}
        >
          {isDark ? "Hero Profile" : "Warrior Profile"}
        </h1>
        <p
          className={`text-center ${isDark ? "text-gray-400" : "text-gray-600"}`}
        >
          Manage your personal information and statistics
        </p>
      </div>
      <div className="flex items-center gap-16">
        <ThemeToggle />
        <button
          onClick={onEdit}
          className={`flex items-center gap-2 px-6 py-3 rounded-xl font-medium transition-all hover:scale-105 ${
            isDark
              ? "bg-linear-to-r from-red-600 to-yellow-500 text-white hover:shadow-lg hover:shadow-red-500/50"
              : "bg-linear-to-r from-blue-600 to-blue-500 text-white hover:shadow-lg hover:shadow-blue-500/50"
          }`}
        >
          <Edit2 className="w-5 h-5" />
          Edit Profile
        </button>
      </div>
    </div>
  );
}
