import { MetaType, Attribute } from "./character";

export function getAttributeModifier(metaType: MetaType, attribute: Attribute): number {
    switch (metaType) {
        case MetaType.Dwarf:
            switch (attribute.name) {
                case "Body":
                    return 1;
                case "Reaction":
                    return -1;
                case "Strength":
                    return 2;
                case "Willpower":
                    return 1;
            }
            break;
        case MetaType.Elf:
            switch (attribute.name) {
                case "Agility":
                    return 1;
                case "Charisma":
                    return 2;
            }
            break;
        case MetaType.Human:
            switch (attribute.name) {
                case "Edge":
                    return 1;
            }
            break;
        case MetaType.Ork:
            switch (attribute.name) {
                case "Body":
                    return 3;
                case "Strength":
                    return 2;
                case "Charisma":
                    return -1;
                case "Logic":
                    return -1;
            }
            break;
        case MetaType.Troll:
            switch (attribute.name) {
                case "Body":
                    return 4;
                case "Agility":
                    return -1;
                case "Strength":
                    return 4;
                case "Charisma":
                    return -2;
                case "Intuition":
                    return -1;
                case "Logic":
                    return -1;
            }
            break;
    }
    return 0;
}

export function getAttributeCost(attribute: Attribute): number {
    switch (attribute.rating) {
        case 1:
            return -25;
        case 2:
            return -15;
        case 3:
            return 0;
        case 4:
            return 20;
        case 5:
            return 45;
        case 6:
            return 75;
        case 7:
            return 110;
        default:
            return Number.NaN;
    }
}