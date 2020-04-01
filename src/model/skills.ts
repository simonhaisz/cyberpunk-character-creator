import { Skill, Character } from "./character";
import { Item } from "./custom-item";

export type Skills = {
    active: Item[];
    knowledge: Item[];
    language: Item[];
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
        default:
            throw new Error(`Unsupported skill rating ${rating}`);
    }
}

export function getActiveSkillsCost(activeSkills: Skill[]): number {
    return activeSkills.map(s => getActiveSkillCost(s.rating)).reduce((a, b) => a + b, 0);
}

export function getKnowledgeSkillCost(rating: number): number {
    switch (rating) {
        case 1:
            return 2;
        case 3:
            return 7;
        case 5:
            return 15;
        default:
            throw new Error(`Unsupported skill rating ${rating}`);
    }
}

export function getKnowledgeSkillsCost(knowledgeSkills: Skill[]): number {
    return knowledgeSkills.map(s => getKnowledgeSkillCost(s.rating)).reduce((a, b) => a + b, 0);
}

export function getFreeKnowledgeSkillPoints(character: Character): number {
    const intuition = character.attributes.find(a => a.name === "Intuition");
    if (intuition === undefined) {
        throw new Error(`Character '${character.streetName}' has no attribute 'Intuition'`);
    }
    const logic = character.attributes.find(a => a.name === "Logic");
    if (logic === undefined) {
        throw new Error(`Character '${character.streetName}' has no attribute 'Logic'`);
    }
    return (intuition.rating + logic.rating) * 10;
}

export function getSkillsCost(character: Character): number {
    const activeSkillCost = getActiveSkillsCost(character.activeSkills);
    const knowledgeSkillCost = getKnowledgeSkillsCost(character.knowledgeSkills);
    // exclude native language
    const languageSkillCost = getKnowledgeSkillsCost(character.languageSkills);
    const freeKnowledgePoints = getFreeKnowledgeSkillPoints(character);
    return activeSkillCost + Math.max(knowledgeSkillCost + languageSkillCost - freeKnowledgePoints, 0);
}