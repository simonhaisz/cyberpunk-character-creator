import React, { FC, Fragment } from "react";
import Select from "@material-ui/core/Select";
import TextField from "@material-ui/core/TextField";
import MenuItem from "@material-ui/core/MenuItem";
import { makeStyles } from '@material-ui/core/styles';
import { useDispatch, useGlobalState } from "../context";
import { Character as CharacterData, MetaType } from "../model/character";
import { ActionType, UpdateCharacterData } from "../reducer";
import { ALL_META_TYPES } from "../data/meta-types";
import { getMetaTypeCost } from "../model/meta-type";
import PropertyTree from "./PropertyTree";
import { getAllQualitiesCost } from "../model/quality";


const useStyles = makeStyles({
    header: {
        display: "flex",
        flexDirection: "row",
        marginLeft: 5,
        marginRight: 5,
        marginBottom: 10,
    },
    field: {
        marginRight: 10,
        marginTop: 20,
    },
    divider: {
        margin: 5,
    }
});

const CharacterTab: FC = () => {
    const classes = useStyles();
    const dispatch = useDispatch();
    const character = useGlobalState("selectedCharacter");
    const allQualities = useGlobalState("allQualities");
    const { name, streetName, metaType, qualities } = character;

    const cost = getAllQualitiesCost(qualities, allQualities);

    const onCharacterUpdated = (updatedCharacter: CharacterData) => {
        const data: UpdateCharacterData = updatedCharacter;
        dispatch({ type: ActionType.UpdateCharacter, data });
    };

    const onQualitiesUpdated = (updatedQualities: { positive: string[], negative: string[] }) => {
        const data: UpdateCharacterData = { ...character, qualities: updatedQualities };
		dispatch({ type: ActionType.UpdateCharacter, data });
    };

    return (
        <Fragment>
            <div className={classes.header}>
                <TextField id-="name" label="Name" value={name} onChange={e => onCharacterUpdated({ ...character, name: e.target.value})} className={classes.field} variant="outlined" />
                <TextField id-="street-name" label="Street Name" value={streetName} onChange={e => onCharacterUpdated({ ...character, streetName: e.target.value})} className={classes.field} variant="outlined" />
                <Select id="meta-type" value={metaType} displayEmpty onChange={e => onCharacterUpdated({ ...character, metaType: e.target.value as MetaType})} className={classes.field} variant="outlined">
                    {ALL_META_TYPES.map(t => <MenuItem key={t} value={t}>{t} ({getMetaTypeCost(t)})</MenuItem>)}
                </Select>
            </div>
            <PropertyTree
                rootCost={cost}
                rootName="qualities"
                rootValue={qualities}
                rootAll={allQualities}
                onRootUpdated={onQualitiesUpdated}
            />
        </Fragment>
    )
}

export default CharacterTab;