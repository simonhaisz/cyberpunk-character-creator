import React, { FC } from "react";

import { Skill as SkillData } from "../model/character";
import Property from "./Property";

type Props = {
    skill: SkillData;
	onUpdate: (skill: SkillData) => void;
	computeCost: (rating: number) => number;
};

const Skill: FC<Props> = (props: Props) => {
    const { skill, onUpdate, computeCost } = props;

    return (
        <Property
            property={skill}
            onUpdate={onUpdate}
            min={1}
            max={5}
            step={2}
            formatDisplayValue={value => value.toString()}
            computeCost={computeCost}
            />
    );
}

export default Skill;