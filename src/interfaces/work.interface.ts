export interface IWorkExperience {
    company: string;
    field: string;
    description: string;
    time: string;
    projects: Array<IWorkProject>;
}

export interface IWorkProject {
    name: string;
    period: string;
    introduction: string;
    description: string;
    stack: string;
}