import React, { FC } from "react";
import { useDispatch, useGlobalState } from "../context"
import { Skill as SkillData } from "../model/character";
import { ActionType, UpdateCharacterData } from "../reducer";
import { getKnowledgeSkillsCost, getFreeKnowledgeSkillPoints, getKnowledgeSkillCost } from "../model/skills";
import SkillList from "./SkillList";

const breadcrums = ["Skills", "Knowledge"];

const KnowledgeSkills: FC = () => {
    const dispatch = useDispatch();
    const character = useGlobalState("selectedCharacter");
	const allSkills = useGlobalState("skills");

	const { knowledgeSkills } = character;

	const knowledgeSkillsCost = getKnowledgeSkillsCost(knowledgeSkills);
    const freeKnowledgeSkillPoints = getFreeKnowledgeSkillPoints(character);
    const totalCost = knowledgeSkillsCost - freeKnowledgeSkillPoints;
    const headerLabel = `Knowledge Skills (${knowledgeSkillsCost} - ${freeKnowledgeSkillPoints} = ${totalCost})`;

    const allKnowledgeSkills = [...allSkills.knowledge];

    const onSkillsUpdated = (knowledgeSkills: SkillData[]) => {
        const data: UpdateCharacterData = { ...character, knowledgeSkills };
        dispatch({ type: ActionType.UpdateCharacter, data });
    };

    return (
        <SkillList
            breadcrums={breadcrums}
            skills={knowledgeSkills}
            allSkills={allKnowledgeSkills}
            headerLabel={headerLabel}
            computeSkillCost={getKnowledgeSkillCost}
            onSkillsUpdated={onSkillsUpdated}
        />
    );
}

export default KnowledgeSkills;