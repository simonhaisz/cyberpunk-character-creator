import React, { FC, Fragment, useState } from "react";
import { makeStyles } from '@material-ui/core/styles';
import Dialog from "@material-ui/core/Dialog";
import DialogContent from "@material-ui/core/DialogContent";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListItemText from "@material-ui/core/ListItemText";
import DialogTitle from "@material-ui/core/DialogTitle";
import Typography from "@material-ui/core/Typography";
import IconButton from "@material-ui/core/IconButton";
import AddIcon from "@material-ui/icons/Add";
import RemoveIcon from "@material-ui/icons/Remove";
import TextField from "@material-ui/core/TextField";
import { CustomItem } from "../model/custom-item";

export type SelectableItem = CustomItem & {
	selected: boolean;
};

const useStyles = makeStyles(({
	content: {
		width: "100%",
	},
	header: {
		display: "flex",
	},
	name: {
		minWidth: 300,
		maxWidth: 300,
		textAlign: "left",
	},
	availability: {
		minWidth: 100,
		maxWidth: 100,
		textAlign: "center",
	},
	cost: {
		minWidth: 100,
		maxWidth: 100,
		textAlign: "right",
	},
	ul: {
		padding: 0,
	},
}));

type Props = {
	open: boolean;
	onClose: () => void;
	title: string;
	items: SelectableItem[];
	onItemSelectionChange: (item: SelectableItem) => void;
	includeAvailability: boolean;
	includeCost: boolean;
	allowNewItems: boolean;
	allowMultiSelection: boolean;
};
const PickerDialog: FC<Props> = (props: Props) => {
	const { open, onClose, title, items, onItemSelectionChange, includeAvailability, includeCost, allowNewItems, allowMultiSelection } = props;

	const classes = useStyles();

	const [newItemName, setNewItemName] = useState("");
	const [newItemAvailability, setNewItemAvailability] = useState("");
	const [newItemCost, setNewItemCost] = useState("");

	const onUpdateNewItem = (event: React.ChangeEvent<HTMLInputElement>) => {
		const value = event.target.value;
		switch (event.target.id) {
			case "new-item-name": {
				setNewItemName(value);
				break;
			}
			case "new-item-availability": {
				setNewItemAvailability(value);
				break;
			}
			case "new-item-cost": {
				setNewItemCost(value);
				break;
			}
		}
	};

	const onCreateNewItem = () => {
		const item: SelectableItem = { Name: newItemName, selected: true };
		if (includeAvailability) {
			item.Availability = newItemAvailability;
		}
		if (includeCost) {
			item.Cost = newItemCost;
		}
		onItemSelectionChange(item);
		// clear the new item fields after adding a new item (don't want fat-finger duplicates)
		setNewItemName("");
		setNewItemAvailability("");
		setNewItemCost("");
	};

	return (
		<Dialog open={open} onClose={onClose}>
			<DialogTitle>{title}</DialogTitle>
			<DialogContent className={classes.content}>
				<List>
					<ListItem key="header" className={classes.header}>
						<Typography className={classes.name}>Name</Typography>
						{ includeAvailability ? <Typography className={classes.availability}>i.availability</Typography> : null }
						{ includeCost ? <Typography className={classes.cost}>Cost</Typography> : null }
					</ListItem>
					{
						allowNewItems ?
						<ListItem key="new-item">
							<TextField id="new-item-name" label="Custom" value={newItemName} onChange={onUpdateNewItem} className={classes.name} variant="outlined" />
							{ includeAvailability ? <TextField id="new-item-availability" label="Availability" value={newItemAvailability} onChange={onUpdateNewItem} className={classes.availability} variant="outlined" /> : null }
							{ includeCost ? <TextField id="new-item-cost" label="Cost" value={newItemCost} onChange={onUpdateNewItem} className={classes.cost} variant="outlined" /> : null }
							<IconButton aria-label="create" onClick={onCreateNewItem} color="secondary" size="small">
								<AddIcon />
							</IconButton>
						</ListItem>
						:
						null
					}
					{
						items.map(item => (
							<ListItem key={item.Name}>
								<ListItemText className={classes.name}>{item.Name}</ListItemText>
								{ includeAvailability ? <ListItemText className={classes.availability}>{item.Availability}</ListItemText> : null }
								{ includeCost ? <ListItemText className={classes.cost}>{item.Cost}</ListItemText> : null }
								{
									allowMultiSelection ?
									<Fragment>
										<IconButton aria-label="add" onClick={() => onItemSelectionChange({ ...item, selected: true })} color="secondary" size="small">
											<AddIcon />
										</IconButton>
										<IconButton aria-label="remove" onClick={() => onItemSelectionChange({ ...item, selected: false })} disabled={!item.selected} color="secondary" size="small">
											<RemoveIcon />
										</IconButton>
									</Fragment>
									:
									<IconButton aria-label={item.selected ? "remove" : "add"} onClick={() => onItemSelectionChange({ ...item, selected: !item.selected })} color="secondary" size="small">
										{ item.selected ? <RemoveIcon /> : <AddIcon /> }
									</IconButton>
								}
							</ListItem>
						))
					}
				</List>
			</DialogContent>
		</Dialog>
	);
};

export default PickerDialog;