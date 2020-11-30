import { makeStyles } from "@material-ui/core";
import React, { FC } from "react";
import { useDispatch, useGlobalState } from "../context";
import { getProfessionalismCost, NamedProperty } from "../model/character";
import { ActionType, UpdateCharacterData } from "../reducer";
import Property from "./Property";

const useStyles = makeStyles({
	root: {
		paddingTop: 50,
		paddingLeft: 16,
	},
});

const Professionalism: FC = () => {
	const dispatch = useDispatch();
	const classes = useStyles();
	const character = useGlobalState("selectedCharacter");
	const professionalism: NamedProperty = {
		name: "Professionalism",
		rating: character.professionalism
	};

	const formatDisplayValue = (rating: number): string => rating.toString();

	const handleOnUpdate = (newProfessionalism: NamedProperty) => {
		const data: UpdateCharacterData = { ...character };
		data.professionalism = newProfessionalism.rating;
		dispatch({
			type: ActionType.UpdateCharacter,
			data
		});
	}
	
	return (
		<div className={classes.root}>
			<Property
				property={professionalism}
				min={0}
				max={6}
				step={1}
				formatDisplayValue={formatDisplayValue}
				computeCost={getProfessionalismCost}
				onUpdate={handleOnUpdate}
				/>
		</div>
	);
}

export default Professionalism;