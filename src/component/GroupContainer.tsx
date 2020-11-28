import React, { FC } from "react";
import ExpansionPanel from "@material-ui/core/ExpansionPanel";
import ExpansionPanelSummary from "@material-ui/core/ExpansionPanelSummary";
import ExpansionPanelDetails from "@material-ui/core/ExpansionPanelDetails";
import Typography from "@material-ui/core/Typography";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import ExpandMoreIcon from "@material-ui/icons/ExpandMore";
import { Dictionary } from "../model/dictionary";
import { Item } from "../model/item";
import ChipCollection from "./ChipCollection";
import { makeStyles } from "@material-ui/core";
import ItemPickerButton from "./ItemPickerButton";
import { computeItemCost } from "../model/gear";
import { useGlobalState } from "../context";

const useStyles = makeStyles({
    headerLabel: {
        lineHeight: 3,
        fontWeight: 700,
    },
});


type Props = {
	label: string;
	items: Item[];
	allItems: Dictionary<Item[]>;
	createItemLabel: (item: Item) => string;
	createItemCostLabel: (item: Item) => string;
	onUpdateItems: (newItems: Item[]) => void;
};
const GroupContainer: FC<Props> = (props: Props) => {
	const { label, items, allItems, createItemLabel, createItemCostLabel, onUpdateItems } = props;
	const options = useGlobalState("selectedCharacter").options;

	const classes = useStyles();

	let cost = 0;
	for (const item of items) {
		cost += computeItemCost(item, allItems, options.applyCharacterCreationLimits) * parseInt(item.count!);
	}

	const flatItems: Item[] = [];
	for (const path of Object.keys(allItems)) {
		flatItems.push(...allItems[path]);
	}

	const handleDelete = (toDelete: Item) => {
		const newItems = [...items];
		const index = newItems.findIndex(i => i.name === toDelete.name);
		if (index < 0) {
			throw new Error(`Could not find item '${toDelete.name}' to delete in list '${JSON.stringify(newItems)}'`);
		}
		newItems.splice(index, 1);
		onUpdateItems(newItems);
	};

	const handleUpdateItems = (newItems: Item[]) => {
		onUpdateItems(newItems);
	};

	return (
		<ExpansionPanel defaultExpanded={false}>
			<ExpansionPanelSummary expandIcon={<ExpandMoreIcon />} >
				<FormControlLabel
					onClick={(event) => event.stopPropagation()}
					onFocus={(event) => event.stopPropagation()}
					control={<ItemPickerButton
						title={label}
						items={items}
						allItems={allItems}
						createCostLabel={createItemCostLabel}
						onUpdateItems={handleUpdateItems}
					/>}
					label=""
				/>
				<Typography className={classes.headerLabel}>{label} ({cost})</Typography>
			</ExpansionPanelSummary>
			<ExpansionPanelDetails>
				<ChipCollection
					values={items}
					createChipLabel={createItemLabel}
					onDeleteValue={handleDelete}
				/>
			</ExpansionPanelDetails>
		</ExpansionPanel>
	);
};

export default GroupContainer;