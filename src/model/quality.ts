import { CustomItem } from "./custom-item";
import { Item } from "./item";
import { Dictionary, transformAllItems, getItemCost } from "./dictionary";
import { Character } from "./character";

export type Quality = {
    cost: string;
} & Item;

export const qualitiesRoot = "qualities";

export function transformAllQualities(allData: any): Dictionary<Quality[]> {
    const allQualities: Dictionary<Quality[]> = {};
    transformAllItems(qualitiesRoot, allData, allQualities, transformQualityValues);
    return allQualities;
}

function transformQualityValues(path: string, values: any[]): Quality[] {
    const qualities: Quality[] = [];
    for (const value of values) {
        const name = value["Name"];
        const cost = value["Cost"];
        qualities.push({ path, name, cost });
    }
    return qualities;
}

export type Qualities = {
    positive: string[];
    negative: string[]
};

export type AllQualities = {
    positive: CustomItem[];
    negative: CustomItem[];
}

export function getQualitiesCost(selectedQualities: string[], allQualities: CustomItem[]): number {
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

export function getCharacterQualitiesCost(character: Character, allQualities: Dictionary<Quality[]>): number {
    let cost = 0;
    for (const quality of character.qualities) {
        cost += getItemCost(quality, allQualities);
    }
    return cost;
}