import React, { FC } from "react";
import Avatar from "@material-ui/core/Avatar";
import Typography from "@material-ui/core/Typography";
import Badge from "@material-ui/core/Badge";
import { Button, ButtonGroup, makeStyles } from "@material-ui/core";

const useStyles = makeStyles(theme => ({
	root: {
		display: "flex",
		flexDirection: "row",
		marginLeft: 10,
		marginTop: 10,
		alignItems: "center",
		marginRight: 5
	},
	label: {
		display: "flex",
		flexDirection: "column"
	},
	name: {
		lineHeight: "40px"
	},
	value: {
		marginLeft: 5,
		color: theme.palette.getContrastText(theme.palette.primary.main),
		backgroundColor: theme.palette.primary.main,
	},
	button: {
		padding: 0,
		marginLeft: 5,
		lineHeight: 1.2
	},
}));

type Props = {
	name: string;
	value: number;
	modifier: number;
	updateModifier: (newValue: number) => void;
}
const ModifiableProperty: FC<Props> = (props: Props) => {
	const { name, value, modifier, updateModifier } = props;

	const classes = useStyles();

	const onClickPlus = () => {
		updateModifier(modifier + 1);
	};
	const onClickMinus = () => {
		updateModifier(modifier - 1);
	};

	return (
		<div className={classes.root}>
			<Typography className={classes.name}>{name}</Typography>
			<Badge badgeContent={modifier} color="secondary" max={9}>
				<Avatar className={classes.value}>{value + modifier}</Avatar>
			</Badge>
			<ButtonGroup orientation="vertical">
				<Button className={classes.button} onClick={onClickPlus}>+</Button>
				<Button className={classes.button} onClick={onClickMinus}>-</Button>
			</ButtonGroup>
		</div>
	);
};

export default ModifiableProperty;