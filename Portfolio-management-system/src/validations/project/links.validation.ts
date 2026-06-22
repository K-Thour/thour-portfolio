import * as yup from "yup";

const githubRegex = /^https?:\/\/(www\.)?github\.com\/.+/;
const urlRegex = /^https?:\/\/.+/;

export const projectLinksSchema = yup.object({
  github: yup
    .string()
    .matches(githubRegex, "Please enter a valid GitHub repository URL")
    .required("GitHub URL is required"),
  liveUrl: yup
    .string()
    .matches(urlRegex, "Please enter a valid URL")
    .required("Live URL is required"),
});

export type ProjectLinksData = yup.InferType<typeof projectLinksSchema>;
