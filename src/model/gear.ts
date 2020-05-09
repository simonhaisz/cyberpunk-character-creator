import { Dictionary, transformAllItems, getItemCost } from "./dictionary";
import { Item } from "./item";
import { Character } from "./character";

export type Gear = {
	availability: string;
	cost: string;
	costLabel: string;
} & Item;

export const gearRoot = "gear";

export function transformAllGear(allData: any): Dictionary<Gear[]> {
	const allGear: Dictionary<Gear[]> = {};
	transformAllItems(gearRoot, allData, allGear, transformGearValues);
	return allGear;
}

function transformGearValues(path: string, values: any[]): Gear[] {
	const items: Gear[] = [];
	for (const item of values.map(v => transformGearItem(path, v))) {
		// gear with multiple versions need to be split into separate items
		if (/^([\w-\s]+)\s+\(([\w-\s]+(,\s*)?)+\)$/i.test(item.name)) {
			items.push(...splitGearItems(path, item));
		} else {
			items.push(item);
		}
	}
	for (const item of items) {
		finalizeGearItem(item);
	}
	return items;
}

function transformGearItem(path: string, data: any): Gear {
	const item: Gear = {
		path,
		name: "[NAME]",
		availability: "[AVAILABILITY]",
		cost: "[COST]",
		costLabel: "[COST]"
	};
	for (const propName of Object.keys(data)) {
		const propValue = data[propName];
		if (propName === "Name") {
			item.name = propValue as string;
		} else if (propName === "Availability") {
			item.availability = propValue as string;
		} else if (propName === "Cost") {
			item.costLabel = propValue as string;
		} else {
			// assume a string (not that it actually matters)
			item[propName] = propValue as string;
		}
	}
	return item;
}

function splitGearItems(path: string, item: Gear): Gear[] {
	const itemVersions: Gear[] = [];
	/*
	"Some Thingy (1, 2, 3)" => [
		"Some Thingy (A, B, C)"
		"Some Thingy",
		"A, B, C"
	]
	*/
	const groupResult = /^([\w-\s]+)\s+\(((?:(?:[\w-\s]+)(?:,\s*)?)+)\)$/i.exec(item.name);
	if (groupResult === null) {
		throw new Error(`Gear item's name '${item.name}' does not contain multiple ratings`);
	}
	const namePrefix = groupResult[1];
	const nameSuffixes = groupResult[2].split(",").map(r => r.trim());
	const itemCount = nameSuffixes.length;
	for (let i = 0; i < itemCount; i++) {
		const itemVersion: Gear = {
			path,
			name: `${namePrefix} - ${nameSuffixes[i]}`,
			availability: "[AVAILABILITY]",
			cost: "[COST]",
			costLabel: "[COST]"
		};
		for (const propName of Object.keys(item)) {
			// use lower-case names as this is the Gear object, not the raw object from the JSON file
			if (propName === "name") {
				// skip name - it is already set
				continue;
			}
			if (propName === "cost") {
				// skip cost - it is determined in the finalize step, after splitting
				continue;
			}
			// all other properties are strings
			const propValue = item[propName] as string;
			const splitValues = propValue.split(",").map(v => v.trim());
			if (splitValues.length === 1) {
				// same value for all versions
				itemVersion[propName] = propValue;
			} else if (splitValues.length === itemCount) {
				itemVersion[propName] = splitValues[i];
			} else {
				throw new Error(`Properties should have a single value or the same amount as there are version names ${itemCount} - found ${splitValues.length}`);
			}
		}
		itemVersions.push(itemVersion);
	}
	return itemVersions;
}

function finalizeGearItem(item: Gear) {
	/*
	1000
	+500
	x2
	50 (per dose)
	*/
	const costResult = /^(?:x|\+)?(\d+)\s*(?:\(([\w\s]+)\))?$/i.exec(item.costLabel);
	if (costResult) {
		item.cost = costResult[1];
		if (isNaN(parseInt(item.cost))) {
			throw new Error(`Gear item '${item.name}' has unsupported cost label '${item.costLabel}'`);
		}
	} else {
		item.cost = "0";
	}
}

export function computeItemCost(item: Item, allGear: Dictionary<Gear[]>): number {
	const baseCost = getItemCost(item, allGear);
	return baseCost * getGradeCostMultipler(item.grade as Grade);
}

export function createSavedItem(path: string, item: Item): Item {
	const { name, count, grade } = item;
	const savedItem = { path, name, count, grade };
	// do not want to save optional properties
	// grade (used, alpha, beta, delta) only applies to augmentations
	if (grade === undefined) {
		delete savedItem.grade;
	}
	return savedItem;
}

export enum Grade {
	Used = "Used",
	Alpha = "Alpha",
	Beta = "Beta",
	Delta = "Delta"
}

export function getGradeCostMultipler(grade: Grade = Grade.Alpha): number {
	switch (grade) {
		case Grade.Used:
			return 0.5;
		case Grade.Alpha:
			return 1;
		case Grade.Beta:
			return 5;
		case Grade.Delta:
			return 15;
		default:
			throw new Error(`Unknown augmentation grade '${grade}'`);
	}
}

export function getGradeEssenseMultiplier(grade: Grade = Grade.Alpha): number {
	switch (grade) {
		case Grade.Used:
			return 1.2;
		case Grade.Alpha:
			return 1;
		case Grade.Beta:
			return 0.7;
		case Grade.Delta:
			return 0.5;
		default:
			throw new Error(`Unknown augmentation grade '${grade}'`);
	}
}

export function getCharacterGearNuyenCost(character: Character, allGear: Dictionary<Gear[]>): number {
	let nuyen = 0;
	for (const item of character.gear) {
		nuyen += computeItemCost(item, allGear) * parseInt(item.count);
	}
	return nuyen;
}

export function getCharacterGearKarmaCost(nuyen: number): number {
	// Nuyen is bought at a rate of 5 Karma for 10000¥
	// All unspent nuyen is lost so round up
	return Math.ceil(nuyen / 10000) * 5;
}