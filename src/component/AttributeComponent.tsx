import React, { FC } from "react";

import Slider from "@material-ui/core/Slider";
import Typography from "@material-ui/core/Typography";

import styled from "styled-components";

import { Attribute, MetaType } from "../model/character";
import { isArray } from "util";
import { getAttributeModifier, getAttributeCost } from "../model/attributes";

const Root = styled.div`
    display: flex;
    height: 50px;
`;

const StyledTypography = styled(Typography)`
    width: 100px;
`;

const SliderContainer = styled.div`
    width: 300px;
    margin-right: 10px;
`;

type Props = {
    attribute: Attribute;
    metaType: MetaType;
    onUpdate: (attribute: Attribute) => void;
};

export const AttributeComponent: FC<Props> = (props: Props) => {
    const { attribute, metaType, onUpdate } = props;
    const { name, rating } = attribute;
    const modifier = getAttributeModifier(metaType, attribute);

    const handleChange = (e: React.ChangeEvent<any>, rating: number | number[]) => {
        if (isArray(rating)) {
            throw new Error(`Attribute element '${e.target.id}' has an array of values instead of a single value: [${rating.join(", ")}]`);
        }
        onUpdate({
            name,
            rating: rating
        });
    }

    return (
        <Root>
            <StyledTypography gutterBottom>{name}</StyledTypography>
            <SliderContainer>
                <Slider
                    defaultValue={rating}
                    step={1}
                    min={1}
                    max={6}
                    marks
                    valueLabelDisplay="on"
                    onChange={handleChange}
                    valueLabelFormat={(value: number, _index: number) => (value + modifier).toString()}
                />
            </SliderContainer>
            <StyledTypography gutterBottom>({getAttributeCost(attribute)})</StyledTypography>
        </Root>
    );
};