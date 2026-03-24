import type { Experience } from "../components/experienceCard/ExperienceCard";
import type { ExperienceFormData } from "../../../../validations/experienceSchema";

// Sample data - in real app, this would come from API/Redux store
export const sampleExperiences: Experience[] = [
  {
    id: "1",
    jobTitle: "Senior Full Stack Developer",
    company: "Tech Giants Inc.",
    location: "San Francisco, CA",
    startDate: "2021",
    endDate: null,
    isCurrent: true,
    employmentType: "Full-time",
    achievements: [
      "Led development of enterprise-scale applications",
      "Mentored junior developers and conducted code reviews",
      "Implemented CI/CD pipelines and DevOps practices",
    ],
    technologies: ["React", "Node.js", "AWS", "Docker", "Kubernetes"],
  },
  {
    id: "2",
    jobTitle: "Full Stack Developer",
    company: "StartupCo",
    location: "New York, NY",
    startDate: "2019",
    endDate: "2021",
    isCurrent: false,
    employmentType: "Full-time",
    achievements: [
      "Built and maintained multiple web applications",
      "Collaborated with cross-functional teams",
      "Optimized application performance by 40%",
    ],
    technologies: ["Vue.js", "Python", "PostgreSQL", "Redis"],
  },
  {
    id: "3",
    jobTitle: "Junior Developer",
    company: "Code Academy",
    location: "Boston, MA",
    startDate: "2017",
    endDate: "2019",
    isCurrent: false,
    employmentType: "Full-time",
    achievements: [
      "Developed responsive frontend interfaces",
      "Assisted in backend API development",
      "Participated in agile development processes",
    ],
    technologies: ["JavaScript", "HTML", "CSS", "PHP"],
  },
];

// Convert Experience to ExperienceFormData format
export const experienceToFormData = (exp: Experience): ExperienceFormData => ({
  jobTitle: exp.jobTitle,
  company: exp.company,
  location: exp.location,
  startDate: exp.startDate,
  endDate: exp.endDate,
  isCurrent: exp.isCurrent,
  description: "",
  technologies: [],
  features: exp.achievements || [],
  linkedInUrl: null,
  companyUrl: null,
});
