import React, { useState } from "react";
import { motion } from "motion/react";
import type { theme } from "../../../../interfaces/common/common.interface";
import type { LoginData } from "../../../../interfaces/login/login";
import { loginSchema } from "../../../../validations";
import { getLoginFields } from "./loginFields";
import { LoginCardHeader } from "../LoginCardHeader";
import { CommonForm } from "../../../../components/common/form/CommonForm";

import { loginUser } from "../../../../services/api";
import { toast } from "../../../../components/ui/toast/toast";

export const LoginForm: React.FC<theme & { onForgotPassword?: () => void }> = ({
  theme,
  onForgotPassword,
}) => {
  const isDark = theme === "dark";
  const [showPassword, setShowPassword] = useState(false);

  const formFields = getLoginFields(
    isDark,
    showPassword,
    setShowPassword,
    onForgotPassword,
  );

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.96, y: 16 }}
      animate={{ opacity: 1, scale: 1, y: 0 }}
      exit={{ opacity: 0, scale: 0.96, y: -16 }}
      transition={{ type: "spring", damping: 26, stiffness: 300 }}
      className="w-full max-w-md z-10 relative"
    >
      <div className="relative rounded-3xl overflow-hidden bg-card/85 backdrop-blur-2xl border border-border/60 shadow-2xl p-8 transition-colors duration-300">
        <LoginCardHeader theme={theme} />

        <CommonForm<LoginData>
          defaultValues={{ email: "", password: "", rememberMe: false }}
          schema={loginSchema}
          fields={formFields}
          onSubmit={async ({ value }) => {
            try {
              const response = await loginUser(value);
              if (response && response.success && response.data?.token) {
                localStorage.setItem("token", response.data.token);
                window.location.href = "/";
              } else {
                toast({
                  title: "Login Failed",
                  description: response?.message || "Login failed",
                  variant: "destructive",
                });
              }
            } catch (error: any) {
              console.error("Login error:", error);
              toast({
                title: "Login Error",
                description: error.response?.data?.message || "Login failed",
                variant: "destructive",
              });
            }
          }}
          isDark={isDark}
          showSubmitButton={true}
          submitText="Sign In"
          buttonClassName="w-full h-11 mt-4 rounded-xl font-medium text-sm text-primary-foreground bg-primary hover:bg-primary/90 active:scale-[0.98] transition-all duration-150 shadow-sm cursor-pointer"
        />

        {/* Footer info */}
        <div className="flex justify-center pt-6 mt-6 border-t border-border/40">
          <p className="text-xs text-muted-foreground flex items-center gap-1.5">
            <span>🛡</span> End-to-end encrypted session
          </p>
        </div>
      </div>
    </motion.div>
  );
};
