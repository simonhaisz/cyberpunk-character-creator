import React, { FC } from "react";

import Slider from "@material-ui/core/Slider";
import Typography from "@material-ui/core/Typography";

import { makeStyles } from '@material-ui/core/styles';

import { NamedProperty } from "../model/character";

const useStyles = makeStyles({
    root: {
        display: "flex",
        height: 50,
        marginTop: 20,
    },
    name: {
        width: 200
    },
    slider: {
        width: 300,
        marginRight: 10,
    },
});

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

    const classes = useStyles();

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
        <div className={classes.root}>
            <Typography gutterBottom className={classes.name}>{name}</Typography>
            <div className={classes.slider}>
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
            </div>
            <Typography gutterBottom>({computeCost(rating)})</Typography>
        </div>
    );
};

export default Property;