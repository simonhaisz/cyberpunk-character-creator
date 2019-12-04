import { Character } from "../model/character";

export const DEFAULT_CHARACTER: Character = {
    name: "",
    streetName: "",
    metaType: undefined,
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
    ],
    qualities: [],
    skills: []
};