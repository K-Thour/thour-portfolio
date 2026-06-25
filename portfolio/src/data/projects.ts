export interface ProjectFeature {
  title: string;
  description: string;
}

export interface ProjectData {
  title: string;
  subtitle: string;
  category: { name: string; iconUrl?: string };
  description: string;
  fullDescription?: string;
  image: string;
  outcome: string;
  date: string;
  team: string;
  technologies: string[];
  link: string;
  github: string;
  challenges: ProjectFeature[];
  features: string[];
  results: string[];
}
