import * as yup from "yup";

export const profileBasicInfoSchema = yup.object({
  name: yup
    .string()
    .min(2, "Name must be at least 2 characters")
    .max(100, "Name must be less than 100 characters")
    .required("Name is required"),
  email: yup
    .string()
    .email("Invalid email format")
    .required("Email is required"),
  phoneNumber: yup.string().required("Phone number is required"),
});

export type ProfileBasicInfoData = yup.InferType<typeof profileBasicInfoSchema>;
