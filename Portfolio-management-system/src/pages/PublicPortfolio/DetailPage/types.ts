export interface ProjectFeature {
  title: string;
  description: string;
}

export interface ProjectData {
  id: number;
  title: string;
  subtitle: string;
  category: string;
  description: string;
  image: string;
  status: string;
  date: string;
  team: string;
  technologies: string[];
  link: string;
  github: string;
  challenges: ProjectFeature[];
  features: string[];
  results: string[];
}

export interface ProjectHeaderProps {
  project: ProjectData;
  isInView: boolean;
}

export interface ProjectFeaturesProps {
  project: ProjectData;
  isInView: boolean;
}
