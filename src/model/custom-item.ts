export type Dictionary<T> = { [key: string]: T };

export type Item = {
    Name: string;
    Availability?: string;
    Cost?: string;
};

export function getChildItems(customItems: Dictionary<Item>, parentPath: string): Item[] {
	const items: Item[] = [];
	for (const path in customItems) {
		if (path.startsWith(parentPath)) {
			items.push(customItems[path]);
		}
	}
	return items;
}