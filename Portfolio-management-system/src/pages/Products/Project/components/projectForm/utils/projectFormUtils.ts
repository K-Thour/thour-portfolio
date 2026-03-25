import type { Project, ProjectFormData } from "../../types";

export const getProjectFormData = (initialData?: Project): ProjectFormData => ({
  title: initialData?.title || "",
  subtitle: initialData?.subtitle || "",
  category: initialData?.category || "",
  description: initialData?.description || "",
  longDescription: initialData?.longDescription || "",
  image: initialData?.image || "",
  technologies: initialData?.technologies || [],
  features: initialData?.features || [],
  github: initialData?.github || "",
  liveUrl: initialData?.liveUrl || "",
  status: initialData?.status || "In Progress",
});

export const PROJECT_STEPS = [
  { id: 1, title: "Basic Info", description: "Project details" },
  { id: 2, title: "Description", description: "Project description" },
  { id: 3, title: "Tech & Features", description: "Stack & features" },
  { id: 4, title: "Links", description: "URLs & status" },
];

export const PROJECT_CATEGORIES = [
  "AI & Automation",
  "Web Application",
  "Mobile App",
  "DevOps & Monitoring",
  "E-commerce",
];

export const PROJECT_STATUSES = [
  "In Progress",
  "Completed",
  "On Hold",
] as const;
