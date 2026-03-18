import * as yup from "yup";

// Per-field schemas (used as field-level validators in CommonForm)
export const loginEmailSchema = yup
  .string()
  .email("Please enter a valid email address")
  .required("Email address is required");

export const loginPasswordSchema = yup
  .string()
  .min(8, "Password must be at least 8 characters")
  .matches(/[A-Z]/, "Password must contain at least one uppercase letter")
  .matches(/[0-9]/, "Password must contain at least one number")
  .matches(
    /[!@#$%^&*(),.?":{}|<>_~-]/,
    "Password must contain at least one special character",
  )
  .required("Password is required");

// Full object schema (used for whole-form validation)
export const loginSchema = yup.object({
  email: loginEmailSchema,
  password: loginPasswordSchema,
  rememberMe: yup.boolean().required(),
});

export type LoginFormData = yup.InferType<typeof loginSchema>;
