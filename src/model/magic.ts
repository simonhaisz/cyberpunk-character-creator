import { Character } from "./character";
import { Item } from "./item";
import { Dictionary, transformAllItems, getItemCost } from "./dictionary";

export type Spell = {
	cost: string;
} & Item;

export type AdeptPower = {
	cost: string;
	levels: string;
} & Item;

export const spellsRoot = "spells";

export function transformAllSpells(allData: any): Dictionary<Spell[]> {
	const allSpells: Dictionary<Spell[]> = {};
	transformAllItems(spellsRoot, allData, allSpells, transformSpellValues);
	return allSpells;
}

function transformSpellValues(path: string, values: any[]): Spell[] {
	const spells: Spell[] = []
	for (const value of values) {
		const name = value["Name"];
		spells.push({ path, name, cost: "5" });
	}
	return spells;
}

export function getSpellsCost(spells: Item[]): number {
	return spells.length * 5;
}

export function getCharacterSpellsCost(character: Character): number {
	return getSpellsCost(character.spells);
}

export const powersRoot = "powers";

export function transformAllPowers(allData: any): Dictionary<AdeptPower[]> {
	const allPowers: Dictionary<AdeptPower[]> = {};
	transformAllItems(powersRoot, allData, allPowers, transformAdepPowerValues);
	return allPowers;
}

function transformAdepPowerValues(path: string, values: any[]): AdeptPower[] {
	const powers: AdeptPower[] = [];
	for (const value of values) {
		const name = value["Name"];
		const cost = value["Cost"];
		const levels = value["Levels"];
		powers.push({ path, name, cost, levels });
	}
	return powers;
}

export function computeAdeptPowerCost(item: Item, allPowers: Dictionary<Item[]>): number {
	const baseCost = getItemCost(item, allPowers);
	return baseCost;
}

const powerHasLevelsMap = new Map<string,boolean>();
export function doesAdeptPowerHaveLevels(item: Item, allPowers: Dictionary<Item[]>): boolean {
	const key = `${item.path}.${item.name}`;
	if (powerHasLevelsMap.has(key)) {
		return powerHasLevelsMap.get(key)!;
	}
	const powers = allPowers["powers.adept-powers"];
	if (powers === undefined) {
		throw new Error(`Could not find any powers under path 'powers.adept-powers'`);
	}
	const foundPower = powers.find(p => p.name === item.name);
	if (!foundPower) {
		throw new Error(`Could not find power with name '${item.name}' in list '${JSON.stringify(powers)}' under path '${item.path}'`);
	}
	const hasLevels = foundPower.levels !== undefined && foundPower.levels !== "-";
	powerHasLevelsMap.set(key, hasLevels);
	return hasLevels;
}

export function getCharacterMagicCost(character: Character): number {
	let cost = 0;
	cost += getCharacterSpellsCost(character);
	return cost;
}