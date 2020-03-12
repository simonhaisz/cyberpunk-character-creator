import React, { FC } from "react";

import { Skill } from "../model/character";
import { PropertyComponent } from "./PropertyComponent";
import { getActiveSkillCost } from "../model/skills";

type Props = {
    skill: Skill;
    onUpdate: (skill: Skill) => void;
};

function formatDisplayValue(value: number): string {
    if (value === -1) {
        return "-";
    }
    return value.toString();
}

export const SkillComponent: FC<Props> = (props: Props) => {
    const { skill, onUpdate } = props;

    return (
        <PropertyComponent property={skill} onUpdate={onUpdate} min={-1} max={5} step={2} formatDisplayValue={formatDisplayValue} computeCost={getActiveSkillCost} />
    );
}