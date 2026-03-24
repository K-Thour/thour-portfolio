import * as yup from "yup";

export const experienceLinksSchema = yup.object({
  linkedInUrl: yup.string().url("Please enter a valid URL").nullable(),
  companyUrl: yup.string().url("Please enter a valid URL").nullable(),
});

export type ExperienceLinksData = yup.InferType<typeof experienceLinksSchema>;
