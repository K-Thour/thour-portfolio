import type { ProfileData } from "../types";

export const initialProfileData: ProfileData = {
  name: "John Doe",
  email: "john.doe@portfolio.com",
  phoneNumber: "+1 (555) 123-4567",
  image: {
    type: "url",
    url: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=400",
    file: null,
  },
  experience: 5,
  completedProjects: 150,
  solvedProblems: 1000,
  happyClients: 50,
  InstagramURL: "https://instagram.com/johndoe",
  LinkedInURL: "https://linkedin.com/in/johndoe",
  GitHubURL: "https://github.com/johndoe",
  hobbies: ["Photography", "Gaming", "Reading", "Traveling", "Coding"],
  languages: [
    { name: "English", proficiency: 100 },
    { name: "Spanish", proficiency: 75 },
    { name: "French", proficiency: 50 },
  ],
};
