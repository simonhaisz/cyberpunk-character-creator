import React, { FC } from "react";
import { useGlobalState } from "../context";

import { Skill as SkillData } from "../model/character";
import Property from "./Property";

type Props = {
    skill: SkillData;
	onUpdate: (skill: SkillData) => void;
	computeCost: (rating: number) => number;
};

const Skill: FC<Props> = (props: Props) => {
    const { skill, onUpdate, computeCost } = props;

    const options = useGlobalState("selectedCharacter").options;

    let min: number;
    let max: number;
    let step: number;
    if (options.applyCharacterCreationLimits) {
        min = 1;
        max = 5;
        step = 2;
    } else {
        min = 1;
        max = 7;
        step = 1;
    }

    return (
        <Property
            property={skill}
            onUpdate={onUpdate}
            min={min}
            max={max}
            step={step}
            formatDisplayValue={value => value.toString()}
            computeCost={computeCost}
            />
    );
}

export default Skill;