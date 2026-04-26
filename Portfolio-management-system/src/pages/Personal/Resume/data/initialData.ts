import type { Resume, ResumeFormData } from "../types";

export const sampleResumes: Resume[] = [
  {
    id: "1",
    name: "Software Engineer Resume",
    description:
      "A professional resume tailored for software engineering positions with focus on full-stack development",
    jobLink: "https://example.com/job/software-engineer",
    designType: "pdf",
    status: "completed",
    createdAt: "2024-01-15T10:30:00Z",
    updatedAt: "2024-01-15T10:35:00Z",
    generatedFileUrl: "#",
  },
  {
    id: "2",
    name: "Product Manager Resume",
    description:
      "Resume highlighting product management experience and agile methodology expertise",
    jobLink: "https://example.com/job/product-manager",
    designType: "image",
    status: "completed",
    createdAt: "2024-01-10T14:20:00Z",
    updatedAt: "2024-01-10T14:25:00Z",
    generatedFileUrl: "#",
  },
];

export const initialFormData: ResumeFormData = {
  name: "",
  description: "",
  jobLink: "",
  designType: null,
  designFile: undefined,
  designUrl: "",
  latexCode: "",
};
