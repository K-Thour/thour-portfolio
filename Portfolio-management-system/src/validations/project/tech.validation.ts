import * as yup from "yup";

export const projectTechSchema = yup.object({
  technologies: yup
    .array()
    .of(yup.string().required())
    .min(1, "Add at least one technology")
    .required("Add at least one technology"),
  features: yup.array().of(yup.string().required()).min(0).default([]),
});

export type ProjectTechData = yup.InferType<typeof projectTechSchema>;
