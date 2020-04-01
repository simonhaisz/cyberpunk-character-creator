import React, { FC } from "react";
import { useDispatch, useGlobalState } from "../context"
import { Skill as SkillData } from "../model/character";
import { ActionType, UpdateCharacterData } from "../reducer";
import { getKnowledgeSkillsCost, getKnowledgeSkillCost } from "../model/skills";
import SkillList from "./SkillList";

const breadcrums = ["Skills", "Language"];

const LanguageSkillList: FC = () => {
    const dispatch = useDispatch();
    const character = useGlobalState("selectedCharacter");
	const allSkills = useGlobalState("allSkills");

	const { languageSkills } = character;

	const languageSkillsCost = getKnowledgeSkillsCost(languageSkills);
    const headerLabel = `Language Skills (${languageSkillsCost}) +Native`;

    const allLanguageSkills = [...allSkills.language];

    const onSkillsUpdated = (languageSkills: SkillData[]) => {
        const data: UpdateCharacterData = { ...character, languageSkills };
        dispatch({ type: ActionType.UpdateCharacter, data });
    };

    return (
        <SkillList
            breadcrums={breadcrums}
            skills={languageSkills}
            allSkills={allLanguageSkills}
            headerLabel={headerLabel}
            computeSkillCost={getKnowledgeSkillCost}
            onSkillsUpdated={onSkillsUpdated}
        />
    );
}

export default LanguageSkillList;