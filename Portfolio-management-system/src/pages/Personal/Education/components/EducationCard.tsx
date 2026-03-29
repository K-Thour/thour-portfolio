import { motion } from "motion/react";
import { Edit2, Trash2, GraduationCap, Calendar } from "lucide-react";
import { useAppSelector } from "../../../../hooks/useRedux";
import type { EducationCardProps } from "../types";
import { baseCard, iconBox, actionBtn } from "../utils/utils";

export function EducationCard({
  edu,
  index,
  onEdit,
  onDelete,
}: EducationCardProps) {
  const { theme } = useAppSelector((state) => state.theme);
  const isDark = theme === "dark";

  return (
    <motion.div
      initial={{ opacity: 0, x: -20 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ duration: 0.5, delay: index * 0.1 }}
      className={baseCard(isDark)}
    >
      <div
        className={`absolute left-0 top-8 w-4 h-4 rounded-full border-4 ${
          isDark ? "bg-red-500 border-slate-800" : "bg-blue-600 border-white"
        }`}
      />
      <div className="flex items-start justify-between">
        <div className="flex-1 ml-6">
          <div className="flex items-center gap-3 mb-3">
            <div className={iconBox(isDark)}>
              <GraduationCap className="w-6 h-6 text-white" />
            </div>
            <div>
              <h3
                className={`text-xl font-bold ${isDark ? "text-white" : "text-gray-900"}`}
              >
                {edu.degree}
              </h3>
              <p
                className={`font-medium ${isDark ? "text-gray-400" : "text-gray-700"}`}
              >
                {edu.institution}
              </p>
            </div>
          </div>
          <div className="flex items-center gap-2 mb-3">
            <Calendar
              className={`w-4 h-4 ${isDark ? "text-gray-500" : "text-gray-400"}`}
            />
            <span
              className={`text-sm ${isDark ? "text-gray-400" : "text-gray-600"}`}
            >
              {edu.period}
            </span>
            <span
              className={`ml-4 px-3 py-1 rounded-full text-xs font-medium ${
                isDark
                  ? "bg-green-500/20 text-green-400"
                  : "bg-green-100 text-green-700"
              }`}
            >
              {edu.grade}
            </span>
          </div>
          <p className={isDark ? "text-gray-400" : "text-gray-700"}>
            {edu.description}
          </p>
        </div>
        <div className="flex gap-2">
          <button
            onClick={() => onEdit(edu)}
            className={actionBtn(isDark, "edit")}
          >
            <Edit2 className="w-5 h-5" />
          </button>
          <button
            onClick={() => onDelete(edu.id)}
            className={actionBtn(isDark, "delete")}
          >
            <Trash2 className="w-5 h-5" />
          </button>
        </div>
      </div>
    </motion.div>
  );
}
