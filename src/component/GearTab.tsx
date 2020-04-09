import React, { FC } from "react";
import PropertyTree from "./PropertyTree";
import { useGlobalState, useDispatch } from "../context";
import { ActionType, UpdateCharacterData } from "../reducer";

const GearTab: FC = () => {
	const dispatch = useDispatch();
	const character = useGlobalState("selectedCharacter");
	const { gear } = character;
	const allGear = useGlobalState("allGear");

	const cost = Number.NaN;

	const onGearUpdated = (updatedGear: any) => {
		const data: UpdateCharacterData = { ...character, gear: updatedGear };
		dispatch({ type: ActionType.UpdateCharacter, data });
	}

	return (
		<PropertyTree
			rootCost={cost}
			rootName="gear"
			rootValue={gear}
			rootAll={allGear}
			onRootUpdated={onGearUpdated}
		/>
	);
};

export default GearTab;