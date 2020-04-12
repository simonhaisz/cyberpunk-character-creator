import React, { FC } from "react";
import Avatar from "@material-ui/core/Avatar";
import Typography from "@material-ui/core/Typography";
import { makeStyles } from "@material-ui/core";

const useStyles = makeStyles(theme => ({
	root: {
		display: "flex",
		flexDirection: "row",
		marginLeft: 10,
		marginTop: 10,
	},
	name: {
		lineHeight: "40px"
	},
	value: {
		marginLeft: 5,
		color: theme.palette.getContrastText(theme.palette.primary.main),
		backgroundColor: theme.palette.primary.main,
	}
}));

type Props = {
	name: string;
	value: number;
}
const ReadOnlyProperty: FC<Props> = (props: Props) => {
	const { name, value } = props;

	const classes = useStyles();

	return (
		<div className={classes.root}>
			<Typography className={classes.name}>{name}</Typography>
			<Avatar className={classes.value}>{value}</Avatar>
		</div>
	);
};

export default ReadOnlyProperty;