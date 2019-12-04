import React, { FC } from "react";

import Slider from "@material-ui/core/Slider";
import Typography from "@material-ui/core/Typography";

import { Attribute } from "../model/character";
import { isArray } from "util";

type Props = {
    attribute: Attribute;
    onUpdate: (attribute: Attribute) => void;
};

export const AttributeComponent: FC<Props> = (props: Props) => {
    const { attribute, onUpdate } = props;
    const { name, rating } = attribute;

    const handleChange = (e: React.ChangeEvent<any>, rating: number | number[]) => {
        if (isArray(rating)) {
            throw new Error(`Attribute element '${e.target.id}' has an array of values instead of a single value: [${rating.join(", ")}]`);
        }
        onUpdate({
            name,
            rating
        });
    }

    return <>
        <Typography id={`attribute-${name}-label`} gutterBottom>{name}</Typography>
        <Slider
            defaultValue={rating}
            aria-labelledBy={`attribute-${name}-label`}
            step={1}
            min={1}
            max={6}
            marks
            valueLabelDisplay="on"
            onChange={handleChange}
        />
    </>;
};