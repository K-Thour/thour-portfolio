import { motion } from "motion/react";
import { Edit2, Trash2 } from "lucide-react";
import type { Technology } from "../../types";
import { useAppSelector } from "../../../../../hooks/useRedux";
import type { RootState } from "../../../../../store/store";

interface TechnologyCardProps {
  tech: Technology;
  index: number;
  onEdit: (tech: Technology) => void;
  onDelete: (id: number) => void;
}

export function TechnologyCard({
  tech,
  index,
  onEdit,
  onDelete,
}: TechnologyCardProps) {
  const { theme } = useAppSelector((state: RootState) => state.theme);
  const isDark = theme === "dark";

  return (
    <motion.div
      key={tech.id}
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: index * 0.05 }}
      className={`p-6 rounded-2xl border group ${
        isDark
          ? "bg-slate-800/50 border-red-500/20 hover:border-red-500/50"
          : "bg-linear-to-br from-white to-blue-50 border-blue-300/40 hover:border-blue-500/60 shadow-md hover:shadow-lg hover:shadow-blue-500/20"
      }`}
    >
      <div className="flex items-start justify-between mb-4">
        <div className="flex items-center gap-3">
          <div
            className={`w-12 h-12 rounded-xl flex items-center justify-center text-2xl ${
              isDark ? "bg-slate-900/50" : "bg-blue-50"
            }`}
          >
            {tech.icon}
          </div>
          <div>
            <h3
              className={`font-bold ${isDark ? "text-white" : "text-gray-900"}`}
            >
              {tech.name}
            </h3>
            <span
              className={`text-xs px-2 py-1 rounded-full ${
                isDark
                  ? "bg-slate-900/50 text-gray-400"
                  : "bg-blue-100 text-gray-700"
              }`}
            >
              {tech.category}
            </span>
          </div>
        </div>
        <div className="flex gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
          <button
            onClick={() => onEdit(tech)}
            className={`p-2 rounded-lg ${isDark ? "hover:bg-slate-700/50 text-gray-400 hover:text-white" : "hover:bg-blue-100 text-gray-600 hover:text-gray-900"}`}
          >
            <Edit2 className="w-4 h-4" />
          </button>
          <button
            onClick={() => onDelete(tech.id)}
            className={`p-2 rounded-lg ${isDark ? "hover:bg-red-500/20 text-gray-400 hover:text-red-500" : "hover:bg-red-100 text-gray-600 hover:text-red-600"}`}
          >
            <Trash2 className="w-4 h-4" />
          </button>
        </div>
      </div>
    </motion.div>
  );
}
