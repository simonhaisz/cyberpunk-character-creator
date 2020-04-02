import React, { FC } from "react";
import SpellList from "./SpellList";
import { useGlobalState, useDispatch } from "../context";
import { getSpellsCost } from "../model/magic";
import { UpdateCharacterData, ActionType } from "../reducer";

const DetectionSpellList: FC = () => {
	const dispatch = useDispatch();
	const character = useGlobalState("selectedCharacter");
	const allSpells = useGlobalState("allSpells");

	const detectionSpells = character.spells.detection;
	const detectionSpellsCost = getSpellsCost(detectionSpells);
	const headerLabel = `Detection (${detectionSpellsCost})`;

	const allDetectionSpells = [...allSpells.detection];

	const onSpellsUpdated = (detection: string[]) => {
		const spells = { ...character.spells, detection };
		const data: UpdateCharacterData = { ...character, spells };
        dispatch({ type: ActionType.UpdateCharacter, data });
	};

	return (
		<SpellList
			breadcrums={["Spells", "Detection"]}
			spells={detectionSpells}
			allSpells={allDetectionSpells}
			headerLabel={headerLabel}
			onSpellsUpdated={onSpellsUpdated}
		/>
	);
};

export default DetectionSpellList;