import React, { FC, Fragment } from "react";
import { makeStyles } from "@material-ui/core";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListSubheader from "@material-ui/core/ListSubheader";
import Typography from "@material-ui/core/Typography";
import Quality from "./Quality";
import { useDispatch, useGlobalState } from "../context";
import { Character } from "../model/character";
import { Quality as QualityData, getQualitiesCost } from "../model/quality";
import { ActionType } from "../reducer";
import PickerButton from "./PickerButton";

const useStyles = makeStyles({
    header: {
        display: "flex",
        flexDirection: "row"
    },
    headerLabel: {
        marginLeft: 5,
        marginRight: 10
    }
});

const findQuality = (name: string, qualities: QualityData[]): QualityData => {
    const quality = qualities.find(q => q.Name === name);
    if (!quality) {
        throw new Error(`Could not find quality with name '${name}'`);
    }
    return quality;
}

const Qualities: FC = () => {
    const classes = useStyles();
    const dispatch = useDispatch();
    const character = useGlobalState("selectedCharacter");
    const allQualities = useGlobalState("qualities");
    const { qualities: selectedQualities } = character;

    const positiveCost = getQualitiesCost(selectedQualities.positive, allQualities.positive);
    const negativeCost = getQualitiesCost(selectedQualities.negative, allQualities.negative);
    const totalCost = positiveCost + negativeCost;

    const positive = selectedQualities.positive.map(name => findQuality(name, allQualities.positive));
    const negative = selectedQualities.negative.map(name => findQuality(name, allQualities.negative));

    const updateQualities = (positive: boolean, add: boolean, name: string) => {
        const newQualities = { ...selectedQualities };
        let updatedQualities = positive ? newQualities.positive : newQualities.negative;
        if (add) {
            updatedQualities.push(name);
        } else {
            const index = updatedQualities.findIndex(q => q === name);
            if (index < 0) {
                throw new Error(`Could not find quality with name '${name}'`);
            }
            updatedQualities.splice(index, 1);
        }
        updatedQualities.sort();
        const data: Character = { ...character, qualities: newQualities };
        dispatch({ type: ActionType.UpdateCharacter, data });
    };
    const addPositive = (name: string) => updateQualities(true, true, name);
    const removePositive = (name: string) => updateQualities(true, false, name);
    const addNegative = (name: string) => updateQualities(false, true, name);
    const removeNegative = (name: string) => updateQualities(false, false, name);

    const positivePicker =
        <PickerButton
            breadcrums={["Qualities", "Positive"]}
            values={allQualities.positive}
            selectedValueNames={selectedQualities.positive}
            addValue={addPositive}
            removeValue={removePositive}
            includeCost
        />;

    const negativePicker =
        <PickerButton
            breadcrums={["Qualities", "Negative"]}
            values={allQualities.negative}
            selectedValueNames={selectedQualities.negative}
            addValue={addNegative}
            removeValue={removeNegative}
            includeCost
        />;

    return (
        <Fragment>
            <div className={classes.header}>
                <Typography gutterBottom variant="h6" className={classes.headerLabel}>Qualities ({totalCost})</Typography>
            </div>
            <List subheader={<ListSubheader>Positive Qualities ({positiveCost}){positivePicker}</ListSubheader>}>
            {
                positive.map(q => (
                    <ListItem key={q.Name}>
                        <Quality quality={q} />
                    </ListItem>
                ))
            }
            </List>
            <List subheader={<ListSubheader>Negative Qualities ({negativeCost}){negativePicker}</ListSubheader>}>
            {
                negative.map(q => (
                    <ListItem key={q.Name}>
                        <Quality quality={q} />
                    </ListItem>
                ))
            }
            </List>
        </Fragment>
    );
}

export default Qualities;