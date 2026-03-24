import * as yup from "yup";

export const experienceDescriptionSchema = yup.object({
  description: yup
    .string()
    .max(2000, "Description must be less than 2000 characters"),
});

export type ExperienceDescriptionData = yup.InferType<
  typeof experienceDescriptionSchema
>;
