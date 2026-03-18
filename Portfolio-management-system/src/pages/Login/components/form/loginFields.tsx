import React from "react";
import { Mail, Lock, Eye, EyeOff } from "lucide-react";
import type { FormFieldConfig } from "../../../../components/common/form/interface/interfaces";
import type { LoginData } from "../../../../interfaces/login/login";
import { loginEmailSchema, loginPasswordSchema } from "../../../../validations";

export const getLoginFields = (
  isDark: boolean,
  showPassword: boolean,
  setShowPassword: React.Dispatch<React.SetStateAction<boolean>>,
): FormFieldConfig<LoginData>[] => [
  {
    name: "email",
    label: "Email Address",
    type: "email",
    placeholder: "admin@portfolio.com",
    icon: <Mail className="w-5 h-5" />,
    validators: { onChangeAsync: loginEmailSchema },
  },
  {
    name: "password",
    label: "Password",
    type: showPassword ? "text" : "password",
    placeholder: "••••••••",
    icon: <Lock className="w-5 h-5" />,
    rightElement: (
      <button
        type="button"
        onClick={() => setShowPassword(!showPassword)}
        aria-label={showPassword ? "Hide password" : "Show password"}
        className={`flex items-center justify-center transition-colors cursor-pointer ${isDark ? "text-slate-500 hover:text-slate-300" : "text-slate-400 hover:text-slate-600"}`}
      >
        {showPassword ? (
          <EyeOff className="w-5 h-5" />
        ) : (
          <Eye className="w-5 h-5" />
        )}
      </button>
    ),
    validators: { onChangeAsync: loginPasswordSchema },
  },
  {
    name: "rememberMe",
    label: "Remember me",
    type: "checkbox",
    bottomRightLink: { text: "Forgot password?", href: "#" },
  },
];
