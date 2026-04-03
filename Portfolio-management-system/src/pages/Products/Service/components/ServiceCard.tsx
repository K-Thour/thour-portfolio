import { motion } from "motion/react";
import { Edit2, Trash2 } from "lucide-react";
import { useAppSelector } from "../../../../hooks/useRedux";
import type { RootState } from "../../../../store/store";
import type { ServiceCardProps } from "./types";

export function ServiceCard({
  service,
  index,
  onEdit,
  onDelete,
  onToggleActive,
}: ServiceCardProps) {
  const { theme } = useAppSelector((state: RootState) => state.theme);
  const isDark = theme === "dark";

  return (
    <motion.div
      key={service.id}
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: index * 0.1 }}
      className={`p-6 rounded-2xl border group ${
        isDark
          ? "bg-slate-800/50 border-red-500/20 hover:border-red-500/50"
          : "bg-linear-to-br from-white to-blue-50 border-blue-300/40 hover:border-blue-500/60 shadow-md hover:shadow-lg hover:shadow-blue-500/20"
      }`}
    >
      <div className="flex items-start justify-between mb-4">
        <div
          className={`w-14 h-14 rounded-xl flex items-center justify-center text-3xl ${
            isDark
              ? "bg-linear-to-br from-red-600 to-yellow-500"
              : "bg-linear-to-br from-blue-600 to-blue-400 shadow-lg shadow-blue-500/30"
          }`}
        >
          {service.iconType === "emoji" && service.icon}
          {service.iconType === "url" && service.iconUrl && (
            <img
              src={service.iconUrl}
              alt={service.title}
              className="w-8 h-8 object-contain"
            />
          )}
          {service.iconType === "upload" && service.iconFile && (
            <img
              src={service.iconFile}
              alt={service.title}
              className="w-8 h-8 object-contain"
            />
          )}
        </div>
        <button
          onClick={() => onToggleActive(service.id)}
          className={`px-3 py-1 rounded-full text-xs font-medium transition-all ${
            service.active
              ? isDark
                ? "bg-green-500/20 text-green-400 hover:bg-green-500/30"
                : "bg-green-100 text-green-700 hover:bg-green-200"
              : isDark
                ? "bg-gray-500/20 text-gray-400 hover:bg-gray-500/30"
                : "bg-gray-100 text-gray-600 hover:bg-gray-200"
          }`}
        >
          {service.active ? "Active" : "Inactive"}
        </button>
      </div>
      <h3
        className={`text-xl font-bold mb-1 ${isDark ? "text-white" : "text-gray-900"}`}
      >
        {service.title}
      </h3>
      <p
        className={`text-sm mb-3 ${isDark ? "text-gray-400" : "text-gray-600"}`}
      >
        {service.subtitle || service.description}
      </p>
      <p
        className={`text-xs mb-4 ${isDark ? "text-gray-500" : "text-gray-500"}`}
      >
        {service.features?.length || 0} features • {service.category}
      </p>
      <div className="flex gap-2">
        <button
          onClick={() => onEdit(service)}
          className={`flex-1 px-4 py-2 rounded-lg font-medium transition-all ${
            isDark
              ? "bg-slate-700/50 text-white hover:bg-slate-700"
              : "bg-blue-100 text-gray-900 hover:bg-blue-200"
          }`}
        >
          <Edit2 className="w-4 h-4 mx-auto" />
        </button>
        <button
          onClick={() => onDelete(service.id)}
          className={`flex-1 px-4 py-2 rounded-lg font-medium transition-all ${
            isDark
              ? "bg-red-500/20 text-red-400 hover:bg-red-500/30"
              : "bg-red-100 text-red-700 hover:bg-red-200"
          }`}
        >
          <Trash2 className="w-4 h-4 mx-auto" />
        </button>
      </div>
    </motion.div>
  );
}
