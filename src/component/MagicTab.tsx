import React, { FC } from "react";
import PropertyTree from "./PropertyTree";
import { useGlobalState, useDispatch } from "../context";
import { Spells, getCharacterSpellsCost } from "../model/magic";
import { ActionType, UpdateCharacterData } from "../reducer";

const MagicTab: FC = () => {
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
		<PropertyTree rootCost={cost} rootName="spells" rootValue={spells} rootAll={allSpells} onRootUpdated={onSpellsUpdated} />
	);
};

export default MagicTab;