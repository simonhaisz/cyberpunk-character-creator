import React, { FC, Fragment, useState } from "react";
import IconButton from "@material-ui/core/IconButton";
import EditIcon from "@material-ui/icons/Edit";
import { makeStyles } from '@material-ui/core/styles';
import PickerDialog, { SelectableItem } from "./PickerDialog";

const NAME_INDEX = 0;
const COST = "Cost";
const AVAILABILITY = "Availability";

const findName = (value: any): string => {
	const nameProp = Object.keys(value)[NAME_INDEX];
	const name = value[nameProp];
	if (name === undefined) {
		throw new Error(`Could not find a name for value '${JSON.stringify(value)}'`);
	}
	return name as string;
};

const findCost = (value: any): string => {
	const cost = value[COST];
	if (cost === undefined) {
		throw new Error(`Could not find a cost for value '${JSON.stringify(value)}'`);
	}
	return cost;
};

const findAvailability = (value: any): string => {
	const availability = value[AVAILABILITY];
	if (availability === undefined) {
		throw new Error(`Could not find an availability for value '${JSON.stringify(value)}'`);
	}
	return availability;
};

const createSelectableItem = (value: any, selectedValueNames: string[], includeAvailability: boolean, includeCost: boolean): SelectableItem => {
	const Name = findName(value);
	const Availability = includeAvailability ? findAvailability(value) : undefined;
	const Cost = includeCost ? findCost(value) : undefined;
	const selected = selectedValueNames.find(n => n === Name) !== undefined;
	return { Name, Cost, Availability, selected	};
};

const useStyles = makeStyles({
    editButton: {
        paddingLeft: 10,
    },
});

type Props = {
	breadcrums: string[];
	values: any[];
	selectedValueNames: string[];
	addValue: (name: string) => void;
	removeValue: (name: string) => void;
	includeAvailability?: boolean;
	includeCost?: boolean;
	allowNewValues?: boolean;
	createValue?: (value: any) => void;
	allowMultiSelection?: boolean;
};
const PickerButton: FC<Props> = (props: Props) => {
	const { breadcrums, values, selectedValueNames, addValue, removeValue, includeAvailability=false, includeCost=false, allowNewValues: allowNewItems=false, createValue, allowMultiSelection=false } = props;
	
	const classes = useStyles();

	const [open, setOpen] = useState(false);
	const onOpen = () => setOpen(true);
	const onClose = () => setOpen(false);

	const title = breadcrums.join(" - ");

	const items = values.map(v => createSelectableItem(v, selectedValueNames, includeAvailability, includeCost));

	const onItemSelectionChange = (item: SelectableItem) => {
		const { Name, Availability, Cost, selected } = item;
		if (selected) {
			addValue(Name);
			if (values.find(v => findName(v) === Name) === undefined) {
				// new item
				const value = { Name, Availability, Cost };
				if (!createValue) {
					throw new Error(`Attempting to create new item '${JSON.stringify(value)}' with no createValue prop`);
				}
				createValue(value);
			}
		} else {
			removeValue(Name);
		}
	};

	return (
		<Fragment>
			<IconButton aria-label="add" onClick={onOpen} color="secondary" size="medium" className={classes.editButton} disableRipple>
				<EditIcon />
			</IconButton>
			<PickerDialog
				open={open}
				onClose={onClose}
				title={title}
				items={items}
				onItemSelectionChange={onItemSelectionChange}
				includeAvailability={includeAvailability}
				includeCost={includeCost}
				allowNewItems={allowNewItems}
				allowMultiSelection={allowMultiSelection}
			/>
		</Fragment>
	);
};

export default PickerButton;