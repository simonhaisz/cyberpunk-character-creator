import React, { FC } from "react";
import SpellList from "./SpellList";
import { useGlobalState, useDispatch } from "../context";
import { getSpellsCost } from "../model/magic";
import { UpdateCharacterData, ActionType } from "../reducer";

const CombatSpellList: FC = () => {
	const dispatch = useDispatch();
	const character = useGlobalState("selectedCharacter");
	const allSpells = useGlobalState("allSpells");

	const combatSpells = character.spells.combat;
	const combatSpellsCost = getSpellsCost(combatSpells);
	const headerLabel = `Combat (${combatSpellsCost})`;

	const allCombatSpells = [...allSpells.combat];

	const onSpellsUpdated = (combat: string[]) => {
		const spells = { ...character.spells, combat };
		const data: UpdateCharacterData = { ...character, spells };
        dispatch({ type: ActionType.UpdateCharacter, data });
	};

	return (
		<SpellList
			breadcrums={["Spells", "Combat"]}
			spells={combatSpells}
			allSpells={allCombatSpells}
			headerLabel={headerLabel}
			onSpellsUpdated={onSpellsUpdated}
		/>
	);
};

export default CombatSpellList;