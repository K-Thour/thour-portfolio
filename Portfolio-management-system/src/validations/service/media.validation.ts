import * as yup from "yup";

const urlRegex = /^https?:\/\/.+/;

export const serviceMediaSchema = yup.object({
  photoType: yup.string().oneOf(["url", "upload"]).required(),
  photoUrl: yup.string().when("photoType", {
    is: "url",
    then: (schema) =>
      schema
        .matches(urlRegex, "Please enter a valid URL")
        .required("Photo URL is required"),
    otherwise: (schema) => schema.notRequired(),
  }),
  photoFile: yup.string().when("photoType", {
    is: "upload",
    then: (schema) => schema.required("Please upload a photo"),
    otherwise: (schema) => schema.notRequired().nullable(),
  }),
  iconType: yup.string().oneOf(["url", "upload", "emoji"]).required(),
  iconUrl: yup.string().when("iconType", {
    is: "url",
    then: (schema) =>
      schema
        .matches(urlRegex, "Please enter a valid URL")
        .required("Icon URL is required"),
    otherwise: (schema) => schema.notRequired(),
  }),
  iconFile: yup.string().when("iconType", {
    is: "upload",
    then: (schema) => schema.required("Please upload an icon"),
    otherwise: (schema) => schema.notRequired().nullable(),
  }),
});

export type ServiceMediaData = yup.InferType<typeof serviceMediaSchema>;
