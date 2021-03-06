import { Character, getProfessionalismCost } from "./character";
import { getMetaTypeCost } from "./meta-type";
import { getAttributesCost } from "./attributes";
import { getSkillsCost } from "./skills";
import { getCharacterQualitiesCost } from "./quality";
import { State } from "./state";
import { getCharacterGearKarmaCost, getCharacterGearNuyenCost } from "./gear";
import { getStartingKarma, Level } from "./create-options";
import { getContactsCost } from "./contact";
import { getCharacterMagicCost } from "./magic";

export type Karma = {
    total: number;
    spent: number;
    available: number;
};

export function getDefaultKarma(karmaLevel: Level): Karma {
    let total: number;
    switch (karmaLevel) {
        case Level.Street:
            total = 400;
            break;
        case Level.Normal:
            total = 500;
            break;
        case Level.Elite:
            total = 700;
            break;
    }
    const spent = 0;
    const available = total;
    return {
        total,
        spent,
        available
    };
}

export function getCharacterKarma(character: Character, state: State): Karma {
    const total = getStartingKarma(character.options.karmaLevel);
    let spent = 0;
    spent += getMetaTypeCost(character.metaType);
    spent += getCharacterQualitiesCost(character, state.allQualities);
    spent += getAttributesCost(character);
    spent += getSkillsCost(character);
    spent += getContactsCost(character);
    spent += getCharacterGearKarmaCost(getCharacterGearNuyenCost(character, state.allGear, character.options.gearLevel), character.options.nuyenLevel);
    spent += getCharacterMagicCost(character);
    spent += getProfessionalismCost(character.professionalism);
    const available = total - spent;
    return { total, spent, available };
}