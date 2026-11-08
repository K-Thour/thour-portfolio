/**
 * Backend API DTO Contracts and Envelope Types
 * Faithfully typed to match Backend/src/dto/index.ts and portfolio/src/services/api.ts
 */

// Standard Backend Response Envelope
export interface ApiResponse<T> {
  success: boolean;
  message?: string;
  data: T;
}

// Image Substructure
export interface ImageDTO {
  publicId?: string;
  url: string;
  alt?: string;
}

// User / Portfolio Profile
export interface PublicUser {
  _id?: string;
  name: string;
  email: string;
  phoneNumber?: string;
  image?: ImageDTO;
  experience: number;
  completedProjects: number;
  solvedProblems: number;
  happyClients: number;
  InstagramURL?: string;
  LinkedInURL?: string;
  GitHubURL?: string;
  hobbies?: string[];
  languages?: { language: string; proficiency: string }[];
  bio?: string;
  title?: string;
}

// Project Entity
export interface Project {
  _id: string;
  title: string;
  category: string;
  description: string;
  fullDescription?: string;
  image: ImageDTO;
  device?: string;
  year?: number;
  client?: string;
  role?: string;
  outcome?: string;
  workingUrl?: string;
  githubUrl?: string;
  screenshots?: string[];
  projectMetric?: string[];
  projectTestimonial?: string[];
  techStack?: string[];
  features?: string[];
  createdAt?: string;
  updatedAt?: string;
}

// Service Entity
export interface ServiceTechnology {
  _id?: string;
  name: string;
  category?: string;
  iconUrl?: string | null;
}

export interface Service {
  _id: string;
  name: string;
  title?: string;
  description: string;
  longDescription?: string;
  subtitle?: string;
  technologies: ServiceTechnology[] | string[];
  iconUrl?: ImageDTO;
  mainImageUrl?: ImageDTO;
  imagesUrl?: ImageDTO[];
  features?: string[];
  benefits?: string[];
  pricing?: string;
  duration?: string;
  deliverables?: string[];
  process?: string[];
  image?: string;
  icon?: string | null;
}

// Technology / Skill Entity
export interface Technology {
  _id: string;
  name: string;
  description?: string;
  category: string;
  iconUrl?: ImageDTO;
  proficiency?: number;
  isActive?: boolean;
}

// Education Entity
export interface Education {
  _id: string;
  level: string;
  degree?: string;
  field_of_study?: string;
  institution: string;
  startYear: string | Date;
  endYear?: string | Date;
  isPursuing?: boolean;
  grade?: string;
  gradeType?: string;
  description?: string;
}

// Experience Entity
export interface Experience {
  _id: string;
  companyName: string;
  position: string;
  field: string;
  description: string;
  dateOfJoining: string | Date;
  dateOfLeaving?: string | Date;
  stillWorking?: boolean;
  projectsCompleted?: string[];
}

// Contact Information
export interface ContactInfo {
  _id?: string;
  Address1: string;
  Address2?: string;
  startWorkingDay?: string;
  endWorkingDay?: string;
  startWorkingHour?: string;
  endWorkingHour?: string;
  isActive?: boolean;
}

// Form Submission Payloads
export interface ContactPayload {
  name: string;
  email: string;
  subject?: string;
  message: string;
}

export interface LeadPayload {
  name: string;
  email: string;
  companyName?: string;
  mobileNumber?: string;
  service?: string;
  description: string;
}

// Resume Entity
export interface Resume {
  _id: string;
  name: string;
  projectCount: number;
  serviceCount: number;
  technologyCount: number;
  projectsUsed: string[];
  servicesUsed: string[];
  technologiesUsed: string[];
  resumeUrl: string;
  resumeFormatUrl?: string;
  jobUrl?: string;
  isActive?: boolean;
}

// Conversational AI Assistant Types
export interface ChatMessage {
  role: 'user' | 'model' | 'assistant';
  content: string;
}

export interface ChatResponse {
  reply: string;
  source?: string;
}

