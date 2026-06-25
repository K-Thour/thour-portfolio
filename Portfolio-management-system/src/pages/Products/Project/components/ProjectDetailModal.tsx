import { motion, AnimatePresence } from "motion/react";
import { X, ExternalLink, Github, Tag, Cpu, ChevronRight } from "lucide-react";
import { useAppSelector } from "../../../../hooks/useRedux";
import type { RootState } from "../../../../store/store";
import type { Project } from "./types";

interface ProjectDetailModalProps {
  project: Project | null;
  isOpen: boolean;
  onClose: () => void;
}

export function ProjectDetailModal({
  project,
  isOpen,
  onClose,
}: ProjectDetailModalProps) {
  const { theme } = useAppSelector((state: RootState) => state.theme);
  const isDark = theme === "dark";

  if (!project) return null;

  const statusColor =
    project.status === "Completed"
      ? isDark
        ? "bg-green-500/20 text-green-400 border-green-500/40"
        : "bg-green-100 text-green-700 border-green-300"
      : isDark
        ? "bg-yellow-500/20 text-yellow-400 border-yellow-500/40"
        : "bg-yellow-100 text-yellow-700 border-yellow-300";

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className={`absolute inset-0 backdrop-blur-sm ${isDark ? "bg-black/70" : "bg-black/40"}`}
          />

          {/* Modal */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 20 }}
            transition={{ duration: 0.2, ease: "easeOut" }}
            className={`relative z-10 w-full max-w-2xl max-h-[90vh] overflow-y-auto rounded-2xl shadow-2xl border ${
              isDark
                ? "bg-slate-900 border-red-500/20"
                : "bg-white border-blue-200"
            }`}
          >
            {/* Hero Image */}
            <div className="relative h-52 overflow-hidden rounded-t-2xl">
              <img
                src={project.image || "https://placehold.co/800x300"}
                alt={project.title}
                className="w-full h-full object-cover"
              />
              {/* Gradient overlay */}
              <div
                className={`absolute inset-0 ${
                  isDark
                    ? "bg-gradient-to-t from-slate-900 via-slate-900/40 to-transparent"
                    : "bg-gradient-to-t from-white/90 via-white/20 to-transparent"
                }`}
              />
              {/* Close button */}
              <button
                onClick={onClose}
                className={`absolute top-4 right-4 p-2 rounded-xl backdrop-blur-sm transition-all hover:scale-110 ${
                  isDark
                    ? "bg-slate-800/80 text-gray-300 hover:text-white border border-slate-700"
                    : "bg-white/80 text-gray-600 hover:text-gray-900 border border-gray-200"
                }`}
              >
                <X className="w-5 h-5" />
              </button>

              {/* Status badge over image */}
              <div className="absolute bottom-4 left-6">
                <span
                  className={`px-3 py-1 rounded-full text-xs font-semibold border ${statusColor}`}
                >
                  {project.status}
                </span>
              </div>
            </div>

            {/* Content */}
            <div className="p-6 space-y-6">
              {/* Title & ID */}
              <div>
                <h2
                  className={`text-2xl font-bold mb-1 ${isDark ? "text-white" : "text-gray-900"}`}
                >
                  {project.title}
                </h2>
                {project.id && (
                  <p
                    className={`text-xs font-mono ${isDark ? "text-gray-500" : "text-gray-400"}`}
                  >
                    {String(project.id)}
                  </p>
                )}
              </div>

              {/* Meta chips */}
              <div className="flex flex-wrap gap-2">
                {project.category && (
                  <div
                    className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-sm border ${
                      isDark
                        ? "bg-slate-800 border-slate-700 text-gray-300"
                        : "bg-blue-50 border-blue-200 text-blue-800"
                    }`}
                  >
                    <Tag className="w-3.5 h-3.5" />
                    <span>{project.category}</span>
                  </div>
                )}
                {project.subtitle && (
                  <div
                    className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-sm border ${
                      isDark
                        ? "bg-slate-800 border-slate-700 text-gray-300"
                        : "bg-slate-50 border-slate-200 text-slate-700"
                    }`}
                  >
                    <Cpu className="w-3.5 h-3.5" />
                    <span>{project.subtitle}</span>
                  </div>
                )}
              </div>

              {/* Description */}
              {project.description && (
                <div>
                  <h3
                    className={`text-sm font-semibold uppercase tracking-wider mb-2 ${
                      isDark ? "text-gray-400" : "text-gray-500"
                    }`}
                  >
                    Description
                  </h3>
                  <p
                    className={`text-sm leading-relaxed ${
                      isDark ? "text-gray-300" : "text-gray-700"
                    }`}
                  >
                    {project.description}
                  </p>
                </div>
              )}

              {/* Long Description */}
              {project.longDescription &&
                project.longDescription !== project.description && (
                  <div
                    className={`p-4 rounded-xl border-l-4 ${
                      isDark
                        ? "bg-slate-800/60 border-red-500"
                        : "bg-blue-50/60 border-blue-500"
                    }`}
                  >
                    <h3
                      className={`text-sm font-semibold uppercase tracking-wider mb-2 ${
                        isDark ? "text-gray-400" : "text-gray-500"
                      }`}
                    >
                      Full Description
                    </h3>
                    <p
                      className={`text-sm leading-relaxed whitespace-pre-line ${
                        isDark ? "text-gray-300" : "text-gray-700"
                      }`}
                    >
                      {project.longDescription}
                    </p>
                  </div>
                )}

              {/* Technologies */}
              {project.technologies && project.technologies.length > 0 && (
                <div>
                  <h3
                    className={`text-sm font-semibold uppercase tracking-wider mb-2 ${
                      isDark ? "text-gray-400" : "text-gray-500"
                    }`}
                  >
                    Tech Stack
                  </h3>
                  <div className="flex flex-wrap gap-2">
                    {project.technologies.map((tech, i) => (
                      <span
                        key={i}
                        className={`px-3 py-1 rounded-lg text-xs font-medium border ${
                          isDark
                            ? "bg-slate-800 border-red-500/20 text-gray-300"
                            : "bg-blue-50 border-blue-200 text-blue-800"
                        }`}
                      >
                        {tech}
                      </span>
                    ))}
                  </div>
                </div>
              )}

              {/* Key Features */}
              {project.features && project.features.length > 0 && (
                <div>
                  <h3
                    className={`text-sm font-semibold uppercase tracking-wider mb-2 ${
                      isDark ? "text-gray-400" : "text-gray-500"
                    }`}
                  >
                    Key Features
                  </h3>
                  <ul className="space-y-1.5">
                    {project.features.map((feature, i) => (
                      <li
                        key={i}
                        className={`flex items-start gap-2 text-sm ${
                          isDark ? "text-gray-300" : "text-gray-700"
                        }`}
                      >
                        <ChevronRight
                          className={`w-4 h-4 mt-0.5 flex-shrink-0 ${
                            isDark ? "text-red-500" : "text-blue-500"
                          }`}
                        />
                        {feature}
                      </li>
                    ))}
                  </ul>
                </div>
              )}

              {/* Divider */}
              <div
                className={`border-t ${isDark ? "border-slate-700" : "border-gray-200"}`}
              />

              {/* Action Buttons */}
              <div className="flex gap-3 flex-wrap">
                {project.liveUrl &&
                  project.liveUrl !== "#" &&
                  project.liveUrl !== "https://example.com" && (
                    <a
                      href={project.liveUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className={`flex-1 min-w-[140px] flex items-center justify-center gap-2 px-5 py-2.5 rounded-xl font-medium text-sm transition-all hover:scale-[1.02] hover:shadow-lg ${
                        isDark
                          ? "bg-gradient-to-r from-red-600 to-yellow-500 text-white hover:shadow-red-500/30"
                          : "bg-gradient-to-r from-blue-600 to-blue-500 text-white hover:shadow-blue-500/30"
                      }`}
                    >
                      <ExternalLink className="w-4 h-4" />
                      View Live
                    </a>
                  )}
                {project.github &&
                  project.github !== "#" &&
                  project.github !== "https://github.com" && (
                    <a
                      href={project.github}
                      target="_blank"
                      rel="noopener noreferrer"
                      className={`flex-1 min-w-[140px] flex items-center justify-center gap-2 px-5 py-2.5 rounded-xl font-medium text-sm border transition-all hover:scale-[1.02] ${
                        isDark
                          ? "border-slate-600 text-gray-300 hover:bg-slate-800 hover:border-slate-500"
                          : "border-blue-300 text-blue-700 hover:bg-blue-50"
                      }`}
                    >
                      <Github className="w-4 h-4" />
                      Source Code
                    </a>
                  )}
                <button
                  onClick={onClose}
                  className={`px-5 py-2.5 rounded-xl font-medium text-sm border transition-all hover:scale-[1.02] ${
                    isDark
                      ? "border-slate-700 text-gray-400 hover:bg-slate-800 hover:text-gray-200"
                      : "border-gray-200 text-gray-500 hover:bg-gray-50 hover:text-gray-700"
                  }`}
                >
                  Close
                </button>
              </div>
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
}

export default ProjectDetailModal;
