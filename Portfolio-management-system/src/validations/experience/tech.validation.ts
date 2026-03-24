import * as yup from "yup";

export const experienceTechSchema = yup.object({
  technologies: yup.array().of(yup.string()).default([]),
  features: yup.array().of(yup.string()).default([]),
});

export type ExperienceTechData = yup.InferType<typeof experienceTechSchema>;
