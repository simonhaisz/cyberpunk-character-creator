import { Character, MetaType } from "../model/character";

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
    qualities: { positive: [], negative: [] },
    activeSkills: [],
    knowledgeSkills: [],
    languageSkills: [],
    contacts: [],
    spells: {
        combat: [],
        detection: [],
        health: [],
        illusion: [],
        manipulation: [],
    },
    gear: {},
    // gear: {
    //     weapons: {
    //         meleeWeapons: {
    //             unarmed: [],
    //             clubs: [],
    //             clades: [],
    //             exoticMeleeWeapons: [],
    //         },
    //         projectileAndThrowingWeapons: {
    //             throwingWeapons: [],
    //             bows: [],
    //             crossbows: [],
    //             arrowheads: [],
    //         },
    //         lessThanLethal: {
    //             tasers: [],
    //             specialRangedWeapons: [],
    //         },
    //         firearms: {
    //             holdOutPistols: [],
    //             lightPistols: [],
    //             heavyPistols: [],
    //             subMachineguns: [],
    //             shotguns: [],
    //             assaultRifles: [],
    //             sportRifles: [],
    //             sniperRifles: [],
    //             assaultCannons: [],
    //             lightMachineguns: [],
    //             mediumMachineguns: [],
    //             heavyMachineguns: [],
    //             ammunitionTypes: [],
    //             firearmAccessories: [],
    //         },
    //         grenadesAndRockets: {
    //             grenades: [],
    //             grenadeLaunchers: [],
    //             rockets: [],
    //             rocketLaunchers: []
    //         },
    //     },
    //     clothingAndArmor: {
    //         clothing: [],
    //         armor: [],
    //         armorModifications: [],
    //         helmetsAndShields: [],
    //     },
    //     augmentations: {
    //         cyberAndBiowareGrades: [],
    //         headware: [],
    //         eyeware: [],
    //         earware: [],
    //         bodyware: [],
    //         cyberlimbs: [],
    //         cyberlimbEnhancements: [],
    //         cyberlimbAccessories: [],
    //         cyberMeleeWeapons: [],
    //         basicBioware: [],
    //         culturedBioware: [],
    //     },
    //     tech: {
    //         electronics: {
    //             commlink: [],
    //             coomlinkUpgrades: [],
    //             commlinkAccessories: [],
    //         },
    //         surveillance: {
    //             imagingDevicies: [],
    //             imagingEnhancements: [],
    //             audioDevices: [],
    //             audioEnhancements: [],
    //             sensorPackages: [],
    //             sensorFunctions: [],
    //         },
    //         security: {
    //             locks: [],
    //             restraints: [],
    //             breakingAndEnteringTools: [],
    //             disguises: [],
    //         },
    //         datachipsAndSoftware: {
    //             matrixPrograms: [],
    //             skillsoftPrograms: [],
    //             dataPrograms: [],
    //             simsemse: [],
    //             areprograms: [],
    //         },
    //         tools: [],
    //         survivalGear: [],
    //         grapplegun: [],
    //     },
    //     medicalEquipment: {
    //         biotech: [],
    //         slapPatches: [],
    //         docwagonContracts: [],
    //     },
    //     chemicals: {
    //         drugs: [],
    //         toxins: [],
    //         compounds: [],
    //     },
    //     explosives: {
    //         explosives: [],
    //         detonators: [],
    //     },
    //     magicalEquipment: {
    //         spellFormulae: [],
    //         spellFetish: [],
    //         foci: [],
    //         magicalSupplies: [],
    //     },
    //     vehiclesAndDrones: {
    //         bikes: [],
    //         cars: [],
    //         trucks: [],
    //         securityVehicles: [],
    //         microDroens: [],
    //         miniDrones: [],
    //         smallDrones: [],
    //         mediumDrones: [],
    //         largeDrones: [],
    //         vehicleModifications: [],
    //     },
    // }
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