import { MetaType } from "./character";

export function getMetaTypeCost(metaType: MetaType): number {
    switch (metaType) {
        case MetaType.Human:
            return 0;
        case MetaType.Ork:
            return 40;
        case MetaType.Dwarf:
            return 50;
        case MetaType.Elf:
            return 60;
        case MetaType.Troll:
            return 80;
        default:
            throw new Error(`Unknown meta-type '${metaType}'`);
    }
}