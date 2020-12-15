import React, { FC, Fragment } from "react";
import { useGlobalState, useDispatch } from "../context";
import { ActionType, UpdateCharacterData } from "../reducer";
import { Item } from "../model/item";
import GroupContainer from "./GroupContainer";
import { computeAdeptPowerCost } from "../model/magic";

const MagicTab: FC = () => {
	const dispatch = useDispatch();
	const character = useGlobalState("selectedCharacter");
	const { spells, powers } = character;
	const allSpells = useGlobalState("allSpells");
	const allPowers = useGlobalState("allPowers");

	const isMagician = character.qualities.find(q => q.name === "Magician");
	const isAdept = character.qualities.find(q => q.name === "Adept");

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

	const createPowerCostLabel = (item: Item) => {
		const cost = computeAdeptPowerCost(item, allPowers);
		return `${cost}`;
	};

	const createPowerLabel = (item: Item) => {
		const { name } = item;
		const cost = createPowerCostLabel(item);
		return `${name} (${cost})`;
	};

	const handleUpdatePowers = (newPowers: Item[]) => {
		const data: UpdateCharacterData = { ...character, powers: newPowers };
		dispatch({ type: ActionType.UpdateCharacter, data });
	};

	return (
		<Fragment>
			{
				isMagician ?
				<GroupContainer
					label="Spells"
					items={spells}
					allItems={allSpells}
					createItemLabel={createSpellLabel}
					createItemCostLabel={createSpellCostLabel}
					onUpdateItems={handleUpdateSpells}
				/>
				:
				null
			}
			{
				isAdept ?
				<GroupContainer
					label="Powers"
					items={powers}
					allItems={allPowers}
					createItemLabel={createPowerLabel}
					createItemCostLabel={createPowerCostLabel}
					onUpdateItems={handleUpdatePowers}
				/>
				:
				null
			}
		</Fragment>
	);
};

export default MagicTab;