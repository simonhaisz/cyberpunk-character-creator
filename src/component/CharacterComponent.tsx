import React, { FC } from "react";
import Button from "@material-ui/core/Button";
import { CoreCharacterComponent } from "./CoreCharacterComponent";
import { useDispatch } from "../context";
import styled from "styled-components";
import { AttributesComponent } from "./AttributesComponent";
import { ActionType } from "../reducer";
import { SkillsComponents } from "./SkillsComponents";

const Root = styled.div`
    display: flex;
    flex-direction: column;
    margin: 5px;
`;

const ButtonPanel = styled.div`
    display: flex;
    flex-direction: row;
    justify-content: flex-end;
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
            <ButtonPanel>
                <Button variant="outlined" onClick={saveClickHandler}>Save</Button>
                <Button variant="outlined" onClick={resetClickHandler}>Reset</Button>
            </ButtonPanel>
            <CoreCharacterComponent />
            <AttributesComponent />
            <SkillsComponents />
        </Root>
    );
};