import React, { FC } from "react";
import { useGlobalState, useDispatch } from "../context";
import { ActionType, UpdateCharacterData } from "../reducer";
import { Item } from "../model/item";
import GroupContainer from "./GroupContainer";

const MagicTab: FC = () => {
	const dispatch = useDispatch();
	const character = useGlobalState("selectedCharacter");
	const { spells } = character;
	const allSpells = useGlobalState("allSpells");

	const createSpellCostLabel = (_item: Item) => {
		return "5";
	};

	const createSpellLabel = (item: Item) => {
		const { name } = item;
		return `${name} (5)`;
	};

	const handleUpdateSpells = (newSpells: Item[]) => {
		const data: UpdateCharacterData = { ...character, spells: newSpells };
		dispatch({ type: ActionType.UpdateCharacter, data });
	};
	return (
		<GroupContainer
			label="Spells"
			items={spells}
			allItems={allSpells}
			createItemLabel={createSpellLabel}
			createItemCostLabel={createSpellCostLabel}
			onUpdateItems={handleUpdateSpells}
		/>
	);
};

export default MagicTab;