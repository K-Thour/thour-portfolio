import { motion } from "motion/react";
import { BarChart3 } from "lucide-react";
import type { StatisticsStepProps } from "../types";

export function StatisticsStep({
  formData,
  errors,
  isDark,
  onChange,
}: StatisticsStepProps) {
  return (
    <motion.div
      initial={{ opacity: 0, x: 20 }}
      animate={{ opacity: 1, x: 0 }}
      className="space-y-4"
    >
      <div className="flex items-center gap-3 mb-4">
        <div
          className={`w-10 h-10 rounded-xl flex items-center justify-center ${
            isDark
              ? "bg-linear-to-br from-red-600 to-yellow-500"
              : "bg-linear-to-br from-blue-600 to-blue-400"
          }`}
        >
          <BarChart3 className="w-5 h-5 text-white" />
        </div>
        <div>
          <h3
            className={`font-bold ${isDark ? "text-white" : "text-gray-900"}`}
          >
            Career Statistics
          </h3>
          <p
            className={`text-sm ${isDark ? "text-gray-400" : "text-gray-600"}`}
          >
            Your professional achievements
          </p>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <label
            className={`block text-sm font-medium mb-2 ${isDark ? "text-gray-300" : "text-gray-800"}`}
          >
            Years of Experience
          </label>
          <input
            type="number"
            min="0"
            value={formData.experience}
            onChange={(e) =>
              onChange("experience", parseInt(e.target.value) || 0)
            }
            className={`w-full px-4 py-3 rounded-xl border focus:outline-none focus:ring-2 ${
              isDark
                ? "bg-slate-900/50 border-red-500/20 text-white focus:ring-red-500"
                : "bg-white border-blue-300/50 text-gray-900 focus:ring-blue-500"
            } ${errors.experience ? "border-red-500" : ""}`}
            placeholder="5"
          />
          {errors.experience && (
            <p className="text-red-500 text-sm mt-1">{errors.experience}</p>
          )}
        </div>

        <div>
          <label
            className={`block text-sm font-medium mb-2 ${isDark ? "text-gray-300" : "text-gray-800"}`}
          >
            Completed Projects
          </label>
          <input
            type="number"
            min="0"
            value={formData.completedProjects}
            onChange={(e) =>
              onChange("completedProjects", parseInt(e.target.value) || 0)
            }
            className={`w-full px-4 py-3 rounded-xl border focus:outline-none focus:ring-2 ${
              isDark
                ? "bg-slate-900/50 border-red-500/20 text-white focus:ring-red-500"
                : "bg-white border-blue-300/50 text-gray-900 focus:ring-blue-500"
            } ${errors.completedProjects ? "border-red-500" : ""}`}
            placeholder="150"
          />
          {errors.completedProjects && (
            <p className="text-red-500 text-sm mt-1">
              {errors.completedProjects}
            </p>
          )}
        </div>

        <div>
          <label
            className={`block text-sm font-medium mb-2 ${isDark ? "text-gray-300" : "text-gray-800"}`}
          >
            Problems Solved
          </label>
          <input
            type="number"
            min="0"
            value={formData.solvedProblems}
            onChange={(e) =>
              onChange("solvedProblems", parseInt(e.target.value) || 0)
            }
            className={`w-full px-4 py-3 rounded-xl border focus:outline-none focus:ring-2 ${
              isDark
                ? "bg-slate-900/50 border-red-500/20 text-white focus:ring-red-500"
                : "bg-white border-blue-300/50 text-gray-900 focus:ring-blue-500"
            } ${errors.solvedProblems ? "border-red-500" : ""}`}
            placeholder="1000"
          />
          {errors.solvedProblems && (
            <p className="text-red-500 text-sm mt-1">{errors.solvedProblems}</p>
          )}
        </div>

        <div>
          <label
            className={`block text-sm font-medium mb-2 ${isDark ? "text-gray-300" : "text-gray-800"}`}
          >
            Happy Clients
          </label>
          <input
            type="number"
            min="0"
            value={formData.happyClients}
            onChange={(e) =>
              onChange("happyClients", parseInt(e.target.value) || 0)
            }
            className={`w-full px-4 py-3 rounded-xl border focus:outline-none focus:ring-2 ${
              isDark
                ? "bg-slate-900/50 border-red-500/20 text-white focus:ring-red-500"
                : "bg-white border-blue-300/50 text-gray-900 focus:ring-blue-500"
            } ${errors.happyClients ? "border-red-500" : ""}`}
            placeholder="50"
          />
          {errors.happyClients && (
            <p className="text-red-500 text-sm mt-1">{errors.happyClients}</p>
          )}
        </div>
      </div>

      {/* Stats Preview */}
      <div
        className={`p-5 rounded-xl border mt-6 ${
          isDark
            ? "bg-slate-800/50 border-red-500/20"
            : "bg-blue-50/50 border-blue-300/40"
        }`}
      >
        <p
          className={`text-xs mb-3 ${isDark ? "text-gray-500" : "text-gray-600"}`}
        >
          Stats Preview:
        </p>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          <div className="text-center">
            <div
              className={`text-2xl font-bold ${isDark ? "text-red-400" : "text-blue-600"}`}
            >
              {formData.experience}+
            </div>
            <div
              className={`text-xs ${isDark ? "text-gray-400" : "text-gray-600"}`}
            >
              Years
            </div>
          </div>
          <div className="text-center">
            <div
              className={`text-2xl font-bold ${isDark ? "text-red-400" : "text-blue-600"}`}
            >
              {formData.completedProjects}+
            </div>
            <div
              className={`text-xs ${isDark ? "text-gray-400" : "text-gray-600"}`}
            >
              Projects
            </div>
          </div>
          <div className="text-center">
            <div
              className={`text-2xl font-bold ${isDark ? "text-red-400" : "text-blue-600"}`}
            >
              {formData.solvedProblems}+
            </div>
            <div
              className={`text-xs ${isDark ? "text-gray-400" : "text-gray-600"}`}
            >
              Problems
            </div>
          </div>
          <div className="text-center">
            <div
              className={`text-2xl font-bold ${isDark ? "text-red-400" : "text-blue-600"}`}
            >
              {formData.happyClients}+
            </div>
            <div
              className={`text-xs ${isDark ? "text-gray-400" : "text-gray-600"}`}
            >
              Clients
            </div>
          </div>
        </div>
      </div>
    </motion.div>
  );
}
