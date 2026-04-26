import { motion } from "motion/react";
import {
  Settings,
  Save,
  RotateCcw,
  AlertCircle,
  ArrowBigLeft,
} from "lucide-react";
import { useAppSelector } from "../../../../hooks/useRedux";
import type { SettingsHeaderProps } from "../types";

export function SettingsHeader({
  onSave,
  onReset,
  onBack,
  hasChanges,
  autoSave,
}: SettingsHeaderProps) {
  const { theme } = useAppSelector((state) => state.theme);
  const isDark = theme === "dark";

  return (
    <motion.div
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      className={`p-6 rounded-2xl border ${
        isDark
          ? "bg-slate-800/50 border-red-500/20"
          : "bg-white/80 backdrop-blur-md border-blue-300/40 shadow-lg"
      }`}
    >
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div className="flex items-center gap-4">
          <button
            type="button"
            onClick={onBack}
            className={`flex items-center gap-2 px-4 py-2 rounded-xl font-medium transition-all hover:scale-105 ${
              isDark
                ? "bg-linear-to-r from-red-600 to-yellow-500 text-white hover:shadow-lg hover:shadow-red-500/50"
                : "bg-linear-to-r from-blue-600 to-blue-500 text-white hover:shadow-lg hover:shadow-blue-500/50"
            }`}
          >
            <ArrowBigLeft className="w-5 h-5" />
            Back
          </button>
          <div
            className={`w-14 h-14 rounded-xl flex items-center justify-center ${
              isDark
                ? "bg-linear-to-br from-red-600 to-yellow-500"
                : "bg-linear-to-br from-blue-600 to-blue-400"
            }`}
          >
            <Settings className="w-7 h-7 text-white" />
          </div>
          <div>
            <h1
              className={`text-2xl font-bold ${
                isDark ? "text-white" : "text-gray-900"
              }`}
            >
              Settings
            </h1>
            <p
              className={`text-sm ${isDark ? "text-gray-400" : "text-gray-600"}`}
            >
              Manage your preferences and AI limits
            </p>
          </div>
        </div>

        <div className="flex items-center gap-3">
          {hasChanges && !autoSave && (
            <motion.div
              initial={{ opacity: 0, x: -10 }}
              animate={{ opacity: 1, x: 0 }}
              className={`flex items-center gap-2 px-3 py-1.5 rounded-lg text-sm ${
                isDark
                  ? "bg-yellow-500/20 text-yellow-400"
                  : "bg-yellow-100 text-yellow-700"
              }`}
            >
              <AlertCircle className="w-4 h-4" />
              Unsaved changes
            </motion.div>
          )}
          {!autoSave && (
            <>
              <button
                type="button"
                onClick={onReset}
                className={`flex items-center gap-2 px-4 py-2 rounded-xl font-medium transition-all ${
                  isDark
                    ? "bg-slate-700 hover:bg-slate-600 text-gray-300"
                    : "bg-gray-100 hover:bg-gray-200 text-gray-700"
                }`}
              >
                <RotateCcw className="w-4 h-4" />
                Reset
              </button>
              <button
                type="button"
                onClick={onSave}
                className={`flex items-center gap-2 px-4 py-2 rounded-xl font-medium transition-all ${
                  isDark
                    ? "bg-red-600 hover:bg-red-700 text-white"
                    : "bg-blue-600 hover:bg-blue-700 text-white"
                }`}
              >
                <Save className="w-4 h-4" />
                Save
              </button>
            </>
          )}
          {autoSave && (
            <motion.div
              initial={{ opacity: 0, x: -10 }}
              animate={{ opacity: 1, x: 0 }}
              className={`flex items-center gap-2 px-3 py-1.5 rounded-lg text-sm ${
                isDark
                  ? "bg-green-500/20 text-green-400"
                  : "bg-green-100 text-green-700"
              }`}
            >
              <Save className="w-4 h-4" />
              Auto-save enabled
            </motion.div>
          )}
        </div>
      </div>
    </motion.div>
  );
}
