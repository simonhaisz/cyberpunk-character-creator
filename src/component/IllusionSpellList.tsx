import React, { FC } from "react";
import SpellList from "./SpellList";
import { useGlobalState, useDispatch } from "../context";
import { getSpellsCost } from "../model/magic";
import { UpdateCharacterData, ActionType } from "../reducer";

const IllusionSpellList: FC = () => {
	const dispatch = useDispatch();
	const character = useGlobalState("selectedCharacter");
	const allSpells = useGlobalState("allSpells");

	const illusionSpells = character.spells.illusion;
	const illusionSpellsCost = getSpellsCost(illusionSpells);
	const headerLabel = `Illusion (${illusionSpellsCost})`;

	const allIllusionSpells = [...allSpells.illusion];

	const onSpellsUpdated = (illusion: string[]) => {
		const spells = { ...character.spells, illusion };
		const data: UpdateCharacterData = { ...character, spells };
        dispatch({ type: ActionType.UpdateCharacter, data });
	};

	return (
		<SpellList
			breadcrums={["Spells", "Illusion"]}
			spells={illusionSpells}
			allSpells={allIllusionSpells}
			headerLabel={headerLabel}
			onSpellsUpdated={onSpellsUpdated}
		/>
	);
};

export default IllusionSpellList;