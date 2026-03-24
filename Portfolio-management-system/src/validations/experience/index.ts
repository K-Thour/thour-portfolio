import * as yup from "yup";
import { experienceBasicInfoSchema } from "./basicInfo.validation";
import { experienceDescriptionSchema } from "./description.validation";
import { experienceTechSchema } from "./tech.validation";
import { experienceLinksSchema } from "./links.validation";

// Full schema (combining all steps)
export const experienceSchema = yup.object({
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
  description: yup
    .string()
    .max(2000, "Description must be less than 2000 characters"),
  technologies: yup.array().of(yup.string()).default([]),
  features: yup.array().of(yup.string()).default([]),
  linkedInUrl: yup.string().url("Please enter a valid URL").nullable(),
  companyUrl: yup.string().url("Please enter a valid URL").nullable(),
});

export type ExperienceFormData = yup.InferType<typeof experienceSchema>;

export {
  experienceBasicInfoSchema,
  experienceDescriptionSchema,
  experienceTechSchema,
  experienceLinksSchema,
};
