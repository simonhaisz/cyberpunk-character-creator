import React, { FC } from "react";
import PropertyTree from "./PropertyTree";
import { useGlobalState, useDispatch } from "../context";
import { Spells } from "../model/magic";
import { ActionType, UpdateCharacterData } from "../reducer";
import { makeStyles } from "@material-ui/core";

const useStyles = makeStyles({
	root: {
		marginTop: 12,
		marginLeft: 16,
	},
});

const MagicTab: FC = () => {
	const classes = useStyles();
	const dispatch = useDispatch();
	const character = useGlobalState("selectedCharacter");
	const { spells } = character;
	const allSpells = useGlobalState("allSpells");

	const onSpellsUpdated = (updatedSpells: Spells) => {
		const data: UpdateCharacterData = { ...character, spells: updatedSpells };
		dispatch({ type: ActionType.UpdateCharacter, data });
	};
	return (
		<div className={classes.root}>
			<PropertyTree rootName="spells" rootValue={spells} rootAll={allSpells} onRootUpdated={onSpellsUpdated} />
		</div>
	);
};

export default MagicTab;