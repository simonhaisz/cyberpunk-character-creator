import React, { FC, useState, ChangeEvent } from "react";
import Dialog from "@material-ui/core/Dialog";
import DialogContent from "@material-ui/core/DialogContent";
import DialogTitle from "@material-ui/core/DialogTitle";
import MenuItem from "@material-ui/core/MenuItem";
import Select from "@material-ui/core/Select";
import { Item } from "../model/item";
import { Dictionary } from "../model/dictionary";
import { sentenceCase } from "change-case";
import ItemPickerSection from "./ItemPickerSection";


type Props = {
	open: boolean;
	onClose: () => void;
	title: string;
	allItems: Dictionary<Item[]>;
	onUpdateAllItems: (newItems: Dictionary<Item[]>) => void;
};
const ItemPickerDialog: FC<Props> = (props: Props) => {
	const { open, onClose, title, allItems, onUpdateAllItems } = props;

	const allPaths = Object.keys(allItems);

	const paths = [...allPaths];

	const pathToLabel = new Map<string,string>();
	for (const path of paths) {
		const components = path.split(".");
		const finalComponent = components[components.length - 1];
		const label = sentenceCase(finalComponent);
		pathToLabel.set(path, label);
	}

	const [group, setGroup] = useState(paths[0]);

	// once the dialog is rendered the state is 'remembered' for next use which could be different data
	if (paths.find(p => p === group) === undefined) {
		setGroup(paths[0]);
	}

	const handleGroupChange = (event: ChangeEvent<any>) => {
		setGroup(event.target.value);
	};

	const handleUpdateItems = (subItems: Item[]) => {
		const newAllItems: Dictionary<Item[]> = { ...allItems };
		newAllItems[group] = subItems;
		onUpdateAllItems(newAllItems);
	};

	return (
		<Dialog open={open} onClose={onClose}>
			<DialogTitle>{title}</DialogTitle>
			<DialogContent>
				{
					paths.length > 1
					?
					<Select
						id="group"
						value={group}
						displayEmpty
						onChange={handleGroupChange}
						variant="outlined"
					>
						{
							paths.map(p => (
								<MenuItem
									key={p}
									value={p}
								>
									{pathToLabel.get(p)!}
								</MenuItem>
							))
						}
					</Select>
					:
					null
				}
				<ItemPickerSection
					label={pathToLabel.get(group)!}
					items={allItems[group]}
					onUpdateItems={handleUpdateItems}
				/>
			</DialogContent>
		</Dialog>
	);
};

export default ItemPickerDialog;