import React, { FC } from "react";
import Button from "@material-ui/core/Button";
import Select from "@material-ui/core/Select";
import TextField from "@material-ui/core/TextField";
import MenuItem from "@material-ui/core/MenuItem";

import { ALL_META_TYPES } from "../data/meta-types";
import { useDispatch, useGlobalState } from "../context";
import { ActionType } from "../reducer";
import { Character, MetaType } from "../model/character";
import { saveCharacter } from "../persistance";

export const CharacterComponent: FC = () => {
    const dispatch = useDispatch();
    const character = useGlobalState("character");
    const { name, streetName, metaType } = character;
    const updateCharacter = (character: Character) => {
        dispatch({ type: ActionType.UpdateCharacter, data: character });
    };
    const saveClickHandler = () => {
        saveCharacter(character);
    };
    return (
        <>
            <TextField id-="name" label="Name" value={name} onChange={e => updateCharacter({ ...character, name: e.target.value})} />
            <TextField id-="street-name" label="Street Name" value={streetName} onChange={e => updateCharacter({ ...character, streetName: e.target.value})} />
            <Select id="meta-type" value={metaType} displayEmpty onChange={e => updateCharacter({ ...character, metaType: e.target.value as MetaType})}>
                <MenuItem value="" key="empty" disabled>= Select Meta-Type =</MenuItem>
                {ALL_META_TYPES.map(t => <MenuItem value={t} key={t}>{t}</MenuItem>)}
            </Select>
            <Button variant="outlined" onClick={saveClickHandler}>Save</Button>
        </>
    );
};