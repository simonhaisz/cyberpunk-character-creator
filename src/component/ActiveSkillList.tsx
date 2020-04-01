import React, { FC } from "react";
import { useDispatch, useGlobalState } from "../context"
import { Skill as SkillData } from "../model/character";
import { ActionType, UpdateCharacterData } from "../reducer";
import { getActiveSkillsCost, getActiveSkillCost } from "../model/skills";
import SkillList from "./SkillList";

const breadcrums = ["Skills", "Active"];

const ActiveSkillList: FC = () => {
    const dispatch = useDispatch();
    const character = useGlobalState("selectedCharacter");
    const allSkills = useGlobalState("allSkills");

    const { activeSkills } = character;

    const activeSkillsCost = getActiveSkillsCost(activeSkills);
    const headerLabel = `Active Skills (${activeSkillsCost})`;

    const allActiveSkills = [...allSkills.active];

    const onSkillsUpdated = (activeSkills: SkillData[]) => {
        const data: UpdateCharacterData = { ...character, activeSkills };
        dispatch({ type: ActionType.UpdateCharacter, data });
    }
    return (
        <SkillList
            breadcrums={breadcrums}
            skills={activeSkills}
            allSkills={allActiveSkills}
            headerLabel={headerLabel}
            computeSkillCost={getActiveSkillCost}
            onSkillsUpdated={onSkillsUpdated}
        />
    );
}

export default ActiveSkillList;