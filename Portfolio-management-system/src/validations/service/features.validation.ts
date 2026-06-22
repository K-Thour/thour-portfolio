import * as yup from "yup";

export const serviceFeaturesSchema = yup.object({
  features: yup
    .array()
    .of(yup.string().required())
    .min(1, "Add at least one feature")
    .required("Add at least one feature"),
  longDescription: yup.string().required("Detailed description is required"),
});

export type ServiceFeaturesData = yup.InferType<typeof serviceFeaturesSchema>;
