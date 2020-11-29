import { MetaType } from "./character";

export function getMetaTypeCost(metaType: MetaType): number {
    switch (metaType) {
        case MetaType.Human:
            return 0;
        case MetaType.Ork:
            return 30;
        case MetaType.Dwarf:
            return 30;
        case MetaType.Elf:
            return 40;
        case MetaType.Troll:
            return 60;
        default:
            throw new Error(`Unknown meta-type '${metaType}'`);
    }
}