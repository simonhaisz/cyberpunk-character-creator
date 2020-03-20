import React, { FC } from "react";

import Slider from "@material-ui/core/Slider";
import Typography from "@material-ui/core/Typography";

import styled from "styled-components";

import { NamedProperty } from "../model/character";

const Root = styled.div`
    display: flex;
    height: 50px;
`;

const StyledTypography = styled(Typography)`
    width: 200px;
`;

const SliderContainer = styled.div`
    width: 300px;
    margin-right: 10px;
`;

type Props = {
    property: NamedProperty;
    onUpdate: (property: NamedProperty) => void;
    min: number;
    max: number;
    step: number;
    formatDisplayValue: (rating: number) => string;
    computeCost: (rating: number) => number;
};

const Property: FC<Props> = (props: Props) => {
    const { property, onUpdate, min, max, step, formatDisplayValue, computeCost } = props;
    const { name, rating } = property;

    const handleChange = (e: React.ChangeEvent<any>, rating: number | number[]) => {
        if (Array.isArray(rating)) {
            throw new Error(`Property element '${e.target.id}' has an array of values instead of a single value: [${rating.join(", ")}]`);
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
                    step={step}
                    min={min}
                    max={max}
                    value={rating}
                    marks
                    valueLabelDisplay="on"
                    onChange={handleChange}
                    valueLabelFormat={(value: number, _index: number) => formatDisplayValue(value)}
                />
            </SliderContainer>
            <StyledTypography gutterBottom>({computeCost(rating)})</StyledTypography>
        </Root>
    );
};

export default Property;