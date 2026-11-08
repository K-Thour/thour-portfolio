import React, { useState } from "react";
import { motion } from "motion/react";
import { ArrowLeft } from "lucide-react";
import type { theme } from "../../../../interfaces/common/common.interface";
import { LoginCardHeader } from "../LoginCardHeader";
import { ForgotPasswordSteps } from "./ForgotPasswordSteps";
import {
  forgotPassword,
  verifyOtp,
  resetPassword,
} from "../../../../services/api";
import { useToast } from "../../../../hooks/useToast";

interface ForgotPasswordFlowProps extends theme {
  onBackToLogin: () => void;
}

export const ForgotPasswordFlow: React.FC<ForgotPasswordFlowProps> = ({
  theme,
  onBackToLogin,
}) => {
  const isDark = theme === "dark";
  const { toast } = useToast();
  const [step, setStep] = useState<1 | 2 | 3>(1);
  const [email, setEmail] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const [resetToken, setResetToken] = useState("");

  const handleEmailSubmit = async ({ value }: { value: { email: string } }) => {
    try {
      setEmail(value.email);
      await forgotPassword({ email: value.email });
      toast({
        title: "OTP Sent",
        description: "OTP sent to your email successfully.",
        variant: "success",
      });
      setStep(2);
    } catch (err: any) {
      toast({
        title: "Error",
        description: err.response?.data?.message || "Failed to send OTP.",
        variant: "destructive",
      });
    }
  };

  const handleOtpSubmit = async ({ value }: { value: { otp: string } }) => {
    try {
      const data = await verifyOtp({ email, otp: value.otp });
      setResetToken(data.resetToken);
      toast({
        title: "OTP Verified",
        description: "OTP verified successfully.",
        variant: "success",
      });
      setStep(3);
    } catch (err: any) {
      toast({
        title: "Error",
        description: err.response?.data?.message || "Invalid or expired OTP.",
        variant: "destructive",
      });
    }
  };

  const handlePasswordSubmit = async ({
    value,
  }: {
    value: { password: string; confirmPassword: string };
  }) => {
    try {
      await resetPassword({
        email,
        resetToken,
        password: value.password,
      });
      toast({
        title: "Success",
        description:
          "Password reset successfully. Please login with your new password.",
        variant: "success",
      });
      onBackToLogin();
    } catch (err: any) {
      toast({
        title: "Error",
        description: err.response?.data?.message || "Failed to reset password.",
        variant: "destructive",
      });
    }
  };

  const buttonClassName =
    "w-full h-11 mt-4 rounded-xl font-medium text-sm text-primary-foreground bg-primary hover:bg-primary/90 active:scale-[0.98] transition-all duration-150 shadow-sm cursor-pointer";

  return (
    <motion.div
      key="forgot-password-flow"
      initial={{ opacity: 0, scale: 0.96, y: 16 }}
      animate={{ opacity: 1, scale: 1, y: 0 }}
      exit={{ opacity: 0, scale: 0.96, y: -16 }}
      transition={{ type: "spring", damping: 26, stiffness: 300 }}
      className="w-full max-w-md z-10 relative"
    >
      <div className="relative rounded-3xl overflow-hidden bg-card/85 backdrop-blur-2xl border border-border/60 shadow-2xl p-8 transition-colors duration-300">
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

        <div className="flex justify-center pt-6 mt-6 border-t border-border/40">
          <button
            onClick={onBackToLogin}
            type="button"
            className="flex items-center gap-2 text-sm font-medium text-muted-foreground hover:text-foreground transition-colors bg-transparent border-none cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary/50 rounded-lg px-2 py-1"
          >
            <ArrowLeft className="w-4 h-4" />
            Back to Login
          </button>
        </div>
      </div>
    </motion.div>
  );
};
