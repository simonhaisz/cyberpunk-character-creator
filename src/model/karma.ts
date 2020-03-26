import { Character } from "./character";
import { getMetaTypeCost } from "./meta-type";
import { getAttributesCost } from "./attributes";
import { getSkillsCost } from "./skills";
import { getQualitiesCost } from "./quality";

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
    spent += getQualitiesCost(character.qualities);
    spent += getAttributesCost(character);
    spent += getSkillsCost(character);
    const available = total - spent;
    return { total, spent, available };
}