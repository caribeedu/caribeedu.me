import { ISkillCategory } from "./skill.interface";
import { IWorkExperience } from "./work.interface";

export interface IProfile {
    name: string;
    photo: string;
    title: string;
    phrase: string;
    links: IProfileLinks;
    description: string;
    skills: Array<ISkillCategory>;
    works: Array<IWorkExperience>;
}

export interface IProfileLinks {
    github: string;
    linkedin: string;
    hackerrank: string;
    contact: string;
}