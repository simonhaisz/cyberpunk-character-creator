import { Character } from "./character";

export type Spells = {
	combat: string[],
	detection: string[],
	health: string[],
	illusion: string[],
	manipulation: string[],
};

export function getSpellCost(): number {
	return 5;
}

export function getSpellsCost(spells: string[]): number {
	return getSpellCost() * spells.length;
}

export function getCharacterSpellsCost(character: Character): number {
	let cost = 0;
	cost += getSpellsCost(character.spells.combat);
	cost += getSpellsCost(character.spells.detection);
	cost += getSpellsCost(character.spells.health);
	cost += getSpellsCost(character.spells.illusion);
	cost += getSpellsCost(character.spells.manipulation);
	return cost;
}

export type Magic = {
	spells: Spells;
};