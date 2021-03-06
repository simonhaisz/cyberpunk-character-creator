import React, { FC, Fragment, useState } from "react";
import { Dictionary, getMatchingParents, getMaxPathDepth, getNextParentPaths } from "../model/dictionary";
import { Item, getItemSubset } from "../model/item";
import IconButton from "@material-ui/core/IconButton";
import EditIcon from "@material-ui/icons/Edit";
import ItemPickerDialog from "./ItemPickerDialog";
import { Menu, MenuItem } from "@material-ui/core";
import { createSavedItem } from "../model/gear";
import { getChildSet } from "../model/dictionary";
import { sentenceCase } from "change-case";

type Props = {
	title: string;
	items: Item[];
	allItems: Dictionary<Item[]>;
	createCostLabel: (item: Item) => string;
	onUpdateItems: (newItems: Item[]) => void;
};
const ItemPickerButton: FC<Props> = (props: Props) => {
	const { title, items, allItems, createCostLabel, onUpdateItems } = props;

	const [open, setOpen] = useState(false);
	const handleClose = () => setOpen(false);

	const parentPathsToName = getNextParentPaths(allItems);

	const parentPaths: string[] = [];
	for (const parentPath of parentPathsToName.keys()) {
		parentPaths.push(parentPath);
	}
	
	const [parentPath, setParentPath] = useState(parentPaths[0]);
	
	const [menuAnchor, setMenuAnchor] = useState<HTMLButtonElement | null>(null);

	const allChildItems = getChildSet(allItems, parentPath);
	
	const allCountedItems: Dictionary<Item[]> = {};
	let hasItems = false;
	for (const path of Object.keys(allChildItems)) {
		hasItems = true;
		const localItems = [...allChildItems[path]];
		const matchingItems = getItemSubset(items, parentPath);
		for (const localItem of localItems) {
			const matchingItem = matchingItems.find(i => i.name === localItem.name);
			if (matchingItem) {
				localItem.count = matchingItem.count;
				localItem.grade = matchingItem.grade;
			} else {
				localItem.count = "0";
			}
		}
		allCountedItems[path] = localItems;
	}

	const handleUpdateAllItems = (newCountedItems: Dictionary<Item[]>) => {
		const newItems: Item[] = [...items];

		for (const path of Object.keys(newCountedItems)) {
			for (const localItem of newCountedItems[path]) {
				const includeItem = parseInt(localItem.count!) > 0;
				const index = newItems.findIndex(i => i.path === path && i.name === localItem.name);
				if (index > -1) {
					if (includeItem) {
						newItems[index] = createSavedItem(path, localItem);
					} else {
						newItems.splice(index, 1);
					}
				} else if (includeItem) {
					newItems.push(createSavedItem(path, localItem));
				}
			}
		}

		onUpdateItems(newItems);
	};

	const matchingParents = getMatchingParents(allItems);
	const matchingParentPath = matchingParents.join(".");
	const maxPathDepth = getMaxPathDepth(allItems);
	const useMenu = matchingParents.length + 1 < maxPathDepth;

	const handleMenuClick = (parentPath: string) => {
		setParentPath(parentPath);
		setMenuAnchor(null);
		setOpen(true);
	};

	const handleButtonClick = (event: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
		if (useMenu) {
			setMenuAnchor(event.currentTarget);
		} else {
			setParentPath(matchingParentPath);
			setOpen(true);
		}
	}

	return (
		<Fragment>
			<IconButton
				onClick={handleButtonClick}
				color="secondary"
				size="medium"
				disableRipple
			>
				<EditIcon />
			</IconButton>
			{
				useMenu ?
				<Menu
					anchorEl={menuAnchor}
					open={Boolean(menuAnchor)}
					onClose={() => setMenuAnchor(null)}
				>
					{
						parentPaths.map(p => (
							<MenuItem key={p} onClick={() => {handleMenuClick(p)}}>
								{sentenceCase(parentPathsToName.get(p)!)}
							</MenuItem>
						))
					}
				</Menu>
				:
				null
			}
			{
				hasItems
				?
				<ItemPickerDialog
					open={open}
					onClose={handleClose}
					title={
						useMenu ?
						`${title} - ${parentPathsToName.get(parentPath)!}`
						:
						title
					}
					allItems={allCountedItems}
					createCostLabel={createCostLabel}
					onUpdateAllItems={handleUpdateAllItems}
				/>
				:
				null
			}
		</Fragment>
	);
};

export default ItemPickerButton;