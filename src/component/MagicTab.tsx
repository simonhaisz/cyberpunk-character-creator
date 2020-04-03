import React, { FC } from "react";
import PropertyTree from "./PropertyTree";
import { useGlobalState, useDispatch } from "../context";
import { Spells, getCharacterSpellsCost } from "../model/magic";
import { ActionType, UpdateCharacterData } from "../reducer";
import { makeStyles } from "@material-ui/core";

const useStyles = makeStyles({
	root: {
	},
});

const MagicTab: FC = () => {
	const classes = useStyles();
	const dispatch = useDispatch();
	const character = useGlobalState("selectedCharacter");
	const { spells } = character;
	const allSpells = useGlobalState("allSpells");

	const cost = getCharacterSpellsCost(character);

	const onSpellsUpdated = (updatedSpells: Spells) => {
		const data: UpdateCharacterData = { ...character, spells: updatedSpells };
		dispatch({ type: ActionType.UpdateCharacter, data });
	};
	return (
		<div className={classes.root}>
			<PropertyTree rootCost={cost} rootName="spells" rootValue={spells} rootAll={allSpells} onRootUpdated={onSpellsUpdated} />
		</div>
	);
};

export default MagicTab;