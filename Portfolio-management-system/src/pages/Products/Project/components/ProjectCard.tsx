import { motion } from "motion/react";
import { Edit2, Trash2, ExternalLink, Eye } from "lucide-react";
import { useAppSelector } from "../../../../hooks/useRedux";
import type { RootState } from "../../../../store/store";
import type { ProjectCardProps } from "./types";

export function ProjectCard({
  project,
  index,
  onEdit,
  onDelete,
  onView,
}: ProjectCardProps) {
  const { theme } = useAppSelector((state: RootState) => state.theme);
  const isDark = theme === "dark";

  return (
    <motion.div
      key={project.id}
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: index * 0.1 }}
      className={`p-6 rounded-2xl border group ${
        isDark
          ? "bg-slate-800/50 border-red-500/20 hover:border-red-500/50"
          : "bg-gradient-to-br from-white to-blue-50 border-blue-300/40 hover:border-blue-500/60 shadow-md hover:shadow-lg hover:shadow-blue-500/20"
      }`}
    >
      <div className="flex items-center gap-6">
        <img
          src={project.image}
          alt={project.title}
          className="w-24 h-24 rounded-xl object-cover"
        />
        <div className="flex-1">
          <div className="flex items-start justify-between mb-2">
            <div>
              <h3
                className={`text-xl font-bold mb-1 ${isDark ? "text-white" : "text-gray-900"}`}
              >
                {project.title}
              </h3>
              <div className="flex items-center gap-3">
                <span
                  className={`text-sm px-3 py-1 rounded-full ${
                    isDark
                      ? "bg-slate-900/50 text-gray-400"
                      : "bg-blue-100 text-gray-700"
                  }`}
                >
                  {project.category}
                </span>
                <span
                  className={`text-sm px-3 py-1 rounded-full ${
                    project.status === "Completed"
                      ? isDark
                        ? "bg-green-500/20 text-green-400"
                        : "bg-green-100 text-green-700"
                      : isDark
                        ? "bg-yellow-500/20 text-yellow-400"
                        : "bg-yellow-100 text-yellow-700"
                  }`}
                >
                  {project.status}
                </span>
              </div>
            </div>
            <div className="flex items-center gap-2">
              <button
                onClick={() => onView(project)}
                className={`p-2 rounded-lg ${isDark ? "hover:bg-slate-700/50 text-gray-400 hover:text-white" : "hover:bg-blue-100 text-gray-600 hover:text-gray-900"}`}
              >
                <Eye className="w-5 h-5" />
              </button>
              <button
                onClick={() => onEdit(project)}
                className={`p-2 rounded-lg ${isDark ? "hover:bg-slate-700/50 text-gray-400 hover:text-white" : "hover:bg-blue-100 text-gray-600 hover:text-gray-900"}`}
              >
                <Edit2 className="w-5 h-5" />
              </button>
              <button
                onClick={() => onDelete(project.id)}
                className={`p-2 rounded-lg ${isDark ? "hover:bg-red-500/20 text-gray-400 hover:text-red-500" : "hover:bg-red-100 text-gray-600 hover:text-red-600"}`}
              >
                <Trash2 className="w-5 h-5" />
              </button>
            </div>
          </div>
          <div className="flex items-center gap-4 mt-3">
            <div
              className={`flex items-center gap-2 text-sm ${isDark ? "text-gray-400" : "text-gray-600"}`}
            >
              <Eye className="w-4 h-4" />
              <span>{project.views} views</span>
            </div>
            <button
              onClick={() => onView(project)}
              className={`flex items-center gap-2 text-sm font-medium ${isDark ? "text-red-500 hover:text-red-400" : "text-blue-600 hover:text-blue-700"}`}
            >
              <ExternalLink className="w-4 h-4" />
              View Live
            </button>
          </div>
        </div>
      </div>
    </motion.div>
  );
}
