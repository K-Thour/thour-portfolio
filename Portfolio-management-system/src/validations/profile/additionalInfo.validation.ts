import * as yup from "yup";

const urlRegex = /^https?:\/\/.+/;

export const profileAdditionalInfoSchema = yup.object({
  InstagramURL: yup
    .string()
    .transform((curr, orig) => (orig === "" ? null : curr))
    .matches(urlRegex, {
      message: "Please enter a valid URL",
      excludeEmptyString: true,
    })
    .nullable(),
  LinkedInURL: yup
    .string()
    .transform((curr, orig) => (orig === "" ? null : curr))
    .matches(urlRegex, {
      message: "Please enter a valid URL",
      excludeEmptyString: true,
    })
    .nullable(),
  GitHubURL: yup
    .string()
    .transform((curr, orig) => (orig === "" ? null : curr))
    .matches(urlRegex, {
      message: "Please enter a valid URL",
      excludeEmptyString: true,
    })
    .nullable(),
});

export type ProfileAdditionalInfoData = yup.InferType<
  typeof profileAdditionalInfoSchema
>;
