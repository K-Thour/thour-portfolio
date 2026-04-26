import { motion } from "motion/react";
import { Brain, AlertTriangle, CheckCircle2, XCircle } from "lucide-react";
import { useAppSelector } from "../../../../hooks/useRedux";
import type { AISettingsCardProps } from "../types";

export function AISettingsCard({ settings, onUpdate }: AISettingsCardProps) {
  const { theme } = useAppSelector((state) => state.theme);
  const isDark = theme === "dark";

  const remaining = Math.max(0, settings.dailyLimit - settings.currentUsage);
  const percentage = Math.min(
    100,
    (settings.currentUsage / settings.dailyLimit) * 100,
  );
  const isNearLimit = percentage > 80;
  const isAtLimit = remaining === 0;

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
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
              ? "bg-purple-500/20 text-purple-400"
              : "bg-purple-100 text-purple-600"
          }`}
        >
          <Brain className="w-5 h-5" />
        </div>
        <h2
          className={`text-xl font-bold ${
            isDark ? "text-white" : "text-gray-900"
          }`}
        >
          AI Settings
        </h2>
      </div>

      <div className="space-y-6">
        <div
          className={`p-4 rounded-xl border ${
            isAtLimit
              ? isDark
                ? "bg-red-500/10 border-red-500/30"
                : "bg-red-50 border-red-200"
              : isNearLimit
                ? isDark
                  ? "bg-yellow-500/10 border-yellow-500/30"
                  : "bg-yellow-50 border-yellow-200"
                : isDark
                  ? "bg-green-500/10 border-green-500/30"
                  : "bg-green-50 border-green-200"
          }`}
        >
          <div className="flex items-center gap-3 mb-3">
            {isAtLimit ? (
              <XCircle className="w-5 h-5 text-red-500" />
            ) : isNearLimit ? (
              <AlertTriangle className="w-5 h-5 text-yellow-500" />
            ) : (
              <CheckCircle2 className="w-5 h-5 text-green-500" />
            )}
            <span
              className={`font-medium ${
                isDark ? "text-white" : "text-gray-900"
              }`}
            >
              Daily Usage Limit
            </span>
          </div>

          <div className="mb-3">
            <div className="flex justify-between text-sm mb-2">
              <span className={isDark ? "text-gray-400" : "text-gray-600"}>
                {settings.currentUsage} / {settings.dailyLimit} requests
              </span>
              <span
                className={`font-medium ${
                  isAtLimit
                    ? "text-red-500"
                    : isNearLimit
                      ? "text-yellow-500"
                      : isDark
                        ? "text-green-400"
                        : "text-green-600"
                }`}
              >
                {remaining} remaining
              </span>
            </div>
            <div
              className={`h-2 rounded-full ${
                isDark ? "bg-slate-700" : "bg-gray-200"
              }`}
            >
              <div
                className={`h-full rounded-full transition-all duration-500 ${
                  isAtLimit
                    ? "bg-red-500"
                    : isNearLimit
                      ? "bg-yellow-500"
                      : "bg-green-500"
                }`}
                style={{ width: `${percentage}%` }}
              />
            </div>
          </div>

          <p
            className={`text-sm ${isDark ? "text-gray-400" : "text-gray-600"}`}
          >
            {isAtLimit
              ? "You've reached your daily limit. Limits reset at midnight UTC."
              : isNearLimit
                ? "You're approaching your daily limit. Consider upgrading your plan."
                : "You're within your daily usage limit."}
          </p>
        </div>

        <div className="flex items-center justify-between">
          <div>
            <p
              className={`font-medium ${
                isDark ? "text-white" : "text-gray-900"
              }`}
            >
              Enable AI Features
            </p>
            <p
              className={`text-sm ${
                isDark ? "text-gray-400" : "text-gray-600"
              }`}
            >
              Toggle all AI-powered features
            </p>
          </div>
          <button
            type="button"
            onClick={() =>
              onUpdate({ ...settings, isEnabled: !settings.isEnabled })
            }
            className={`relative w-14 h-7 rounded-full transition-colors ${
              settings.isEnabled
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
                settings.isEnabled ? "left-8" : "left-1"
              }`}
            />
          </button>
        </div>
      </div>
    </motion.div>
  );
}
