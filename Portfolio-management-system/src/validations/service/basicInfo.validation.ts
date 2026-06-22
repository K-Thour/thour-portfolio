import * as yup from "yup";

export const serviceBasicInfoSchema = yup.object({
  title: yup.string().required("Service title is required"),
  subtitle: yup.string().required("Subtitle is required"),
  category: yup.string().required("Category is required"),
  description: yup.string().required("Short description is required"),
});

export type ServiceBasicInfoData = yup.InferType<typeof serviceBasicInfoSchema>;
