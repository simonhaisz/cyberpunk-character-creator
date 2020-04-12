import React, { FC } from "react";
import { useDispatch, useGlobalState } from "../context";
import { Item } from "../model/item";
import { getItemCost } from "../model/dictionary";
import GroupContainer from "./GroupContainer";
import { ActionType, UpdateCharacterData } from "../reducer";

const QualitiesSection: FC = () => {
	const dispatch = useDispatch();
	const character = useGlobalState("selectedCharacter");
	const { qualities } = character;
	const allQualities = useGlobalState("allQualities");

	const createQualityCostLabel = (item: Item) => {
		const cost = getItemCost(item, allQualities);
		if (cost > 0) {
			return `+${cost}`;
		} else {
			return `${cost}`;
		}
	}

	const createQualityLabel = (item: Item) => {
		const { name } = item;
		const costLabel = createQualityCostLabel(item);
		return `${name} (${costLabel})`;
	};

	const handleUpdateQualities = (newQualities: Item[]) => {
		const data: UpdateCharacterData = { ...character, qualities: newQualities };
		dispatch({ type: ActionType.UpdateCharacter, data });
	};

	return (
		<GroupContainer
			label="Qualities"
			items={qualities}
			allItems={allQualities}
			createItemLabel={createQualityLabel}
			createItemCostLabel={createQualityCostLabel}
			onUpdateItems={handleUpdateQualities}
		/>
	);
};

export default QualitiesSection;