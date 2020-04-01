import React, { FC } from "react";

import { Skill as SkillData } from "../model/character";
import Property from "./Property";
import { getKnowledgeSkillCost } from "../model/skills";

type Props = {
    skill: SkillData;
    onUpdate: (skill: SkillData) => void;
};

function formatDisplayValue(value: number): string {
    if (value === -1) {
        return "-";
    }
    return value.toString();
}

const KnowledgeSkill: FC<Props> = (props: Props) => {
    const { skill, onUpdate } = props;

    return (
        <Property
            property={skill}
            onUpdate={onUpdate}
            min={1}
            max={5}
            step={2}
            formatDisplayValue={formatDisplayValue}
            computeCost={getKnowledgeSkillCost}
            />
    );
}

export default KnowledgeSkill;