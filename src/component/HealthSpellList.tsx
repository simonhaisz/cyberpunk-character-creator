import React, { FC } from "react";
import SpellList from "./SpellList";
import { useGlobalState, useDispatch } from "../context";
import { getSpellsCost } from "../model/magic";
import { UpdateCharacterData, ActionType } from "../reducer";

const HealthSpellList: FC = () => {
	const dispatch = useDispatch();
	const character = useGlobalState("selectedCharacter");
	const allSpells = useGlobalState("allSpells");

	const healthSpells = character.spells.health;
	const healthSpellsCost = getSpellsCost(healthSpells);
	const headerLabel = `Health (${healthSpellsCost})`;

	const allHealthSpells = [...allSpells.health];

	const onSpellsUpdated = (health: string[]) => {
		const spells = { ...character.spells, health };
		const data: UpdateCharacterData = { ...character, spells };
        dispatch({ type: ActionType.UpdateCharacter, data });
	};

	return (
		<SpellList
			breadcrums={["Spells", "Health"]}
			spells={healthSpells}
			allSpells={allHealthSpells}
			headerLabel={headerLabel}
			onSpellsUpdated={onSpellsUpdated}
		/>
	);
};

export default HealthSpellList;