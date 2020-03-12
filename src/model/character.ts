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

export type Quality = NamedProperty;

export type Skill = NamedProperty;

export type Character = {
    name: string;
    streetName: string;
    metaType: MetaType;
    attributes: Attribute[];
    qualities: Quality[];
    skills: Skill[];
};