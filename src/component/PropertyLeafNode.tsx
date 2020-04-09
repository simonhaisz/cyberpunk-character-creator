import React, { FC, Fragment } from "react";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListItemText from "@material-ui/core/ListItemText";
import Typography from "@material-ui/core/Typography";
import { makeStyles } from "@material-ui/core";
import { useGlobalState, useDispatch } from "../context";
import PickerButton from "./PickerButton";
import { Item, getChildItems } from "../model/custom-item";
import { AddCustomItemData, ActionType } from "../reducer";

const useStyles = makeStyles({
	header: {
		display: "flex",
		flexDirection: "row",
	},
	headerLabel: {
		lineHeight: 3,
		marginLeft: 16
	},
});

type Props = {
	fontWeight: number;
	breadcrums: string[];
	names: string[];
	allValues: Item[];
	onNamesUpdated: (updatedValues: string[]) => void;
};
const PropertyLeafNode: FC<Props> = (props: Props) => {
	const { fontWeight, breadcrums, names, allValues, onNamesUpdated } = props;

	const classes = useStyles();
	const dispatch = useDispatch();

	names.sort();

	const customItems = useGlobalState("customItems");

	const parentPath = breadcrums.join(".");
    allValues.push(...getChildItems(customItems, parentPath));
    allValues.sort((a, b) => {
		if (a.Name === undefined || b.Name === undefined) {
			throw new Error(`Value missing 'Name' property under '${parentPath}': ${JSON.stringify(allValues)}`);
		}
		return a.Name.localeCompare(b.Name)
	});

	const header = breadcrums[breadcrums.length - 1];

	const getCost = (name: string): number => {
		const value = allValues.find(v => v.Name === name);
		if (!value) {
			throw new Error(`Could not find value with name '${name}'`);
		}
		return parseInt(value.Cost!);
	};

	const addValue = (name: string) => {
		const newValues = [...names, name];
		onNamesUpdated(newValues);
	};

	const removeValue = (name: string) => {
		const newValues = [...names];
		const index = newValues.findIndex(v => v === name);
		if (index < 0) {
			throw new Error(`Could not find value with name '${name}'`);
		}
		newValues.splice(index, 1);
		onNamesUpdated(newValues);
	};

	const createNewValue = (item: Item) => {
		const path = `${parentPath}.${item.Name}`;
        const data: AddCustomItemData = { path, item: item };
        dispatch({ type: ActionType.AddCustomItem, data });
	}

	return (
		<Fragment>
			<div className={classes.header}>
				<PickerButton
					breadcrums={breadcrums}
					values={allValues}
					selectedValueNames={names}
					addValue={addValue}
					removeValue={removeValue}
					allowNewValues
					createValue={createNewValue}
					includeCost
				/>
				<Typography className={classes.headerLabel} style={{fontWeight}}>{header}</Typography>
			</div>
			<List>
				{
					names.map(n => (
						<ListItem key={n}>
							<ListItemText>{n} ({getCost(n)})</ListItemText>
						</ListItem>
					))
				}
			</List>
		</Fragment>
	);
};

export default PropertyLeafNode;