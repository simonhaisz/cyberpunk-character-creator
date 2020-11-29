export enum Level {
    Street = "Street",
    Normal = "Normal",
    Elite = "Elite"
}

export const ALL_LEVELS: Level[] = [
    Level.Street,
    Level.Normal,
    Level.Elite
];

export type CreateOptions = {
    karmaLevel: Level;
    connectionLevel: Level;
    nuyenLevel: Level;
    gearLevel: Level;
}

export function getStartingKarma(level: Level): number {
    switch (level) {
        case Level.Street:
            return 400;
        case Level.Normal:
            return 500;
        case Level.Elite:
            return 700;
        default:
            throw new Error(`Unknown level '${level}'`);
    }
}

export function getNuyenFactor(level: Level): number {
    switch (level) {
        case Level.Street:
            return 10000;
        case Level.Normal:
            return 20000;
        case Level.Elite:
            return 50000;
        default:
            throw new Error(`Unknown level '${level}'`);
    }
}

export function getBaseGearAvailability(level: Level): number {
    switch (level) {
        case Level.Street:
            return 6;
        case Level.Normal:
            return 12;
        case Level.Elite:
            return 18;
        default:
            throw new Error(`Unknown level '${level}'`);
    }
}

export function getMaxConnection(level: Level): number {
    switch (level) {
        case Level.Street:
            return 3;
        case Level.Normal:
            return 5;
        case Level.Elite:
            return 7;
        default:
            throw new Error(`Unknown level '${level}'`);
    }
}