export interface ITechnologiesUsed {
  icon: any;
  label: string;
}

export interface IImage {
  src: string;
  alt: string;
}

export interface IProjectLinks {
  href: string;
  label: string;
  icon: any;
}

export interface IProject {
  name: string;
  description: string;
  technologies: ITechnologiesUsed[];
  image: IImage;
  links: IProjectLinks[];
}

export interface IExperienceSettings {
  hasProjectUrls: boolean;
  projectUrl: string;
}

export interface IExperience {
  title: string;
  date: string;
  description: string;
  tags: string[];
  settings: IExperienceSettings;
}

// Data models for decoupled content (src/data/)
export type ProjectLinkType = "github-front" | "github-back" | "live";

export interface IProjectLinkData {
  href: string;
  type: ProjectLinkType;
  labelKey?: string;
}

export interface IProjectData {
  id: string;
  name?: string;
  nameKey?: string;
  translationId: string;
  technologies: ITechnologiesUsed[];
  image: string;
  links: IProjectLinkData[];
}

export interface IExperienceData {
  id: string;
  tags: string[];
  projectUrl?: string;
}
