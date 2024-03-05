export interface ITechnologiesUsed {
    icon: any,
    label: string
}

export interface IImage {
    src: string
    alt: string
}

export interface IProjectLinks {
    href: string
    label: string
    icon: any
}

export interface IProject {
    name: string;
    description: string;
    technologies: ITechnologiesUsed[];
    image: IImage;
    links: IProjectLinks[];
};
