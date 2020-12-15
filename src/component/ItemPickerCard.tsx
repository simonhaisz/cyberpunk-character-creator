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
import { Grade, gearRoot, isItemAvailable } from "../model/gear";
import GradeButton from "./GradeButton";
import { useGlobalState } from "../context";
import { doesAdeptPowerHaveLevels, powersRoot } from "../model/magic";

const useStyles = makeStyles({
	root: {
		display: "flex",
		flexDirection: "row",
		padding: 10,
		margin: 10,
	},
	name: {
		width: 500,
		textAlign: "left",
	},
	availability: {
		width: 100,
		textAlign: "center",
	},
	cost: {
		width: 200,
		textAlign: "center",
	},
	buttons: {
		width: 200,
		display: "flex",
		flexDirection: "row",
		justifyContent: "center"
	}
});

type Props = {
	item: Item;
	createCostLabel: (item: Item) => string;
	onUpdateItem: (newItem: Item) => void;
};
const ItemPickerCard: FC<Props> = (props: Props) => {
	const { item, createCostLabel, onUpdateItem } = props;
	const allPowers = useGlobalState("allPowers");
	const options = useGlobalState("selectedCharacter").options;

	const classes = useStyles();

	const count = parseInt(item.count!);
	const costLabel = createCostLabel(item);

	const hasAny = count > 0;

	let allowMultiple: boolean;
	if (item.path.startsWith(gearRoot)) {
		allowMultiple = true;
	} else if (item.path.startsWith(`${powersRoot}.adept-powers`)) {
		allowMultiple = doesAdeptPowerHaveLevels(item, allPowers);
	} else {
		allowMultiple = false;
	}
	
	const includeAvailability = item.path.startsWith(gearRoot);
	const available = includeAvailability ? isItemAvailable(item.availability!, options.gearLevel) : true;
	const includeGrade = item.path.startsWith(`${gearRoot}.augmentations`);

	const grade = item.grade as Grade || Grade.Alpha;

	const handleAdd = () => {
		onUpdateItem({ ...item, count: (count + 1).toString() });
	};

	const handleRemove = () => {
		onUpdateItem({ ...item, count: Math.max(count - 1, 0).toString() });
	};

	const handleGradeToggle = (newGrade: Grade) => {
		const newItem: Item = { ...item, grade: newGrade };
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
			{
				includeAvailability ?
				<Typography className={classes.availability} style={{lineHeight: "36px"}}>{item.availability}</Typography>
				:
				null
			}
			<span className={classes.cost}>
				<Badge badgeContent={count} color="secondary">
					<Typography style={{lineHeight: "36px"}}>({costLabel})</Typography>
				</Badge>
			</span>
			<ButtonGroup className={classes.buttons}>
				{ allowMultiple || !hasAny ? <Button onClick={handleAdd} disabled={!available}><AddIcon /></Button> : null }
				{ allowMultiple || hasAny ? <Button onClick={handleRemove} disabled={!available}><RemoveIcon /></Button> : null }
				{ includeGrade ? <GradeButton disabled={count === 0} grade={grade} onUpdateGrade={handleGradeToggle} /> : null }
			</ButtonGroup>
		</Paper>
	);
};

export default ItemPickerCard;