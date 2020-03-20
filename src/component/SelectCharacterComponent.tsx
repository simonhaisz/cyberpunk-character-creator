import React, { FC } from "react";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListSubheader from "@material-ui/core/ListSubheader";
import { useGlobalState, useDispatch } from "../context";
import { CharacterNameComponent } from "./CharacterNameComponent";
import { CharacterRef } from "../model/character";
import { ActionType, SelectCharacterData } from "../reducer";

export const SelectCharacterComponent: FC = () => {
    const dispatch = useDispatch();
    const characters = useGlobalState("characters");

    const onCharacterClick = (character: CharacterRef) => {
        const data: SelectCharacterData = character;
        dispatch({ type: ActionType.SelectCharacter, data });
    };
    return (
        <List subheader={
            <ListSubheader>Characters</ListSubheader>
            }
            >
            {
                characters.map(c => (
                    <ListItem key={c.key} onClick={() => onCharacterClick(c)}>
                        <CharacterNameComponent character={c} />
                    </ListItem>
                ))
            }
        </List>
    )
};