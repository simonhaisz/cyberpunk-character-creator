import { Dictionary } from "./dictionary";

export type Item = {
	path: string;
	name: string;
} & Dictionary<string>;

export function getItemSubset(items: Item[], parentPath: string): Item[] {
	const subItems: Item[] = [];
	for (const item of items) {
		if (item.path === parentPath || item.path.startsWith(`${parentPath}.`)) {
			subItems.push(item);
		}
	}
	return subItems;
}