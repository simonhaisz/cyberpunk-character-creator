import React, { FC } from "react";
import Select from "@material-ui/core/Select";
import FormControl from '@material-ui/core/FormControl';
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import { ALL_LEVELS, Level } from "../model/create-options";
import { makeStyles } from "@material-ui/core";

const useStyles = makeStyles({
    control: {
		margin: 8,
		minWidth: 100,
	},
	label: {
		padding: 4,
	},
});

type Props = {
	id: string;
	label: string;
	value: Level;
	updateValue: (newValue: Level) => void;
}
const LevelSelect: FC<Props> = (props: Props) => {
	const { id, label, value, updateValue } = props;
	const selectId = `${id}-level-select`;
	const labelId = `${selectId}-label`;

	const classes = useStyles();

	const handleOnChange = (event: React.ChangeEvent<{ name?: string; value: unknown }>, child: React.ReactNode) => {
		updateValue(event.target.value as Level);
	};

	return (
		<FormControl className={classes.control}>
			<InputLabel id={labelId} className={classes.label}>{label}</InputLabel>
			<Select
				labelId={labelId}
				id={selectId}
				value={value}
				onChange={handleOnChange}
				variant="outlined"
				>
					{
						ALL_LEVELS.map(l => <MenuItem key={l} value={l}>{l}</MenuItem>)
					}
			</Select>
		</FormControl>
	);
};

export default LevelSelect;