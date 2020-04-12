import { Contact } from "./contact";
import { Spells } from "./magic";
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
    spells: Spells;
    // gear: any;
    gear: Item[];
};

export function isAwakened(character: Character): boolean {
    return character.qualities.find(q => q.name === "Adept" || q.name === "Magician") !== undefined;
}