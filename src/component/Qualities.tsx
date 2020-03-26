import React, { useState, FC, Fragment, useEffect } from "react";
import { makeStyles, FormControlLabel, Switch } from "@material-ui/core";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListSubheader from "@material-ui/core/ListSubheader";
import Typography from "@material-ui/core/Typography";
import Quality, { QualityControl } from "./Quality";
import { useDispatch, useGlobalState } from "../context";
import { Character } from "../model/character";
import { Quality as QualityData, Qualities as QualitiesData, getQualitiesCost } from "../model/quality";
import { ActionType } from "../reducer";

const useStyles = makeStyles({
    header: {
        display: "flex",
        flexDirection: "row"
    },
    headerLabel: {
        marginLeft: "5px",
        marginRight: "10px"
    }
});

const makeControl = (quality: QualityData, purchased: boolean): QualityControl => ({ ...quality, purchased });
const positiveFilter = (quality: QualityData): boolean => parseInt(quality.cost) > 0;
const negativeFilter = (quality: QualityData): boolean => parseInt(quality.cost) < 0;

const Qualities: FC = () => {
    const classes = useStyles();
    const dispatch = useDispatch();
    const character = useGlobalState("selectedCharacter");
    const { qualities } = character;

    const positive = qualities.filter(positiveFilter);
    const negative = qualities.filter(negativeFilter);

    const positiveCost = getQualitiesCost(positive);
    const negativeCost = getQualitiesCost(negative);
    const totalCost = positiveCost + negativeCost;

    const [allQualities, setAllQualities] = useState<QualitiesData>({ positive: [], negative: [] });

    useEffect(() => {
        fetch("/data/qualities.json")
            .then(response => response.json())
            .then(qualities => setAllQualities(qualities as QualitiesData))
            .catch(error => {
                console.error(`Error occured loading qualities: ${error.message}\n${error.stack}`);
            });
    }, []);

    const [showAllQualities, setShowAllQualities] = useState(qualities.length === 0);

    const onIncludeAllQualitiesChange = (_event: React.ChangeEvent<HTMLElement>, checked: boolean) => {
        setShowAllQualities(checked);
    };

    let shownPositive: QualityControl[];
    let shownNegative: QualityControl[];

    if (showAllQualities) {
        shownPositive = allQualities.positive.map(q => makeControl(q, false));
        for (const quality of positive) {
            const positive = shownPositive.find(q => q.name === quality.name);
            if (!positive) {
                throw new Error(`Could not find quality with name '${quality.name}'`);
            }
            positive.purchased = true;
        }
        shownNegative = allQualities.negative.map(q => makeControl(q, false));
        for (const quality of negative) {
            const negative = shownNegative.find(q => q.name === quality.name);
            if (!negative) {
                throw new Error(`Could not find quality with name '${quality.name}'`);
            }
            negative.purchased = true;
        }
    } else {
        shownPositive = positive.map(q => makeControl(q, true));
        shownNegative = negative.map(q => makeControl(q, true));
    }
    
    const onQualityUpdate = (quality: QualityControl) => {
        const newQualities = [...qualities];
        const qualityIndex = qualities.findIndex(q => q.name === quality.name);
        if (qualityIndex > -1) {
            // if purchased is true then this is a no-op
            if (!quality.purchased) {
                newQualities.splice(qualityIndex, 1);
            }
        } else {
            const { name, cost } = quality;
            newQualities.push({ name, cost });
        }
        const data: Character = { ...character, qualities: newQualities };
        dispatch({ type: ActionType.UpdateCharacter, data });
    };

    return (
        <Fragment>
            <div className={classes.header}>
                <Typography gutterBottom variant="h6" className={classes.headerLabel}>Qualities ({totalCost})</Typography>
                <FormControlLabel
                            control={
                                <Switch checked={showAllQualities} onChange={onIncludeAllQualitiesChange} size="small" value="show-all-qualities" />
                            }
                            label="Show all"
                        />
            </div>
            <List subheader={<ListSubheader>Positive Qualities ({positiveCost})</ListSubheader>}>
            {
                shownPositive.map(q => (
                    <ListItem key={q.name}>
                        <Quality quality={q} onUpdate={onQualityUpdate} />
                    </ListItem>
                ))
            }
            </List>
            <List subheader={<ListSubheader>Negative Qualities ({negativeCost})</ListSubheader>}>
            {
                shownNegative.map(q => (
                    <ListItem key={q.name}>
                        <Quality quality={q} onUpdate={onQualityUpdate} />
                    </ListItem>
                ))
            }
            </List>
        </Fragment>
    );
}

export default Qualities;