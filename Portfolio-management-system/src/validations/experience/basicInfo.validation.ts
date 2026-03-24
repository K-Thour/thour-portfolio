import * as yup from "yup";

export const experienceBasicInfoSchema = yup.object({
  jobTitle: yup
    .string()
    .min(2, "Job title must be at least 2 characters")
    .max(100, "Job title must be less than 100 characters")
    .required("Job title is required"),
  company: yup
    .string()
    .min(2, "Company name must be at least 2 characters")
    .max(100, "Company name must be less than 100 characters")
    .required("Company name is required"),
  location: yup
    .string()
    .min(2, "Location must be at least 2 characters")
    .max(100, "Location must be less than 100 characters")
    .required("Location is required"),
  startDate: yup.string().required("Start date is required"),
  endDate: yup.string().nullable(),
  isCurrent: yup.boolean().required(),
});

export type ExperienceBasicInfoData = yup.InferType<
  typeof experienceBasicInfoSchema
>;
