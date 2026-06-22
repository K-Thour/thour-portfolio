import * as yup from "yup";

export const profileStatisticsSchema = yup.object({
  experience: yup
    .number()
    .typeError("Must be a number")
    .min(0, "Experience cannot be negative")
    .required("Experience is required"),
  completedProjects: yup
    .number()
    .typeError("Must be a number")
    .min(0, "Projects cannot be negative")
    .required("Completed projects count is required"),
  solvedProblems: yup
    .number()
    .typeError("Must be a number")
    .min(0, "Problems cannot be negative")
    .required("Solved problems count is required"),
  happyClients: yup
    .number()
    .typeError("Must be a number")
    .min(0, "Clients cannot be negative")
    .required("Happy clients count is required"),
});

export type ProfileStatisticsData = yup.InferType<
  typeof profileStatisticsSchema
>;
