import { Character } from "./character";
import { Item } from "./item";
import { Dictionary, transformAllItems } from "./dictionary";

export type Spell = {
	cost: string;
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

export function getCharacterMagicCost(character: Character): number {
	let cost = 0;
	cost += getCharacterSpellsCost(character);
	return cost;
}