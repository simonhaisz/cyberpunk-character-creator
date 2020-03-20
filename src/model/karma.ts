import { Character } from "./character";
import { getMetaTypeCost } from "./meta-type";
import { getAttributeCost } from "./attributes";
import { getActiveSkillCost } from "./skills";

export type Karma = {
    total: number;
    spent: number;
    available: number;
};

const STARTING_KARMA = 500;

export function getDefaultKarma(): Karma {
    return {
        total: STARTING_KARMA,
        spent: 0,
        available: STARTING_KARMA
    };
}

export function getCharacterKarma(karma: Karma, character: Character): Karma {
    const { total } = karma;
    let spent = 0;
    spent += getMetaTypeCost(character.metaType);
    spent += character.attributes.map(a => getAttributeCost(a.rating)).reduce((a, b) => a + b, 0);
    spent += character.activeSkills.map(s => getActiveSkillCost(s.rating)).reduce((a, b) => a + b, 0);
    spent += character.knowledgeSkills.map(s => getActiveSkillCost(s.rating)).reduce((a, b) => a + b, 0);
    spent += character.languageSkills.map(s => getActiveSkillCost(s.rating)).reduce((a, b) => a + b, 0);
    const available = total - spent;
    return { total, spent, available };
}