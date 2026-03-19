import React, { useState } from "react";
import { motion } from "motion/react";
import { ArrowLeft } from "lucide-react";
import type { theme } from "../../../../interfaces/common/common.interface";
import { LoginCardHeader } from "../LoginCardHeader";
import { ForgotPasswordSteps } from "./ForgotPasswordSteps";

interface ForgotPasswordFlowProps extends theme {
  onBackToLogin: () => void;
}

export const ForgotPasswordFlow: React.FC<ForgotPasswordFlowProps> = ({
  theme,
  onBackToLogin,
}) => {
  const isDark = theme === "dark";
  const [step, setStep] = useState<1 | 2 | 3>(1);
  const [email, setEmail] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const handleEmailSubmit = async ({ value }: { value: { email: string } }) => {
    setEmail(value.email);
    console.log("Sending OTP to:", value.email);
    await new Promise((resolve) => setTimeout(resolve, 500));
    setStep(2);
  };

  const handleOtpSubmit = async ({ value }: { value: { otp: string } }) => {
    console.log("Verifying OTP:", value.otp, "for email:", email);
    await new Promise((resolve) => setTimeout(resolve, 500));
    setStep(3);
  };

  const handlePasswordSubmit = async ({
    value,
  }: {
    value: { password: string; confirmPassword: string };
  }) => {
    console.log(
      "Resetting password for:",
      email,
      "with new pass:",
      value.password,
    );
    await new Promise((resolve) => setTimeout(resolve, 500));
    onBackToLogin();
  };

  const buttonClassName = `
    w-full h-12 mt-2 rounded-xl text-white font-bold text-base transition-all duration-200 shadow-lg
    disabled:opacity-50 disabled:cursor-not-allowed
    ${
      isDark
        ? "bg-gradient-to-r from-[#ff2a00] to-[#ff9500] hover:from-[#ff3c00] hover:to-[#ffa600] shadow-red-500/25 hover:shadow-red-500/40"
        : "bg-blue-500 hover:bg-blue-600 shadow-blue-500/25 hover:shadow-blue-500/40"
    }
  `;

  return (
    <motion.div
      key="forgot-password-flow"
      initial={{ opacity: 0, y: 24 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -24 }}
      transition={{ duration: 0.7, ease: "easeOut" }}
      className="w-full max-w-md z-10 relative"
    >
      {isDark && (
        <div className="absolute -inset-1 bg-gradient-to-r from-red-600/50 to-yellow-500/50 rounded-2xl blur-lg opacity-30 pointer-events-none" />
      )}

      <div
        className={`relative rounded-2xl overflow-hidden ${
          isDark
            ? "bg-slate-900/90 border border-slate-700/60 backdrop-blur-xl shadow-2xl shadow-black/60"
            : "bg-white/95 border border-slate-200 backdrop-blur-sm shadow-xl shadow-slate-200/80"
        }`}
      >
        <div
          className={`h-1 w-full ${isDark ? "bg-gradient-to-r from-red-600 to-yellow-500" : "bg-gradient-to-r from-blue-500 to-blue-400"}`}
        />

        <div className="px-8 pt-8 pb-4">
          <LoginCardHeader theme={theme} />

          <ForgotPasswordSteps
            step={step}
            isDark={isDark}
            email={email}
            showPassword={showPassword}
            setShowPassword={setShowPassword}
            showConfirmPassword={showConfirmPassword}
            setShowConfirmPassword={setShowConfirmPassword}
            handleEmailSubmit={handleEmailSubmit}
            handleOtpSubmit={handleOtpSubmit}
            handlePasswordSubmit={handlePasswordSubmit}
            buttonClassName={buttonClassName}
          />
        </div>

        <div className="flex justify-center px-8 py-4 border-t border-slate-700/30">
          <button
            onClick={onBackToLogin}
            className={`flex items-center gap-2 text-sm font-semibold transition-colors bg-transparent border-none cursor-pointer ${isDark ? "text-slate-400 hover:text-white" : "text-slate-500 hover:text-slate-900"}`}
          >
            <ArrowLeft className="w-4 h-4" />
            Back to Login
          </button>
        </div>
      </div>
    </motion.div>
  );
};
