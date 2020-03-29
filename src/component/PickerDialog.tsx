import React, { FC, Fragment } from "react";
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

export type SelectableItem = {
	name: string;
	cost: string;
	availability?: string;
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
	onItemSelectionChange: (index: number, selected: boolean) => void;
	includeAvailability: boolean;
	allowMultiSelection: boolean;
};
const PickerDialog: FC<Props> = (props: Props) => {
	const { open, onClose, title, items, onItemSelectionChange, includeAvailability, allowMultiSelection } = props;

	const classes = useStyles();

	return (
		<Dialog open={open} onClose={onClose}>
			<DialogTitle>{title}</DialogTitle>
			<DialogContent className={classes.content}>
				<List>
					<ListItem key="header" className={classes.header}>
						<Typography className={classes.name}>Name</Typography>
						{ includeAvailability ? <Typography className={classes.availability}>i.availability</Typography> : null }
						<Typography className={classes.cost}>Cost</Typography>
					</ListItem>
					{
						items.map((item, index) => (
							<ListItem key={item.name}>
								<ListItemText className={classes.name}>{item.name}</ListItemText>
								{ includeAvailability ? <ListItemText className={classes.availability}>i.availability</ListItemText> : null }
								<ListItemText className={classes.cost}>{item.cost}</ListItemText>
								{
									allowMultiSelection ?
									<Fragment>
										<IconButton aria-label="add" onClick={() => onItemSelectionChange(index, true)} color="secondary" size="small">
											<AddIcon />
										</IconButton>
										<IconButton aria-label="remove" onClick={() => onItemSelectionChange(index, false)} disabled={!item.selected} color="secondary" size="small">
											<RemoveIcon />
										</IconButton>
									</Fragment>
									:
									<IconButton aria-label={item.selected ? "remove" : "add"} onClick={() => onItemSelectionChange(index, !item.selected)} color="secondary" size="small">
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