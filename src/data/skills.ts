export const ACTIVE_SKILLS_NAMES: string[] = [
    "Archery",
    "Close Combat",
    "Firearms",
    "Heavy Weapons",
    "Throwing Weapons",
    "Athletics",
    "Diving",
    "Escape Artist",
    "Free-fall",
    "Outdoors",
    "Perception",
    "Stealth",
    "Acting",
    "Influence",
    "Instruction",
    "Intimidation",
    "Arcana",
    "Assensing",
    "Astral Combat",
    "Conjuring",
    "Enchanting",
    "Sorcery",
    "Animal Handling",
    "Armorer",
    "Artisan",
    "Biotech",
    "Chemistry",
    "Cracking",
    "Demolitions",
    "Electronics",
    "Forgery",
    "Locksmith",
    "Mechanic",
    "Gunnery",
    "Pilot Areospace",
    "Pilot Aircraft",
    "Pilot Groundcraft",
    "Pilot Watercraft"
]

type SkillGroup = {
    name: string;
    skills: string[];
}

export const ACTIVE_SKILL_GROUPS: SkillGroup[] = [
    {
        name: "Combat",
        skills: ["Archery", "Close Combat", "Firearms", "Launch Weapons", "Throwing Weapons"]
    },
    {
        name: "Magical",
        skills: ["Arcana", "Assensing", "Astral Combat", "Conjuring", "Enchanting", "Sorcery"]
    },
    {
        name: "Physical",
        skills: ["Athletics", "Stealth"]
    },
    {
        name: "Social",
        skills: ["Acting", "Influence", "Instruction", "Intimidation"]
    },
    {
        name: "Technical",
        skills: ["Animal Handling", "Armorer", "Artisan", "Biotech", "Chemistry", "Cracking", "Demolitions", "Electronics", "Forgery", "Locksmith", "Mechanic"]
    },
    {
        name: "Vehicle",
        skills: ["Gunnery", "Pilot Aerospace", "Pilot Aircraft", "Pilot Groundcraft", "Pilot Watercraft"]
    }
];

type SkillSpecialization = {
    [name: string]: string[];
};
const SKILLS_SPECIALIATIONS: SkillSpecialization = {
    "Firearms": ["Automatics", "Longarms", "Pistols"],
    "Close Combat": ["Blades", "Clubs", "Unarmed"],
    "Athletics": ["Climbing", "Gymnastics", "Running", "Swimming"],
    "Stealth": ["Disguise", "Infiltration", "Palming", "Sneaking"],
    "Sorcery": ["Counterspelling", "Ritual Spellcasting", "Spellcasting"],
    "Conjuring": ["Banishing", "Binding", "Summoning"],
    "Influence": ["Con", "Etiquette", "Leadership", "Negotiation"],
    "Electronics": ["Computer", "Data Search", "Hardware", "Software"],
    "Cracking": ["Cybercombat", "Electronic Warfare", "Hacking"]
};

export function getSpecializations(skill: string): string[] {
    const specializations = SKILLS_SPECIALIATIONS[skill];
    if (specializations === undefined) {
        return []
    }
    return specializations;
}