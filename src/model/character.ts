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
    qualities: { negative: string[], positive: string[] };
    activeSkills: Skill[];
    knowledgeSkills: Skill[];
    languageSkills: Skill[];
};