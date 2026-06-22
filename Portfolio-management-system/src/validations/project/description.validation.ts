import * as yup from "yup";

export const projectDescriptionSchema = yup.object({
  description: yup.string().required("Short description is required"),
  longDescription: yup.string().required("Long description is required"),
});

export type ProjectDescriptionData = yup.InferType<
  typeof projectDescriptionSchema
>;
