import React from "react";
import { Mail, KeyRound, Lock, Eye, EyeOff } from "lucide-react";
import type { FormFieldConfig } from "../../../../components/common/form/interface/interfaces";

// Step 1: Email
export const getEmailFields = (): FormFieldConfig<{ email: string }>[] => [
  {
    name: "email",
    label: "Email Address",
    type: "email",
    placeholder: "admin@portfolio.com",
    icon: <Mail className="w-5 h-5" />,
  },
];

// Step 2: OTP
export const getOtpFields = (): FormFieldConfig<{ otp: string }>[] => [
  {
    name: "otp",
    label: "One-Time Password (OTP)",
    type: "text",
    placeholder: "123456",
    icon: <KeyRound className="w-5 h-5" />,
  },
];

// Step 3: New Password
export const getPasswordFields = (
  isDark: boolean,
  showPassword: boolean,
  setShowPassword: React.Dispatch<React.SetStateAction<boolean>>,
  showConfirmPassword: boolean,
  setShowConfirmPassword: React.Dispatch<React.SetStateAction<boolean>>,
): FormFieldConfig<{ password: string; confirmPassword: string }>[] => [
  {
    name: "password",
    label: "New Password",
    type: showPassword ? "text" : "password",
    placeholder: "••••••••",
    icon: <Lock className="w-5 h-5" />,
    rightElement: (
      <button
        type="button"
        onClick={() => setShowPassword(!showPassword)}
        aria-label={showPassword ? "Hide password" : "Show password"}
        className={`flex items-center justify-center transition-colors cursor-pointer border-none bg-transparent ${isDark ? "text-slate-500 hover:text-slate-300" : "text-slate-400 hover:text-slate-600"}`}
      >
        {showPassword ? (
          <EyeOff className="w-5 h-5" />
        ) : (
          <Eye className="w-5 h-5" />
        )}
      </button>
    ),
  },
  {
    name: "confirmPassword",
    label: "Confirm Password",
    type: showConfirmPassword ? "text" : "password",
    placeholder: "••••••••",
    icon: <Lock className="w-5 h-5" />,
    rightElement: (
      <button
        type="button"
        onClick={() => setShowConfirmPassword(!showConfirmPassword)}
        aria-label={showConfirmPassword ? "Hide password" : "Show password"}
        className={`flex items-center justify-center transition-colors cursor-pointer border-none bg-transparent ${isDark ? "text-slate-500 hover:text-slate-300" : "text-slate-400 hover:text-slate-600"}`}
      >
        {showConfirmPassword ? (
          <EyeOff className="w-5 h-5" />
        ) : (
          <Eye className="w-5 h-5" />
        )}
      </button>
    ),
  },
];
