import { sentenceCase } from "change-case";
import { Item } from "./item";

export type Dictionary<T> = { [key: string]: T };

export function transformAllItems<T>(parentPath: string, parentData: any, allItems: Dictionary<T[]>, transformValues: (childpath: string, childValues: any[]) => T[]) {
	for (const childName of Object.keys(parentData)) {
		const childPath = `${parentPath}.${childName}`;
		const childData = parentData[childName];
		if (Array.isArray(childData)) {
			allItems[childPath] = transformValues(childPath, childData as any[]);
		} else {
			transformAllItems(childPath, childData, allItems, transformValues);
		}
	}
}

const itemCostMap = new Map<string,number>();
export function getItemCost<T extends Item>(item: Item, allItems: Dictionary<T[]>): number {
	const key = `${item.path}.${item.name}`;
	if (itemCostMap.has(key)) {
		return itemCostMap.get(key)!;
	}
	const items = allItems[item.path];
	if (items === undefined) {
		throw new Error(`Could not find any items under path '${item.path}'`);
	}
	const foundItem = items.find(g => g.name === item.name);
	if (!foundItem) {
		throw new Error(`Could not find item with name '${item.name}' in list '${JSON.stringify(items)}' under path '${item.path}'`);
	}

	const cost = parseFloat(foundItem.cost!);
	itemCostMap.set(key, cost);
	return cost;
}

const itemAvailabilityMap = new Map<string,string | undefined>();
export function getItemAvailability<T extends Item>(item: Item, allItems: Dictionary<T[]>): string | undefined {
	const key = `${item.path}.${item.name}`;
	if (itemAvailabilityMap.has(key)) {
		return itemAvailabilityMap.get(key)!;
	}
	const items = allItems[item.path];
	const foundItem = items.find(g => g.name === item.name);
	if (!foundItem) {
		throw new Error(`Could not find item with name '${item.name}' in list '${JSON.stringify(items)}' under path '${item.path}'`);
	}

	const availability = foundItem.availability;
	itemAvailabilityMap.set(key, foundItem.availability);
	return availability;
}

export function getNextParentPaths<T>(values: Dictionary<T>): Map<string,string> {
	const parentPathToName = new Map<string,string>();
	const paths = Object.keys(values).map(p => p.split("."));
	let componentIndex: number;
	if (paths.length > 1) {
		let differenceFound = false;
		componentIndex = 0;
		while (!differenceFound) {
			if (componentIndex >= paths[0].length) {
				throw new Error(`Searched through all path components and found no differences`);
			}
			for (let pathIndex = 1; pathIndex < paths.length; pathIndex++) {
				if (paths[0][componentIndex] !== paths[pathIndex][componentIndex]) {
					differenceFound = true;
					break;
				}
			}
			componentIndex++;
		}
	} else if (paths.length === 1) {
		// there is only a single path so pick the last component
		componentIndex = paths[0].length - 1;
	} else {
		throw new Error(`There are no paths`);
	}
	for (const path of paths) {
		const parentPath = path.slice(0, componentIndex).join(".");
		const name = path[componentIndex - 1];
		parentPathToName.set(parentPath, sentenceCase(name));
	}
	return parentPathToName;
}

export function getMatchingParents<T>(values: Dictionary<T>): string[] {
	const paths = Object.keys(values).map(p => p.split("."));
	let matchingLevels = 0;
	for (let i = 0; ; i++) {
		let currentLevel: string | undefined;
		let currentLevelMatches = true;
		for (const path of paths) {
			if (i >= path.length) {
				currentLevelMatches = false;
				break;
			}
			if (currentLevel === undefined) {
				currentLevel = path[i];
			} else if (currentLevel !== path[i]) {
				currentLevelMatches = false;
				break;
			}
		}
		if (currentLevelMatches) {
			matchingLevels++;
		} else {
			break;
		}
	}
	if (matchingLevels === 0) {
		return [];
	}
	// since they all match we can just grab the first path
	return paths[0].slice(0, matchingLevels);
}

export function getMaxPathDepth<T>(values: Dictionary<T>): number {
	let maxDepth = 0;
	const paths = Object.keys(values).map(p => p.split("."));
	for (const path of paths) {
		maxDepth = Math.max(maxDepth, path.length);
	}
	return maxDepth;
}

export function getChildNames<T>(values: Dictionary<T>, parentPath: string): string[] {
	const childNames = new Set<string>();
	const parents = parentPath.split(".");
	for (const path of findChildPaths(values, parentPath)) {
		const components = path.split(".");
		childNames.add(components[parents.length]);
	}
	return Array.from(childNames);
}

export function getChildValues<T>(values: Dictionary<T[]>, parentPath: string): T[] {
	const childValues: T[] = [];
	for (const path of findChildPaths(values, parentPath)) {
		childValues.push(...values[path]);
	}
	return childValues;
}

export function getChildSet<T>(values: Dictionary<T[]>, parentPath: string): Dictionary<T[]> {
	const subset: Dictionary<T[]> = {};
	for (const path of findChildPaths(values, parentPath)) {
		subset[path] = values[path];
	}
	return subset;
}

function findChildPaths<T>(values: Dictionary<T>, parentPath: string): string[] {
	const childPaths: string[] = [];
	const parents = parentPath.split(".");
	for (const path of Object.keys(values)) {
		const components = path.split(".");
		if (components.length < parents.length) {
			throw new Error(`Child paths '${path}' must be longer than parent paths '${parentPath}'`);
		}
		let match = true;
		for (let i = 0; i < parents.length; i++) {
			if (parents[i] !== components[i]) {
				match = false;
				break;
			}
		}
		if (match) {
			childPaths.push(path);
		}
	}
	return childPaths;
}