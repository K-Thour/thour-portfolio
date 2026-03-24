import { Plus } from "lucide-react";
import { useAppSelector } from "../../../../hooks/useRedux";

interface TechnologyHeaderProps {
  onAdd: () => void;
}

export function TechnologyHeader({ onAdd }: TechnologyHeaderProps) {
  const { theme } = useAppSelector((state) => state.theme);
  const isDark = theme === "dark";

  return (
    <div className="flex items-center justify-between">
      <div>
        <h1
          className={`text-3xl font-bold mb-2 ${isDark ? "text-white" : "text-gray-900"}`}
        >
          {isDark ? "Tech Arsenal" : "Forged Tools"}
        </h1>
        <p className={isDark ? "text-gray-400" : "text-gray-600"}>
          Manage your technology stack
        </p>
      </div>
      <button
        onClick={onAdd}
        className={`flex items-center gap-2 px-6 py-3 rounded-xl font-medium transition-all hover:scale-105 ${
          isDark
            ? "bg-gradient-to-r from-red-600 to-yellow-500 text-white hover:shadow-lg hover:shadow-red-500/50"
            : "bg-gradient-to-r from-blue-600 to-blue-500 text-white hover:shadow-lg hover:shadow-blue-500/50"
        }`}
      >
        <Plus className="w-5 h-5" />
        Add Technology
      </button>
    </div>
  );
}
