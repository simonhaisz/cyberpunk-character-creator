import React, { FC } from "react";
import Select from "@material-ui/core/Select";
import TextField from "@material-ui/core/TextField";
import MenuItem from "@material-ui/core/MenuItem";
import styled from "styled-components";
import { useDispatch, useGlobalState } from "../context";
import { Character, MetaType } from "../model/character";
import { ActionType, UpdateCharacterData } from "../reducer";
import { ALL_META_TYPES } from "../data/meta-types";
import { getMetaTypeCost } from "../model/meta-type";

const Root = styled.div`
    display: flex;
    flex-direction: row;
    margin: 5px;
`;

const Core: FC = () => {
    const dispatch = useDispatch();
    const character = useGlobalState("selectedCharacter");
    const { name, streetName, metaType } = character;
    const updateCharacter = (character: Character) => {
        const data: UpdateCharacterData = character;
        dispatch({ type: ActionType.UpdateCharacter, data });
    };
    return (
        <Root>
            <TextField id-="name" label="Name" value={name} onChange={e => updateCharacter({ ...character, name: e.target.value})} />
            <TextField id-="street-name" label="Street Name" value={streetName} onChange={e => updateCharacter({ ...character, streetName: e.target.value})} />
            <Select id="meta-type" value={metaType} displayEmpty onChange={e => updateCharacter({ ...character, metaType: e.target.value as MetaType})}>
                {ALL_META_TYPES.map(t => <MenuItem key={t} value={t}>{t} ({getMetaTypeCost(t)})</MenuItem>)}
            </Select>
        </Root>
    )
}

export default Core;