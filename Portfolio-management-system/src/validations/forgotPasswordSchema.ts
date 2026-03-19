import * as yup from "yup";
import { loginEmailSchema, loginPasswordSchema } from "./loginSchema";

export const otpSchema = yup
  .string()
  .length(6, "OTP must be exactly 6 characters")
  .required("OTP is required");

// Step 1
export const forgotPasswordEmailSchema = yup.object({
  email: loginEmailSchema,
});

// Step 2
export const forgotPasswordOtpSchema = yup.object({
  otp: otpSchema,
});

// Step 3
export const resetPasswordSchema = yup.object({
  password: loginPasswordSchema,
  confirmPassword: yup
    .string()
    .oneOf([yup.ref("password")], "Passwords must match")
    .required("Confirm Password is required"),
});
