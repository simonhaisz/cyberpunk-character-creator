import React, { FC } from "react";
import { Item } from "../model/item";
import Badge from "@material-ui/core/Badge";
import ButtonGroup from "@material-ui/core/ButtonGroup";
import Button from "@material-ui/core/Button";
import Paper from "@material-ui/core/Paper";
import Typography from "@material-ui/core/Typography";
import AddIcon from "@material-ui/icons/Add";
import RemoveIcon from "@material-ui/icons/Remove";
import { makeStyles } from "@material-ui/core";

const useStyles = makeStyles({
	root: {
		display: "flex",
		flexDirection: "row",
		padding: 10,
		margin: 10,
	},
	name: {
		width: 400,
		textAlign: "left",
	},
	cost: {
		width: 150,
	},
});

type Props = {
	item: Item;
	onUpdateItem: (item: Item) => void;
};
const ItemPickerCard: FC<Props> = (props: Props) => {
	const { item, onUpdateItem } = props;

	const classes = useStyles();

	const count = parseInt(item.count);

	const handleAdd = () => {
		onUpdateItem({ ...item, count: (count + 1).toString() });
	};

	const handleRemove = () => {
		onUpdateItem({ ...item, count: Math.max(count - 1, 0).toString() });
	}

	return (
		<Paper
			className={classes.root}
			elevation={3}
		>
			<Typography className={classes.name} style={{lineHeight: "36px"}}>{item.name}</Typography>
			<span className={classes.cost}>
				<Badge badgeContent={count} color="secondary">
					<Typography style={{lineHeight: "36px"}}>({item.cost})</Typography>
				</Badge>
			</span>
			<ButtonGroup>
				<Button onClick={handleAdd}>
					<AddIcon />
				</Button>
				<Button onClick={handleRemove}>
					<RemoveIcon />
				</Button>
			</ButtonGroup>
		</Paper>
	);
};

export default ItemPickerCard;