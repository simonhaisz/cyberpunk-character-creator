import React, { FC } from "react";
import SpellList from "./SpellList";
import { useGlobalState, useDispatch } from "../context";
import { getSpellsCost } from "../model/magic";
import { UpdateCharacterData, ActionType } from "../reducer";

const ManipulationSpellList: FC = () => {
	const dispatch = useDispatch();
	const character = useGlobalState("selectedCharacter");
	const allSpells = useGlobalState("allSpells");

	const manipulationSpells = character.spells.manipulation;
	const manipulationSpellsCost = getSpellsCost(manipulationSpells);
	const headerLabel = `Manipulation (${manipulationSpellsCost})`;

	const allManipulationSpells = [...allSpells.manipulation];

	const onSpellsUpdated = (manipulation: string[]) => {
		const spells = { ...character.spells, manipulation };
		const data: UpdateCharacterData = { ...character, spells };
        dispatch({ type: ActionType.UpdateCharacter, data });
	};

	return (
		<SpellList
			breadcrums={["Spells", "Manipulation"]}
			spells={manipulationSpells}
			allSpells={allManipulationSpells}
			headerLabel={headerLabel}
			onSpellsUpdated={onSpellsUpdated}
		/>
	);
};

export default ManipulationSpellList;