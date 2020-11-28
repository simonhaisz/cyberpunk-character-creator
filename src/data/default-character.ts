import { Character, MetaType } from "../model/character";
import { DEFAULT_OPTIONS } from "../model/create-options";

const DEFAULT_KEY = -1;
const DEFAULT_CHARACTER: Character = {
    key: DEFAULT_KEY,
    name: "",
    streetName: "",
    metaType: MetaType.Human,
    attributes: [
        { name: "Body", rating: 3 },
        { name: "Agility", rating: 3 },
        { name: "Reaction", rating: 3 },
        { name: "Strength", rating: 3 },
        { name: "Charisma", rating: 3 },
        { name: "Intuition", rating: 3 },
        { name: "Logic", rating: 3 },
        { name: "Willpower", rating: 3 },
        { name: "Edge", rating: 3 },
        { name: "Magic", rating: 3 },
    ],
    qualities: [],
    activeSkills: [],
    knowledgeSkills: [],
    languageSkills: [],
    contacts: [],
    spells: [],
    gear: [],
    options: DEFAULT_OPTIONS
};

export function getDefaultCharacter(): Character {
    return { ...DEFAULT_CHARACTER };
}

export function isDefaultCharacter(character: Character): boolean {
    return JSON.stringify(DEFAULT_CHARACTER) === JSON.stringify(character);
}

export function hasDefaultKey(character: Character): boolean {
    return character.key === DEFAULT_KEY;
}

export function upgradeCharacter(originalCharacter: Character): Character {
    const upgradedCharacter = { ...originalCharacter };
    if (upgradedCharacter.options === undefined) {
        upgradedCharacter.options = { ...DEFAULT_OPTIONS };
    }
    return upgradedCharacter;
}