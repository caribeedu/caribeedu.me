import { IProfile } from './profile.interface';

export interface ITranslateOption {
    language: string;
    initials: string;
    flag: string;
    flagCountry: string;
    translation: string;
}

export interface ILabelTranslation {
    contact: string;
    aboutMe: string;
    workHistory: string;
    workDescription: string;
    workExperience: string;
    skills: string;
    skillsHelpTitle: string;
    skillsHelpMessage: string;
}

export interface ITranslation {
    labels: ILabelTranslation;
    content: IProfile;
    meta: ITranslationMetadata
}

export interface ITranslationMetadata {
    title: string;
    description: string;
}