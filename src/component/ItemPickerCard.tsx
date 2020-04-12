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
import { Grade, gearRoot } from "../model/gear";
import GradeButton from "./GradeButton";

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
	createCostLabel: (item: Item) => string;
	onUpdateItem: (newItem: Item) => void;
};
const ItemPickerCard: FC<Props> = (props: Props) => {
	const { item, createCostLabel, onUpdateItem } = props;

	const classes = useStyles();

	const count = parseInt(item.count);
	const costLabel = createCostLabel(item);

	const hasAny = count > 0;

	const allowMultiple = item.path.startsWith(gearRoot);

	const includeGrade = item.path.startsWith(`${gearRoot}.augmentations`);

	const grade = item.grade as Grade || Grade.Alpha;

	const handleAdd = () => {
		onUpdateItem({ ...item, count: (count + 1).toString() });
	};

	const handleRemove = () => {
		onUpdateItem({ ...item, count: Math.max(count - 1, 0).toString() });
	};

	const handleGradeToggle = (newGrade: Grade) => {
		const newItem = { ...item, grade: newGrade };
		// alpha is the default for cyber/bio and we don't want to 'dirty' all gear items with unnecessary grade properties
		// if it is never toggled it will never get added in the first place, so do not need to consider grade in the add/remove handlers
		if (newGrade === Grade.Alpha) {
			delete newItem.grade;
		}
		onUpdateItem(newItem);
	}

	return (
		<Paper
			className={classes.root}
			elevation={3}
		>
			<Typography className={classes.name} style={{lineHeight: "36px"}}>{item.name}</Typography>
			<span className={classes.cost}>
				<Badge badgeContent={count} color="secondary">
					<Typography style={{lineHeight: "36px"}}>({costLabel})</Typography>
				</Badge>
			</span>
			<ButtonGroup>
				{ allowMultiple || !hasAny ? <Button onClick={handleAdd}><AddIcon /></Button> : null }
				{ allowMultiple || hasAny ? <Button onClick={handleRemove}><RemoveIcon /></Button> : null }
				{ includeGrade ? <GradeButton disabled={count === 0} grade={grade} onUpdateGrade={handleGradeToggle} /> : null }
			</ButtonGroup>
		</Paper>
	);
};

export default ItemPickerCard;