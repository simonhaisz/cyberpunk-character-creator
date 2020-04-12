import React, { FC } from "react";
import { Grade } from "../model/gear";
import Button from "@material-ui/core/Button";
import { makeStyles } from "@material-ui/core";

const useStyles = makeStyles({
	root: {
		minWidth: 78,
		maxWidth: 78,
		width: 78,
	},
})
type Props = {
	disabled: boolean;
	grade: Grade;
	onUpdateGrade: (newGrade: Grade) => void;
};
const GradeButton: FC<Props> = (props: Props) => {
	const { disabled, grade, onUpdateGrade } = props;

	const classes = useStyles();

	return (
		<Button
			className={classes.root}
			disabled={disabled}
			variant="outlined"
			onClick={() => onUpdateGrade(nextGrade(grade))}
		>
			{grade}
		</Button>
	);
};

export default GradeButton;

function nextGrade(grade: Grade): Grade {
	switch (grade)	 {
		case Grade.Used:
			return Grade.Alpha;
		case Grade.Alpha:
			return Grade.Beta;
		case Grade.Beta:
			return Grade.Delta;
		case Grade.Delta:
			return Grade.Used;
		default:
			throw new Error(`Unknown augmentation grade '${grade}'`);
	}
}