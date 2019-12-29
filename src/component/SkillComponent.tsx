import React, { FC } from "react";
import Slider from "@material-ui/core/Slider";

import Typography from "@material-ui/core/Typography";

import styled from "styled-components";

import { Skill } from "../model/character";
import { isArray } from "util";

const Root = styled.div`
    display: flex;
`;

const StyledTypography = styled(Typography)`
    width: 100px;
`;

const SliderContainer = styled.div`
    width: 300px;
`;

type Props = {
    skill: Skill;
    onUpdate: (skill: Skill) => void;
};

export const SkillComponent: FC<Props> = (props: Props) => {
    const { skill, onUpdate } = props;
    const { name, rating, specialization } = skill;

    const handleRatingChange = (e: React.ChangeEvent<any>, rating: number | number[]) => {
        if (isArray(rating)) {
            throw new Error(`Attribute element '${e.target.id}' has an array of values instead of a single value: [${rating.join(", ")}]`);
        }
        onUpdate({
            name,
            rating,
            specialization
        });
    }

    return (
        <Root>
            <StyledTypography id={`skill-${name}-label`} gutterBottom>{name}</StyledTypography>
            <SliderContainer>
                <Slider
                    defaultValue={rating}
                    aria-labelledBy={`skill-${name}-label`}
                    step={2}
                    min={1}
                    max={5}
                    marks
                    valueLabelDisplay="on"
                    onChange={handleRatingChange}
                />
            </SliderContainer>
        </Root>
    );
}