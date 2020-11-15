import React, { FC, Fragment } from "react";
import { useGlobalState, useDispatch } from "../context";
import { ActionType, UpdateCharacterData } from "../reducer";
import { getChildNames, getChildSet } from "../model/dictionary";
import GroupContainer from "./GroupContainer";
import { Item, getItemSubset } from "../model/item";
import { sentenceCase } from "change-case";
import { gearRoot, computeItemCost, Grade } from "../model/gear";

const GearTab: FC = () => {
	const dispatch = useDispatch();
	const character = useGlobalState("selectedCharacter");
	const options = useGlobalState("options");
	const { gear } = character;
	const allGear = useGlobalState("allGear");

	const createGearCostLabel = (item: Item) => {
		const cost = computeItemCost(item, allGear, options.applyCharacterCreationLimits);
		return `¥${cost}`;
	};

	const createGearLabel= (item: Item) => {
		const { name } = item;
		const costLabel = createGearCostLabel(item);
		let label = `${name} (${costLabel})`;
		const includeGrade = item.path.startsWith(`${gearRoot}.augmentations`);
		if (includeGrade) {
			label += ` [${item.grade || Grade.Alpha}]`;
		}
		return label;
	};

	const handleUpdateGear = (name: string, newSubGear: Item[]) => {
		const newGear = gear.filter(g => !g.path.startsWith(`${gearRoot}.${name}`));
		newGear.push(...newSubGear);
		const data: UpdateCharacterData = { ...character, gear: newGear };
		dispatch({ type: ActionType.UpdateCharacter, data });
	};

	return (
		<Fragment>
			{
				getChildNames(allGear, gearRoot).map(name =>
					<GroupContainer
						key={name}
						label={sentenceCase(name)}
						items={getItemSubset(gear, `${gearRoot}.${name}`)}
						allItems={getChildSet(allGear, `${gearRoot}.${name}`)}
						createItemLabel={createGearLabel}
						createItemCostLabel={createGearCostLabel}
						onUpdateItems={newItems => handleUpdateGear(name, newItems)}
					/>
				)
			}
		</Fragment>
	);
};

export default GearTab;