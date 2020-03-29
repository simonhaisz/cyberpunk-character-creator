import React, { FC, Fragment } from "react";
import Select from "@material-ui/core/Select";
import TextField from "@material-ui/core/TextField";
import MenuItem from "@material-ui/core/MenuItem";
import { makeStyles } from '@material-ui/core/styles';
import Qualities from "./Qualities";
import { useDispatch, useGlobalState } from "../context";
import { Character as CharacterData, MetaType } from "../model/character";
import { ActionType, UpdateCharacterData } from "../reducer";
import { ALL_META_TYPES } from "../data/meta-types";
import { getMetaTypeCost } from "../model/meta-type";


const useStyles = makeStyles({
    header: {
        display: "flex",
        flexDirection: "row",
        marginLeft: 5,
        marginRight: 5,
        marginBottom: 10,
    },
    field: {
        paddingRight: "10px",
    },
    divider: {
        margin: 5,
    }
});

const Character: FC = () => {
    const classes = useStyles();
    const dispatch = useDispatch();
    const character = useGlobalState("selectedCharacter");
    const { name, streetName, metaType } = character;
    const updateCharacter = (character: CharacterData) => {
        const data: UpdateCharacterData = character;
        dispatch({ type: ActionType.UpdateCharacter, data });
    };
    return (
        <Fragment>
            <div className={classes.header}>
                <TextField id-="name" label="Name" value={name} onChange={e => updateCharacter({ ...character, name: e.target.value})} className={classes.field} />
                <TextField id-="street-name" label="Street Name" value={streetName} onChange={e => updateCharacter({ ...character, streetName: e.target.value})} className={classes.field} />
                <Select id="meta-type" value={metaType} displayEmpty onChange={e => updateCharacter({ ...character, metaType: e.target.value as MetaType})} className={classes.field}>
                    {ALL_META_TYPES.map(t => <MenuItem key={t} value={t}>{t} ({getMetaTypeCost(t)})</MenuItem>)}
                </Select>
            </div>
            <Qualities />
        </Fragment>
    )
}

export default Character;