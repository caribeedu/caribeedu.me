import { ESkillCategoryItemLevel } from "../enums";

export interface ISkillCategory {
    category: string;
    items: Array<ISkillCategoryItem>;
}

export interface ISkillCategoryItem {
    name: string;
    level: ESkillCategoryItemLevel;
    exp: string;
}