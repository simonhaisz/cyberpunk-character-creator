export enum MetaType {
    Dwarf = "Dwarf",
    Elf = "Elf",
    Human = "Human",
    Ork = "Ork",
    Troll = "Troll",
}

export type Attribute = {
    name: string;
    rating: number;
};

export type Quality = {
    name: string;
    cost: number;
};

export type Skill = {
    name: string;
    rating: number;
    specialization: string | undefined;
};

export type Character = {
    name: string;
    streetName: string;
    metaType: MetaType | undefined;
    attributes: Attribute[];
    qualities: Quality[];
    skills: Skill[];
};