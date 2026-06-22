import * as yup from "yup";

export const projectBasicInfoSchema = yup.object({
  title: yup
    .string()
    .min(2, "Title must be at least 2 characters")
    .max(100, "Title must be less than 100 characters")
    .required("Title is required"),
  subtitle: yup
    .string()
    .min(2, "Subtitle must be at least 2 characters")
    .max(100, "Subtitle must be less than 100 characters")
    .required("Subtitle is required"),
  category: yup.string().required("Category is required"),
});

export type ProjectBasicInfoData = yup.InferType<typeof projectBasicInfoSchema>;
