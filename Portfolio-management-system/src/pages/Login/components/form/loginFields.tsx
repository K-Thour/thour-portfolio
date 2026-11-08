import React from "react";
import { Mail, Lock, Eye, EyeOff } from "lucide-react";
import type { FormFieldConfig } from "../../../../components/common/form/interface/interfaces";
import type { LoginData } from "../../../../interfaces/login/login";
import { loginEmailSchema, loginPasswordSchema } from "../../../../validations";

export const getLoginFields = (
  _isDark: boolean,
  showPassword: boolean,
  setShowPassword: React.Dispatch<React.SetStateAction<boolean>>,
  onForgotPassword?: () => void,
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
        className="flex items-center justify-center transition-colors cursor-pointer text-muted-foreground hover:text-foreground border-none bg-transparent"
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
    bottomRightLink: {
      text: "Forgot password?",
      onClick: (e) => {
        e.preventDefault();
        onForgotPassword?.();
      },
    },
  },
];
