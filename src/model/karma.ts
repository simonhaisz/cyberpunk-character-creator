import { Character } from "./character";
import { getMetaTypeCost } from "./meta-type";
import { getAttributesCost } from "./attributes";
import { getSkillsCost } from "./skills";
import { getCharacterQualitiesCost } from "./quality";
import { State } from "./state";
import { getCharacterGearKarmaCost, getCharacterGearNuyenCost } from "./gear";

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

export function getCharacterKarma(karma: Karma, character: Character, state: State): Karma {
    const { total } = karma;
    let spent = 0;
    spent += getMetaTypeCost(character.metaType);
    spent += getCharacterQualitiesCost(character, state.allQualities);
    spent += getAttributesCost(character);
    spent += getSkillsCost(character);
    spent += getCharacterGearKarmaCost(getCharacterGearNuyenCost(character, state.allGear));
    const available = total - spent;
    return { total, spent, available };
}