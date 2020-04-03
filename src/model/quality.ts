import { Item } from "./custom-item";

export type Qualities = {
    positive: string[];
    negative: string[]
};

export type AllQualities = {
    positive: Item[];
    negative: Item[];
}

export function getQualitiesCost(selectedQualities: string[], allQualities: Item[]): number {
    let cost = 0;
    for (const selected of selectedQualities) {
        const quality = allQualities.find(q => q.Name === selected);
        if (!quality) {
            throw new Error(`Could not find quality with name '${selected}' in list '${JSON.stringify(allQualities)}'`);
        }
        cost += parseInt(quality.Cost!);
    }
    return cost;
}

export function getAllQualitiesCost(selectedQualities: { positive: string[], negative: string[] }, allQualities: AllQualities): number {
    let cost = 0;
    cost += getQualitiesCost(selectedQualities.positive, allQualities.positive);
    cost += getQualitiesCost(selectedQualities.negative, allQualities.negative);
    return cost;
}