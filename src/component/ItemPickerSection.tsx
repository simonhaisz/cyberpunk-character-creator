import React, { FC, Fragment } from "react";
import { Item } from "../model/item";
import Divider from "@material-ui/core/Divider";
import { makeStyles } from "@material-ui/core";
import ItemPickerCard from "./ItemPickerCard";

const useStyles = makeStyles({
	items: {
		display: "flex",
		flexDirection: "column",
	}
});

type Props = {
	label: string;
	items: Item[];
	createCostLabel: (item: Item) => string;
	onUpdateItems: (newItems: Item[]) => void;
};
const ItemPickerSection: FC<Props> = (props: Props) => {
	const { items, createCostLabel, onUpdateItems } = props;

	const classes = useStyles();

	const handleUpdate = (item: Item) => {
		const newItems = [...items];
		const index = items.findIndex(i => i.name === item.name);
		newItems[index] = item;
		onUpdateItems(newItems);
	};

	return (
		<Fragment>
			<Divider />
			<div className={classes.items}>
				{
					items
					?
					items.map(i =>
						<ItemPickerCard
							item={i}
							createCostLabel={createCostLabel}
							onUpdateItem={handleUpdate}
						/>
					)
					:
					<div>No items</div>
				}
			</div>
		</Fragment>
	);
};

export default ItemPickerSection;