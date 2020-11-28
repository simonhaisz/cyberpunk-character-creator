import { Skill, Character } from "./character";
import { CustomItem } from "./custom-item";

export type Skills = {
    active: CustomItem[];
    knowledge: CustomItem[];
    language: CustomItem[];
};

function getRatingSum(rating: number): number {
    let sum = 0;
    for (let i = 1; i <= rating; i++) {
        if (i === 1) {
            // first rating point costs double
            sum += 2;
        } else {
            sum += i;
        }
    }
    return sum;
}

export function getActiveSkillCost(rating: number, optionsLimited: boolean): number {
    if (optionsLimited) {
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
    } else {
        // active skills are x2
        return getRatingSum(rating) * 2;
    }
}

export function getActiveSkillsCost(activeSkills: Skill[], optionsLimited: boolean): number {
    return activeSkills.map(s => getActiveSkillCost(s.rating, optionsLimited)).reduce((a, b) => a + b, 0);
}

export function getKnowledgeSkillCost(rating: number, optionsLimited: boolean): number {
    if (optionsLimited) {
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
    } else {
        // knowledge skills are x1
        return getRatingSum(rating) * 1;
    }
}

export function getKnowledgeSkillsCost(knowledgeSkills: Skill[], optionsLimited: boolean): number {
    return knowledgeSkills.map(s => getKnowledgeSkillCost(s.rating, optionsLimited)).reduce((a, b) => a + b, 0);
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
    const optionsLimited = character.options.applyCharacterCreationLimits;
    const activeSkillCost = getActiveSkillsCost(character.activeSkills, optionsLimited);
    const knowledgeSkillCost = getKnowledgeSkillsCost(character.knowledgeSkills, optionsLimited);
    // exclude native language
    const languageSkillCost = getKnowledgeSkillsCost(character.languageSkills, optionsLimited);
    const freeKnowledgePoints = getFreeKnowledgeSkillPoints(character);
    return activeSkillCost + Math.max(knowledgeSkillCost + languageSkillCost - freeKnowledgePoints, 0);
}