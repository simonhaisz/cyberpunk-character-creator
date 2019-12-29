type SkillGroup = {
    name: string;
    skills: string[];
}

export const ACTIVE_SKILL_GROUPS: SkillGroup[] = [
    {
        name: "Combat",
        skills: ["Close Combat", "Firearms"]
    },
    {
        name: "Magical",
        skills: ["Conjuring", "Sorcery"]
    },
    {
        name: "Physical",
        skills: ["Athletics", "Stealth"]
    },
    {
        name: "Social",
        skills: ["Influence"]
    },
    {
        name: "Technical",
        skills: ["Cracking", "Electronics"]
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