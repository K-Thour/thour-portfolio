import {
  EDeviceType,
  EEducationType,
  EGradeType,
  ESchoolBoard,
  EStream,
  EDay,
} from '../interface/common/common.enum';

// Image Data Sub-structure DTO
export interface ImageDTO {
  publicId: string;
  url: string;
  alt?: string;
}

// ─── Project DTO ──────────────────────────────────────────────────────────────
export interface CreateProjectDTO {
  title: string;
  category: string;
  description: string;
  image: ImageDTO;
  device: EDeviceType;
  year: number;
  client: string;
  fullDescription: string;
  role: string;
  outcome: string;
  workingUrl: string;
  githubUrl: string;
  screenshots: string[];
  projectMetric: string[];
  projectTestimonial: string[];
  techStack: string[];
}

export type UpdateProjectDTO = Partial<CreateProjectDTO>;

// ─── Service DTO ──────────────────────────────────────────────────────────────
export interface CreateServiceDTO {
  name: string;
  decription: string;
  technologies: string[];
  iconUrl: ImageDTO;
  mainImageUrl: ImageDTO;
  imagesUrl: ImageDTO[];
}

export type UpdateServiceDTO = Partial<CreateServiceDTO>;

// ─── Technology DTO ───────────────────────────────────────────────────────────
export interface CreateTechnologyDTO {
  name: string;
  description: string;
  category: string;
  iconUrl: ImageDTO;
  isActive?: boolean;
}

export type UpdateTechnologyDTO = Partial<CreateTechnologyDTO>;

// ─── Education DTO ────────────────────────────────────────────────────────────
export interface CreateEducationDTO {
  level: EEducationType;
  degree?: string;
  field_of_study?: string;
  stream?: EStream;
  institution: string;
  board?: ESchoolBoard;
  startYear: Date | string;
  isPursuing?: boolean;
  endYear?: Date | string;
  gradeType: EGradeType;
  grade?: string;
  description?: string;
}

export type UpdateEducationDTO = Partial<CreateEducationDTO>;

// ─── Experience DTO ───────────────────────────────────────────────────────────
export interface CreateExperienceDTO {
  companyName: string;
  position: string;
  field: string;
  projectsCompleted?: string[];
  description: string;
  dateOfJoining: Date | string;
  dateOfLeaving?: Date | string;
  stillWorking?: boolean;
}

export type UpdateExperienceDTO = Partial<CreateExperienceDTO>;

// ─── Contact DTO ──────────────────────────────────────────────────────────────
export interface CreateContactDTO {
  Address1: string;
  Address2?: string;
  startWorkingDay: EDay;
  endWorkingDay: EDay;
  startWorkingHour: string;
  endWorkingHour: string;
  isActive?: boolean;
}

export type UpdateContactDTO = Partial<CreateContactDTO>;

// ─── Lead DTO ─────────────────────────────────────────────────────────────────
export interface CreateLeadDTO {
  name: string;
  email: string;
  companyName?: string;
  mobileNumber?: string;
  service?: string;
  description: string;
}

export type UpdateLeadDTO = Partial<CreateLeadDTO>;

// ─── Resume DTO ───────────────────────────────────────────────────────────────
export interface CreateResumeDTO {
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

export type UpdateResumeDTO = Partial<CreateResumeDTO>;

// ─── User DTO ─────────────────────────────────────────────────────────────────
export interface RegisterUserDTO {
  name: string;
  email: string;
  password?: string;
  phoneNumber: string;
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
}

export interface LoginUserDTO {
  email: string;
  password?: string;
}

export type UpdateUserDTO = Partial<Omit<RegisterUserDTO, 'password'>>;

export interface PublicUserDTO {
  name: string;
  email: string;
  phoneNumber: string;
  image?: ImageDTO;
  experience: number;
  completedProjects: number;
  solvedProblems: number;
  happyClients: number;
  InstagramURL?: string;
  LinkedInURL?: string;
  GitHubURL?: string;
  hobbies: string[];
  languages: { language: string; proficiency: string }[];
}
