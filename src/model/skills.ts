import { Skill, Character } from "./character";

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

export function getKnowledgeSkillCost(skill: Skill): number {
    switch (skill.rating) {
        case 1:
            return 2;
        case 3:
            return 7;
        case 5:
            return 15;
        default:
            throw new Error(`Unsupported skill rating ${skill.rating} for skill ${skill.name}`);
    }
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
    const activeSkillCost = character.activeSkills.map(s => getActiveSkillCost(s.rating)).reduce((a, b) => a + b, 0);
    const knowledgeSkillCost = character.knowledgeSkills.map(s => getKnowledgeSkillCost(s)).reduce((a, b) => a + b, 0);
    // exclude native language
    const languageSkillCost = character.languageSkills.filter(s => s.rating < 6).map(s => getKnowledgeSkillCost(s)).reduce((a, b) => a + b, 0);
    const freeKnowledgePoints = getFreeKnowledgeSkillPoints(character);
    return activeSkillCost + Math.max(knowledgeSkillCost + languageSkillCost - freeKnowledgePoints, 0);
}