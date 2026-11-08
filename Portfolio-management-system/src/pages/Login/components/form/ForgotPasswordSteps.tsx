import React from "react";
import { motion } from "motion/react";
import { CommonForm } from "../../../../components/common/form/CommonForm";
import {
  forgotPasswordEmailSchema,
  forgotPasswordOtpSchema,
  resetPasswordSchema,
} from "../../../../validations";
import {
  getEmailFields,
  getOtpFields,
  getPasswordFields,
} from "./ForgotPasswordFields";

interface ForgotPasswordStepsProps {
  step: 1 | 2 | 3;
  isDark: boolean;
  email: string;
  showPassword: boolean;
  setShowPassword: React.Dispatch<React.SetStateAction<boolean>>;
  showConfirmPassword: boolean;
  setShowConfirmPassword: React.Dispatch<React.SetStateAction<boolean>>;
  handleEmailSubmit: (v: { value: { email: string } }) => Promise<void>;
  handleOtpSubmit: (v: { value: { otp: string } }) => Promise<void>;
  handlePasswordSubmit: (v: {
    value: { password: string; confirmPassword: string };
  }) => Promise<void>;
  buttonClassName: string;
}

export const ForgotPasswordSteps: React.FC<ForgotPasswordStepsProps> = ({
  step,
  isDark,
  email,
  showPassword,
  setShowPassword,
  showConfirmPassword,
  setShowConfirmPassword,
  handleEmailSubmit,
  handleOtpSubmit,
  handlePasswordSubmit,
  buttonClassName,
}) => {
  return (
    <>
      <div className="mb-6 text-center">
        {step === 1 && (
          <p className="text-sm text-muted-foreground">
            Enter your email address to receive an OTP.
          </p>
        )}
        {step === 2 && (
          <p className="text-sm text-muted-foreground">
            Enter the 6-digit OTP sent to{" "}
            <span className="font-semibold text-foreground">{email}</span>.
          </p>
        )}
        {step === 3 && (
          <p className="text-sm text-muted-foreground">
            Enter your new password below.
          </p>
        )}
      </div>

      <motion.div
        key={`step-${step}`}
        initial={{ opacity: 0, x: 16 }}
        animate={{ opacity: 1, x: 0 }}
        exit={{ opacity: 0, x: -16 }}
        transition={{ type: "spring", damping: 25, stiffness: 280 }}
      >
        {step === 1 && (
          <CommonForm<{ email: string }>
            defaultValues={{ email: "" }}
            schema={forgotPasswordEmailSchema}
            fields={getEmailFields()}
            onSubmit={handleEmailSubmit}
            isDark={isDark}
            showSubmitButton={true}
            submitText="Send OTP"
            buttonClassName={buttonClassName}
          />
        )}
        {step === 2 && (
          <CommonForm<{ otp: string }>
            defaultValues={{ otp: "" }}
            schema={forgotPasswordOtpSchema}
            fields={getOtpFields()}
            onSubmit={handleOtpSubmit}
            isDark={isDark}
            showSubmitButton={true}
            submitText="Verify OTP"
            buttonClassName={buttonClassName}
          />
        )}
        {step === 3 && (
          <CommonForm<{ password: string; confirmPassword: string }>
            defaultValues={{ password: "", confirmPassword: "" }}
            schema={resetPasswordSchema}
            fields={getPasswordFields(
              isDark,
              showPassword,
              setShowPassword,
              showConfirmPassword,
              setShowConfirmPassword,
            )}
            onSubmit={handlePasswordSubmit}
            isDark={isDark}
            showSubmitButton={true}
            submitText="Reset Password"
            buttonClassName={buttonClassName}
          />
        )}
      </motion.div>
    </>
  );
};
