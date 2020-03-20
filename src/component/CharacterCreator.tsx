import React, { FC, Fragment, useState } from "react";
import Character from "./Character";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import IconButton from "@material-ui/core/IconButton";
import Drawer from "@material-ui/core/Drawer";
import MenuIcon from "@material-ui/icons/Menu";
import SaveIcon from "@material-ui/icons/Save";
import ClearIcon from "@material-ui/icons/Clear";
import styled from "styled-components";
import SelectCharacter from "./SelectCharacter";
import CharacterName from "./CharacterName";
import { useDispatch, useGlobalState } from "../context";
import { ActionType } from "../reducer";

const StyledBar = styled.div`
    flex-grow: 1;
`;

const StyleSidebar = styled(Drawer)`
`;

const CharacterCreator: FC = () => {
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
                    <StyledBar>
                        <CharacterName character={selectedCharacter} />
                    </StyledBar>
                    <IconButton aria-label="save" onClick={saveClickHandler} color="secondary">
                        <SaveIcon />
                    </IconButton>
                    <IconButton aria-label="clear" onClick={resetClickHandler} color="secondary">
                        <ClearIcon />
                    </IconButton>
                </Toolbar>
            </AppBar>
            <Character />
            <StyleSidebar open={drawerOpen} onClose={onDrawerClose}>
                <SelectCharacter />
            </StyleSidebar>
        </Fragment>
    )
};

export default CharacterCreator;