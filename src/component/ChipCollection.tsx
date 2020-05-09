import React, { FC } from "react";
import Chip from "@material-ui/core/Chip";
import { makeStyles, Badge } from "@material-ui/core";

const useStyles = makeStyles({
	root: {
		display: "flex",
		flexDirection: "row",
		flexWrap: "wrap",
		justifyContent: "flex-start"
	},
	chip: {
		marginRight: 10,
		marginBottom: 10,
	}
});

type Props = {
	values: any[];
	createChipLabel: (value: any) => string;
	onDeleteValue: (value: any) => void;
};
const ChipCollection: FC<Props> = (props: Props) => {
	const { values, createChipLabel, onDeleteValue } = props;

	const classes = useStyles();

	return (
		<div className={classes.root}>
			{
				values.map(v =>
					<Badge badgeContent={v.count} invisible={v.count==="1"} color="secondary" max={99} anchorOrigin={{ vertical: "top", horizontal: "left" }}>
						<Chip
							className={classes.chip}
							color="primary"
							label={createChipLabel(v)}
							onDelete={() => onDeleteValue(v)}
						/>
					</Badge>
				)
			}
		</div>
	);
};

export default ChipCollection;