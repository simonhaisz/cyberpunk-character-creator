import React, { FC } from "react";
import Button from "@material-ui/core/Button";
import { CoreCharacterComponent } from "./CoreCharacterComponent";
import { useDispatch } from "../context";
import styled from "styled-components";
import { AttributesComponent } from "./AttributesComponent";
import { ActionType } from "../reducer";

const Root = styled.div`
    display: flex;
    flex-direction: column;
    margin: 5px;
`;

const ButtonPanel = styled.div`
    display: flex;
    flex-direction: row;
    justify-content: space-evenly;
    margin-top: 5px;
`;

export const CharacterComponent: FC = () => {
    const dispatch = useDispatch();

    const saveClickHandler = () => {
        dispatch({ type: ActionType.SaveCharacter });
    };
    const resetClickHandler = () =>{
        dispatch({ type: ActionType.ClearCharacter });
    }
    return (
        <Root>
            <CoreCharacterComponent />
            <AttributesComponent />
            <ButtonPanel>
                <Button variant="outlined" onClick={saveClickHandler}>Save</Button>
                <Button variant="outlined" onClick={resetClickHandler}>Reset</Button>
            </ButtonPanel>
        </Root>
    );
};