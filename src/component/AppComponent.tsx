import React, { FC, Fragment, useState } from "react";
import { CharacterComponent } from "./CharacterComponent";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import IconButton from "@material-ui/core/IconButton";
import Drawer from "@material-ui/core/Drawer";
import MenuIcon from "@material-ui/icons/Menu";
import SaveIcon from "@material-ui/icons/Save";
import ClearIcon from "@material-ui/icons/Clear";
import styled from "styled-components";
import { SelectCharacterComponent } from "./SelectCharacterComponent";
import { CharacterNameComponent } from "./CharacterNameComponent";
import { useDispatch, useGlobalState } from "../context";
import { ActionType } from "../reducer";

const StyledCharacterName = styled(CharacterNameComponent)`
    flex-grow: 1;
`;

const StyleSidebar = styled(Drawer)`
`;

export const AppComponent: FC = () => {
    const dispatch = useDispatch();
    const selectedCharacter = useGlobalState("selectedCharacter");

    const saveClickHandler = () => {
        dispatch({ type: ActionType.SaveCharacter });
    };
    const resetClickHandler = () =>{
        dispatch({ type: ActionType.ClearCharacter });
    }

    const [drawerOpen, setDrawerOpen] = useState(false);

    const onMenuClick = () => {
        setDrawerOpen(true);
    }
    const onDrawerClose = () => {
        setDrawerOpen(false);
    }
    
    return (
        <Fragment>
            <AppBar position="static">
                <Toolbar>
                    <IconButton edge="start" onClick={onMenuClick} aria-label="menu">
                        <MenuIcon />
                    </IconButton>
                    <StyledCharacterName character={selectedCharacter} />
                    <IconButton aria-label="save" onClick={saveClickHandler} color="secondary">
                        <SaveIcon />
                    </IconButton>
                    <IconButton aria-label="clear" onClick={resetClickHandler} color="secondary">
                        <ClearIcon />
                    </IconButton>
                </Toolbar>
            </AppBar>
            <CharacterComponent />
            <StyleSidebar open={drawerOpen} onClose={onDrawerClose}>
                <SelectCharacterComponent />
            </StyleSidebar>
        </Fragment>
    )
};