import { Dictionary } from "./dictionary";

export type CustomItem = {
    Name: string;
    Availability?: string;
    Cost?: string;
};

export function getChildItems(customItems: Dictionary<CustomItem>, parentPath: string): CustomItem[] {
	const items: CustomItem[] = [];
	for (const path in customItems) {
		if (path.startsWith(parentPath)) {
			items.push(customItems[path]);
		}
	}
	return items;
}