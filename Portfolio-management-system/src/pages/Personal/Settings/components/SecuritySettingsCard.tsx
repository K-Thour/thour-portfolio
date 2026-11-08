import React, { useState, useEffect, useRef, useCallback } from "react";
import { motion } from "motion/react";
import { Lock, Eye, EyeOff, ShieldCheck, Loader2 } from "lucide-react";
import { changePassword } from "../../../../services/api";
import { toast } from "../../../../components/ui/toast/toast";

export function SecuritySettingsCard() {
  const [currentPassword, setCurrentPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [loading, setLoading] = useState(false);

  const [showCurrent, setShowCurrent] = useState(false);
  const [showNew, setShowNew] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);

  const [errors, setErrors] = useState<Record<string, string>>({});
  const hasAttemptedSubmit = useRef(false);

  const validate = useCallback(() => {
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

    if (confirmPassword && newPassword !== confirmPassword) {
      newErrors.confirmPassword = "Passwords do not match";
    } else if (hasAttemptedSubmit.current && !confirmPassword) {
      newErrors.confirmPassword = "Confirm password is required";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  }, [currentPassword, newPassword, confirmPassword]);

  useEffect(() => {
    if (hasAttemptedSubmit.current || currentPassword || newPassword || confirmPassword) {
      validate();
    }
  }, [validate, currentPassword, newPassword, confirmPassword]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    hasAttemptedSubmit.current = true;
    if (!validate()) return;

    try {
      setLoading(true);
      await changePassword({ currentPassword, newPassword });
      toast({
        title: "Password Updated",
        description: "Your account credentials have been successfully updated.",
        variant: "success",
      });
      setCurrentPassword("");
      setNewPassword("");
      setConfirmPassword("");
      setErrors({});
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
      initial={{ opacity: 0, y: 16 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ type: "spring", damping: 26, stiffness: 280, delay: 0.2 }}
      className="p-6 rounded-3xl border border-border/40 bg-card/75 backdrop-blur-xl shadow-xs"
    >
      <div className="flex items-center gap-3 mb-6">
        <div className="w-11 h-11 rounded-2xl flex items-center justify-center bg-primary/10 text-primary border border-primary/20 shadow-xs">
          <Lock className="w-5 h-5" />
        </div>
        <div>
          <h2 className="text-xl font-bold tracking-tight text-foreground">
            Security & Credentials
          </h2>
          <p className="text-xs text-muted-foreground">
            Update account password and session authentication
          </p>
        </div>
      </div>

      <form onSubmit={handleSubmit} className="space-y-4">
        {/* Current Password */}
        <div>
          <label className="block text-xs font-semibold text-foreground mb-1.5">
            Current Password
          </label>
          <div className="relative">
            <input
              type={showCurrent ? "text" : "password"}
              value={currentPassword}
              onChange={(e) => setCurrentPassword(e.target.value)}
              placeholder="Enter current password"
              className={`w-full px-4 py-2.5 pr-10 rounded-xl border bg-accent/30 text-foreground placeholder:text-muted-foreground text-sm focus:outline-hidden focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all ${
                errors.currentPassword
                  ? "border-destructive focus:ring-destructive/20 focus:border-destructive"
                  : "border-border/50"
              }`}
            />
            <button
              type="button"
              onClick={() => setShowCurrent(!showCurrent)}
              aria-label={showCurrent ? "Hide current password" : "Show current password"}
              className="absolute right-3 top-1/2 -translate-y-1/2 p-1 text-muted-foreground hover:text-foreground active:scale-95 transition-all cursor-pointer"
            >
              {showCurrent ? (
                <EyeOff className="w-4 h-4" />
              ) : (
                <Eye className="w-4 h-4" />
              )}
            </button>
          </div>
          {errors.currentPassword && (
            <p className="mt-1.5 text-xs text-destructive font-medium">
              {errors.currentPassword}
            </p>
          )}
        </div>

        {/* New Password */}
        <div>
          <label className="block text-xs font-semibold text-foreground mb-1.5">
            New Password
          </label>
          <div className="relative">
            <input
              type={showNew ? "text" : "password"}
              value={newPassword}
              onChange={(e) => setNewPassword(e.target.value)}
              placeholder="At least 8 characters with symbol & number"
              className={`w-full px-4 py-2.5 pr-10 rounded-xl border bg-accent/30 text-foreground placeholder:text-muted-foreground text-sm focus:outline-hidden focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all ${
                errors.newPassword
                  ? "border-destructive focus:ring-destructive/20 focus:border-destructive"
                  : "border-border/50"
              }`}
            />
            <button
              type="button"
              onClick={() => setShowNew(!showNew)}
              aria-label={showNew ? "Hide new password" : "Show new password"}
              className="absolute right-3 top-1/2 -translate-y-1/2 p-1 text-muted-foreground hover:text-foreground active:scale-95 transition-all cursor-pointer"
            >
              {showNew ? (
                <EyeOff className="w-4 h-4" />
              ) : (
                <Eye className="w-4 h-4" />
              )}
            </button>
          </div>
          {errors.newPassword && (
            <p className="mt-1.5 text-xs text-destructive font-medium">
              {errors.newPassword}
            </p>
          )}
        </div>

        {/* Confirm New Password */}
        <div>
          <label className="block text-xs font-semibold text-foreground mb-1.5">
            Confirm New Password
          </label>
          <div className="relative">
            <input
              type={showConfirm ? "text" : "password"}
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              placeholder="Re-enter new password"
              className={`w-full px-4 py-2.5 pr-10 rounded-xl border bg-accent/30 text-foreground placeholder:text-muted-foreground text-sm focus:outline-hidden focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all ${
                errors.confirmPassword
                  ? "border-destructive focus:ring-destructive/20 focus:border-destructive"
                  : "border-border/50"
              }`}
            />
            <button
              type="button"
              onClick={() => setShowConfirm(!showConfirm)}
              aria-label={showConfirm ? "Hide confirmation password" : "Show confirmation password"}
              className="absolute right-3 top-1/2 -translate-y-1/2 p-1 text-muted-foreground hover:text-foreground active:scale-95 transition-all cursor-pointer"
            >
              {showConfirm ? (
                <EyeOff className="w-4 h-4" />
              ) : (
                <Eye className="w-4 h-4" />
              )}
            </button>
          </div>
          {errors.confirmPassword && (
            <p className="mt-1.5 text-xs text-destructive font-medium">
              {errors.confirmPassword}
            </p>
          )}
        </div>

        {/* Password Strength Guidelines */}
        <div className="p-3 rounded-2xl bg-accent/20 border border-border/30 text-xs text-muted-foreground space-y-1">
          <p className="font-semibold text-foreground">Password requirements:</p>
          <ul className="list-disc list-inside space-y-0.5 pl-1">
            <li>Minimum 8 characters</li>
            <li>At least one uppercase letter (A-Z)</li>
            <li>At least one number (0-9) and one special symbol</li>
          </ul>
        </div>

        {/* Submit Button */}
        <div className="pt-2">
          <button
            type="submit"
            disabled={loading}
            className="w-full px-4 py-2.5 rounded-xl font-semibold text-sm bg-primary hover:bg-primary/90 text-primary-foreground shadow-xs flex items-center justify-center gap-2 active:scale-[0.98] transition-all cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {loading ? (
              <>
                <Loader2 className="w-4 h-4 animate-spin" />
                <span>Updating credentials...</span>
              </>
            ) : (
              <>
                <ShieldCheck className="w-4 h-4" />
                <span>Update Password</span>
              </>
            )}
          </button>
        </div>
      </form>
    </motion.div>
  );
}
