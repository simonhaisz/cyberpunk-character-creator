import React, { FC } from "react";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListSubheader from "@material-ui/core/ListSubheader";
import { useGlobalState, useDispatch } from "../context";
import CharacterName from "./CharacterName";
import { CharacterRef } from "../model/character";
import { ActionType, SelectCharacterData } from "../reducer";

const SelectCharacter: FC = () => {
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
                        <CharacterName character={c} />
                    </ListItem>
                ))
            }
        </List>
    )
};

export default SelectCharacter;