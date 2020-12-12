import { getNaturalAttributeRating } from "./attributes";
import { Skill, Character } from "./character";
import { CustomItem } from "./custom-item";

export type Skills = {
    active: CustomItem[];
    knowledge: CustomItem[];
    language: CustomItem[];
};

export function getActiveSkillCost(rating: number): number {
    switch (rating) {
        case -1:
            return 0;
        case 1:
            return 5;
        case 3:
            return 15;
        case 5:
            return 30;
        case 7:
            return 60;
        default:
            throw new Error(`Unsupported skill rating ${rating}`);
    }
}

export function getActiveSkillsCost(activeSkills: Skill[]): number {
    return activeSkills.map(s => getActiveSkillCost(s.rating)).reduce((a, b) => a + b, 0);
}

export function getKnowledgeSkillCost(rating: number): number {
    switch (rating) {
        case -1:
            return 0;
        case 1:
            return 2;
        case 3:
            return 7;
        case 5:
            return 15;
        case 7:
            return 30;
        default:
            throw new Error(`Unsupported skill rating ${rating}`);
    }
}

export function getKnowledgeSkillsCost(knowledgeSkills: Skill[]): number {
    return knowledgeSkills.map(s => getKnowledgeSkillCost(s.rating)).reduce((a, b) => a + b, 0);
}

export function getFreeKnowledgeSkillPoints(character: Character): number {
    const intuition = getNaturalAttributeRating(character, "Intuition");
    const logic = getNaturalAttributeRating(character, "Logic");
    return (intuition + logic) * 10;
}

export function getSkillsCost(character: Character): number {
    const activeSkillCost = getActiveSkillsCost(character.activeSkills);
    const knowledgeSkillCost = getKnowledgeSkillsCost(character.knowledgeSkills);
    // exclude native language
    const languageSkillCost = getKnowledgeSkillsCost(character.languageSkills);
    const freeKnowledgePoints = getFreeKnowledgeSkillPoints(character);
    return activeSkillCost + Math.max(knowledgeSkillCost + languageSkillCost - freeKnowledgePoints, 0);
}