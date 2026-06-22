import React, { useState } from "react";
import { motion } from "motion/react";
import { Lock, Eye, EyeOff, CheckCircle2 } from "lucide-react";
import { useAppSelector } from "../../../../hooks/useRedux";
import { changePassword } from "../../../../services/api";
import { toast } from "../../../../components/ui/toast/toast";

export function SecuritySettingsCard() {
  const { theme } = useAppSelector((state) => state.theme);
  const isDark = theme === "dark";

  const [currentPassword, setCurrentPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [loading, setLoading] = useState(false);

  const [showCurrent, setShowCurrent] = useState(false);
  const [showNew, setShowNew] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);

  const [errors, setErrors] = useState<Record<string, string>>({});

  const validate = () => {
    const newErrors: Record<string, string> = {};
    if (!currentPassword) {
      newErrors.currentPassword = "Current password is required";
    }
    if (!newPassword) {
      newErrors.newPassword = "New password is required";
    } else if (newPassword.length < 8) {
      newErrors.newPassword = "Password must be at least 8 characters long";
    } else if (!/[A-Z]/.test(newPassword)) {
      newErrors.newPassword =
        "Password must contain at least one uppercase letter";
    } else if (!/[0-9]/.test(newPassword)) {
      newErrors.newPassword = "Password must contain at least one number";
    } else if (!/[^A-Za-z0-9]/.test(newPassword)) {
      newErrors.newPassword =
        "Password must contain at least one special character";
    }

    if (newPassword !== confirmPassword) {
      newErrors.confirmPassword = "Passwords do not match";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!validate()) return;

    setLoading(false);
    try {
      setLoading(true);
      await changePassword({ currentPassword, newPassword });
      toast({
        title: "Password Updated",
        description: "Your password has been successfully updated.",
        variant: "success",
      });
      setCurrentPassword("");
      setNewPassword("");
      setConfirmPassword("");
    } catch (err: any) {
      const errMsg =
        err.response?.data?.message ||
        "Failed to update password. Please check your credentials.";
      toast({
        title: "Update Failed",
        description: errMsg,
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.3 }}
      className={`p-6 rounded-2xl border ${
        isDark
          ? "bg-slate-800/50 border-red-500/20"
          : "bg-white/80 backdrop-blur-md border-blue-300/40 shadow-lg"
      }`}
    >
      <div className="flex items-center gap-3 mb-6">
        <div
          className={`w-10 h-10 rounded-lg flex items-center justify-center ${
            isDark ? "bg-red-500/20 text-red-400" : "bg-red-100 text-red-600"
          }`}
        >
          <Lock className="w-5 h-5" />
        </div>
        <h2
          className={`text-xl font-bold ${
            isDark ? "text-white" : "text-gray-900"
          }`}
        >
          Security Settings
        </h2>
      </div>

      <form onSubmit={handleSubmit} className="space-y-4">
        {/* Current Password */}
        <div>
          <label
            className={`block text-sm font-medium mb-1.5 ${isDark ? "text-gray-300" : "text-gray-700"}`}
          >
            Current Password
          </label>
          <div className="relative">
            <input
              type={showCurrent ? "text" : "password"}
              value={currentPassword}
              onChange={(e) => setCurrentPassword(e.target.value)}
              className={`w-full px-4 py-2.5 pr-10 rounded-xl border bg-transparent focus:outline-none focus:ring-2 transition-all ${
                isDark
                  ? "bg-slate-900/50 border-red-500/20 text-white focus:ring-red-500 focus:border-red-500"
                  : "bg-white border-blue-300/50 text-gray-900 focus:ring-blue-500 focus:border-blue-500"
              } ${errors.currentPassword ? "border-red-500 focus:ring-red-500" : ""}`}
            />
            <button
              type="button"
              onClick={() => setShowCurrent(!showCurrent)}
              className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600 dark:hover:text-white"
            >
              {showCurrent ? (
                <EyeOff className="w-5 h-5" />
              ) : (
                <Eye className="w-5 h-5" />
              )}
            </button>
          </div>
          {errors.currentPassword && (
            <p className="mt-1 text-xs text-red-500">
              {errors.currentPassword}
            </p>
          )}
        </div>

        {/* New Password */}
        <div>
          <label
            className={`block text-sm font-medium mb-1.5 ${isDark ? "text-gray-300" : "text-gray-700"}`}
          >
            New Password
          </label>
          <div className="relative">
            <input
              type={showNew ? "text" : "password"}
              value={newPassword}
              onChange={(e) => setNewPassword(e.target.value)}
              className={`w-full px-4 py-2.5 pr-10 rounded-xl border bg-transparent focus:outline-none focus:ring-2 transition-all ${
                isDark
                  ? "bg-slate-900/50 border-red-500/20 text-white focus:ring-red-500 focus:border-red-500"
                  : "bg-white border-blue-300/50 text-gray-900 focus:ring-blue-500 focus:border-blue-500"
              } ${errors.newPassword ? "border-red-500 focus:ring-red-500" : ""}`}
            />
            <button
              type="button"
              onClick={() => setShowNew(!showNew)}
              className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600 dark:hover:text-white"
            >
              {showNew ? (
                <EyeOff className="w-5 h-5" />
              ) : (
                <Eye className="w-5 h-5" />
              )}
            </button>
          </div>
          {errors.newPassword && (
            <p className="mt-1 text-xs text-red-500">{errors.newPassword}</p>
          )}
        </div>

        {/* Confirm New Password */}
        <div>
          <label
            className={`block text-sm font-medium mb-1.5 ${isDark ? "text-gray-300" : "text-gray-700"}`}
          >
            Confirm New Password
          </label>
          <div className="relative">
            <input
              type={showConfirm ? "text" : "password"}
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              className={`w-full px-4 py-2.5 pr-10 rounded-xl border bg-transparent focus:outline-none focus:ring-2 transition-all ${
                isDark
                  ? "bg-slate-900/50 border-red-500/20 text-white focus:ring-red-500 focus:border-red-500"
                  : "bg-white border-blue-300/50 text-gray-900 focus:ring-blue-500 focus:border-blue-500"
              } ${errors.confirmPassword ? "border-red-500 focus:ring-red-500" : ""}`}
            />
            <button
              type="button"
              onClick={() => setShowConfirm(!showConfirm)}
              className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600 dark:hover:text-white"
            >
              {showConfirm ? (
                <EyeOff className="w-5 h-5" />
              ) : (
                <Eye className="w-5 h-5" />
              )}
            </button>
          </div>
          {errors.confirmPassword && (
            <p className="mt-1 text-xs text-red-500">
              {errors.confirmPassword}
            </p>
          )}
        </div>

        {/* Submit */}
        <div className="pt-2">
          <button
            type="submit"
            disabled={loading}
            className={`w-full px-4 py-2.5 rounded-xl font-semibold transition-all flex items-center justify-center gap-2 text-white shadow-md disabled:opacity-50 disabled:cursor-not-allowed ${
              isDark
                ? "bg-linear-to-br from-red-600 to-yellow-500 hover:shadow-lg hover:shadow-red-500/30"
                : "bg-linear-to-br from-blue-600 to-blue-500 hover:shadow-lg hover:shadow-blue-500/30"
            }`}
          >
            {loading ? (
              <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin" />
            ) : (
              <>
                <CheckCircle2 className="w-4 h-4" />
                Update Password
              </>
            )}
          </button>
        </div>
      </form>
    </motion.div>
  );
}
