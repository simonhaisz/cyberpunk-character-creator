import { DEFAULT_OPTIONS } from "../data/default-create-options";
import { Contact } from "./contact";
import { CreateOptions } from "./create-options";
import { Item } from "./item";

export enum MetaType {
    Dwarf = "Dwarf",
    Elf = "Elf",
    Human = "Human",
    Ork = "Ork",
    Troll = "Troll",
}

export type NamedProperty = {
    name: string;
    rating: number;
};

export type Attribute = NamedProperty;

export type Skill = NamedProperty;

export type CharacterRef = {
    key: number;
    name: string;
    streetName: string;
};

export type Character = CharacterRef & {
    metaType: MetaType;
    attributes: Attribute[];
    qualities: Item[];
    activeSkills: Skill[];
    knowledgeSkills: Skill[];
    languageSkills: Skill[];
    contacts: Contact[];
    spells: Item[];
    gear: Item[];
    options: CreateOptions;
    professionalism: number;
    modifiers: NamedProperty[];
};

export function isAwakened(character: Character): boolean {
    return character.qualities.find(q => q.name === "Adept" || q.name === "Magician") !== undefined;
}

export function getProfessionalismCost(professionalism: number): number {
    if (professionalism < 0 || professionalism > 6) {
        throw new Error(`Professionalism must be witin the range [1..6] - found ${professionalism}`);
    }
    const sum = professionalism * (professionalism + 1) / 2;
    return sum * 20;
}

export function upgradeCharacter(originalCharacter: any): Character {
    const upgradedCharacter = { ...originalCharacter };
    if (upgradedCharacter.options === undefined) {
        upgradedCharacter.options = { ...DEFAULT_OPTIONS };
    }
    if (upgradedCharacter.professionalism === undefined) {
        upgradedCharacter.professionalism = 0;
    }
    if (upgradedCharacter.modifiers === undefined) {
        upgradedCharacter.modifiers = [];
    }
    return upgradedCharacter;
}