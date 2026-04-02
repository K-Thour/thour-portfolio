import type { ProfileFormData } from "../components/profileForm/types";

export const initialFormData = (
  initialData?: Partial<ProfileFormData>,
): ProfileFormData => ({
  name: initialData?.name || "",
  email: initialData?.email || "",
  phoneNumber: initialData?.phoneNumber || "",
  image: initialData?.image || { type: "url", url: "", file: null },
  experience: initialData?.experience || 0,
  completedProjects: initialData?.completedProjects || 0,
  solvedProblems: initialData?.solvedProblems || 0,
  happyClients: initialData?.happyClients || 0,
  InstagramURL: initialData?.InstagramURL || "",
  LinkedInURL: initialData?.LinkedInURL || "",
  GitHubURL: initialData?.GitHubURL || "",
  hobbies: initialData?.hobbies || [],
  languages: initialData?.languages || [],
});
