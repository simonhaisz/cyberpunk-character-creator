import { sentenceCase } from "change-case";

export type Dictionary<T> = { [key: string]: T };

export function getNextParentPaths<T>(values: Dictionary<T>): Map<string,string> {
	const parentPathToName = new Map<string,string>();
	const paths = Object.keys(values).map(p => p.split("."));
	let differenceFound = false;
	let componentIndex = 0;
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
	for (const path of paths) {
		const parentPath = path.slice(0, componentIndex).join(".");
		const name = path[componentIndex - 1];
		parentPathToName.set(parentPath, sentenceCase(name));
	}
	return parentPathToName;
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