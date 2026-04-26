import { motion } from "motion/react";
import { FileText, AlertCircle, Info } from "lucide-react";
import { useAppSelector } from "../../../../hooks/useRedux";
import type { ResumeSettingsCardProps } from "../types";

export function ResumeSettingsCard({
  settings,
  onUpdate,
}: ResumeSettingsCardProps) {
  const { theme } = useAppSelector((state) => state.theme);
  const isDark = theme === "dark";

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.1 }}
      className={`p-6 rounded-2xl border ${
        isDark
          ? "bg-slate-800/50 border-red-500/20"
          : "bg-white/80 backdrop-blur-md border-blue-300/40 shadow-lg"
      }`}
    >
      <div className="flex items-center gap-3 mb-6">
        <div
          className={`w-10 h-10 rounded-lg flex items-center justify-center ${
            isDark
              ? "bg-blue-500/20 text-blue-400"
              : "bg-blue-100 text-blue-600"
          }`}
        >
          <FileText className="w-5 h-5" />
        </div>
        <h2
          className={`text-xl font-bold ${
            isDark ? "text-white" : "text-gray-900"
          }`}
        >
          Resume Settings
        </h2>
      </div>

      <div className="space-y-6">
        {!settings.isGenerationEnabled && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            className={`flex items-start gap-3 p-4 rounded-xl border ${
              isDark
                ? "bg-yellow-500/10 border-yellow-500/30"
                : "bg-yellow-50 border-yellow-200"
            }`}
          >
            <AlertCircle className="w-5 h-5 text-yellow-500 shrink-0 mt-0.5" />
            <div>
              <p
                className={`font-medium text-sm ${
                  isDark ? "text-yellow-400" : "text-yellow-700"
                }`}
              >
                Resume Generation Disabled
              </p>
              <p
                className={`text-sm mt-1 ${
                  isDark ? "text-yellow-400/80" : "text-yellow-600"
                }`}
              >
                The Resume page will be hidden from navigation. Existing resumes
                are preserved.
              </p>
            </div>
          </motion.div>
        )}

        <div className="flex items-center justify-between">
          <div>
            <p
              className={`font-medium ${
                isDark ? "text-white" : "text-gray-900"
              }`}
            >
              Enable Resume Generation
            </p>
            <p
              className={`text-sm ${
                isDark ? "text-gray-400" : "text-gray-600"
              }`}
            >
              Show resume generation page in navigation
            </p>
          </div>
          <button
            type="button"
            onClick={() =>
              onUpdate({
                ...settings,
                isGenerationEnabled: !settings.isGenerationEnabled,
              })
            }
            className={`relative w-14 h-7 rounded-full transition-colors ${
              settings.isGenerationEnabled
                ? isDark
                  ? "bg-green-500"
                  : "bg-blue-600"
                : isDark
                  ? "bg-slate-600"
                  : "bg-gray-300"
            }`}
          >
            <span
              className={`absolute top-1 w-5 h-5 bg-white rounded-full transition-transform ${
                settings.isGenerationEnabled ? "left-8" : "left-1"
              }`}
            />
          </button>
        </div>

        <div className="flex items-center justify-between">
          <div>
            <p
              className={`font-medium ${
                isDark ? "text-white" : "text-gray-900"
              }`}
            >
              Max Resumes
            </p>
            <p
              className={`text-sm ${
                isDark ? "text-gray-400" : "text-gray-600"
              }`}
            >
              Maximum number of saved resumes
            </p>
          </div>
          <div className="flex items-center gap-2">
            {[5, 10, 20, 50].map((num) => (
              <button
                key={num}
                type="button"
                onClick={() => onUpdate({ ...settings, maxResumes: num })}
                className={`w-10 h-10 rounded-lg font-medium text-sm transition-all ${
                  settings.maxResumes === num
                    ? isDark
                      ? "bg-linear-to-br from-red-600 to-yellow-500"
                      : "bg-linear-to-br from-blue-600 to-blue-400"
                    : isDark
                      ? "bg-slate-700 text-gray-400 hover:bg-slate-600"
                      : "bg-gray-100 text-gray-600 hover:bg-gray-200"
                }`}
              >
                {num}
              </button>
            ))}
          </div>
        </div>

        <div
          className={`flex items-start gap-3 p-4 rounded-xl border ${
            isDark
              ? "bg-blue-500/10 border-blue-500/30"
              : "bg-blue-50 border-blue-200"
          }`}
        >
          <Info className="w-5 h-5 text-blue-500 shrink-0 mt-0.5" />
          <p
            className={`text-sm ${isDark ? "text-blue-400" : "text-blue-600"}`}
          >
            Changes to resume settings take effect immediately. Disabling resume
            generation will hide the page from the navigation menu.
          </p>
        </div>
      </div>
    </motion.div>
  );
}
