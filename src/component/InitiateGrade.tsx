import { makeStyles } from "@material-ui/core";
import React, { FC } from "react";
import { useDispatch, useGlobalState } from "../context";
import { NamedProperty } from "../model/character";
import { getInitiateGradeCost } from "../model/magic";
import { ActionType, UpdateCharacterData } from "../reducer";
import Property from "./Property";

const useStyles = makeStyles({
	root: {
		paddingTop: 50,
		paddingLeft: 16,
	},
});

const InitiateGrade: FC = () => {
	const dispatch = useDispatch();
	const classes = useStyles();
	const character = useGlobalState("selectedCharacter");
	const initiateGrade: NamedProperty = {
		name: "Initiate Grade",
		rating: character.initiateGrade
	};

	const formatDisplayValue = (rating: number): string => `${rating}`;

	const handleOnUpdate = (newInitiateGrade: NamedProperty) => {
		const data: UpdateCharacterData = { ...character };
		data.initiateGrade = newInitiateGrade.rating;
		dispatch({
			type: ActionType.UpdateCharacter,
			data
		});
	}
	
	return (
		<div className={classes.root}>
			<Property
				property={initiateGrade}
				min={0}
				max={6}
				step={1}
				formatDisplayValue={formatDisplayValue}
				computeCost={getInitiateGradeCost}
				onUpdate={handleOnUpdate}
				/>
		</div>
	);
}

export default InitiateGrade;