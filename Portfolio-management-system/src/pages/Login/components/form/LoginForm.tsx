import React, { useState } from "react";
import { motion } from "motion/react";
import type { theme } from "../../../../interfaces/common/common.interface";
import type { LoginData } from "../../../../interfaces/login/login";
import { loginSchema } from "../../../../validations";
import { getLoginFields } from "./loginFields";
import { LoginCardHeader } from "../LoginCardHeader";
import { CommonForm } from "../../../../components/common/form/CommonForm";

export const LoginForm: React.FC<theme> = ({ theme }) => {
  const isDark = theme === "dark";
  const [showPassword, setShowPassword] = useState(false);

  const formFields = getLoginFields(isDark, showPassword, setShowPassword);

  return (
    <motion.div
      initial={{ opacity: 0, y: 24 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.7, ease: "easeOut" }}
      className="w-full max-w-md z-10 relative"
    >
      {/* Dark glow ring */}
      {isDark && (
        <div className="absolute -inset-1 bg-gradient-to-r from-red-600/50 to-yellow-500/50 rounded-2xl blur-lg opacity-30 pointer-events-none" />
      )}

      <div
        className={`
        relative rounded-2xl overflow-hidden
        ${
          isDark
            ? "bg-slate-900/90 border border-slate-700/60 backdrop-blur-xl shadow-2xl shadow-black/60"
            : "bg-white/95 border border-slate-200 backdrop-blur-sm shadow-xl shadow-slate-200/80"
        }
      `}
      >
        {/* Top accent bar */}
        <div
          className={`h-1 w-full ${isDark ? "bg-gradient-to-r from-red-600 to-yellow-500" : "bg-gradient-to-r from-blue-500 to-blue-400"}`}
        />

        <div className="px-8 pt-8 pb-4">
          <LoginCardHeader theme={theme} />

          <CommonForm<LoginData>
            defaultValues={{ email: "", password: "", rememberMe: false }}
            schema={loginSchema}
            fields={formFields}
            onSubmit={async ({ value }) => {
              console.log("Login attempt:", value);
            }}
            isDark={isDark}
            showSubmitButton={true}
            submitText={
              isDark ? "Enter Mission Control" : "Enter Command Center"
            }
            buttonClassName={`
              w-full h-12 mt-2 rounded-xl text-white font-bold text-base transition-all duration-200 shadow-lg
              disabled:opacity-50 disabled:cursor-not-allowed
              ${
                isDark
                  ? "bg-gradient-to-r from-[#ff2a00] to-[#ff9500] hover:from-[#ff3c00] hover:to-[#ffa600] shadow-red-500/25 hover:shadow-red-500/40"
                  : "bg-blue-500 hover:bg-blue-600 shadow-blue-500/25 hover:shadow-blue-500/40"
              }
            `}
          />
        </div>

        {/* Footer */}
        <div className="flex justify-center px-8 py-4">
          <p
            className={`text-xs ${isDark ? "text-slate-600" : "text-slate-400"}`}
          >
            {isDark
              ? "🛡 Secure access for authorized personnel only"
              : "Protected by the ancient runes"}
          </p>
        </div>
      </div>
    </motion.div>
  );
};
