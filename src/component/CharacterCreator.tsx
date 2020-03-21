import React, { FC, Fragment, useState } from "react";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import IconButton from "@material-ui/core/IconButton";
import Drawer from "@material-ui/core/Drawer";
import MenuIcon from "@material-ui/icons/Menu";
import SaveIcon from "@material-ui/icons/Save";
import ClearIcon from "@material-ui/icons/Clear";
import Tabs from "@material-ui/core/Tabs";
import Tab from "@material-ui/core/Tab";
import styled from "styled-components";
import SelectCharacter from "./SelectCharacter";
import CharacterName from "./CharacterName";
import { useDispatch, useGlobalState } from "../context";
import { ActionType } from "../reducer";
import Character from "./Character";
import Attributes from "./Attributes";
import Skills from "./Skills";

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

    const [selectedTab, setSelectedTab] = useState(0);
    const onTabChange = (_event: React.ChangeEvent<{}>, newValue: number) => {
        setSelectedTab(newValue);
    };

    let selectedTabPanel: JSX.Element;
    switch (selectedTab) {
        case 0:
            selectedTabPanel = <Character />
            break;
        case 1:
            selectedTabPanel = <Attributes />
            break;
        case 2:
            selectedTabPanel = <Skills />
            break;
        default:
            throw new Error(`Unknown tab index ${selectedTab}`);
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
            <AppBar position="sticky">
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
                <Tabs value={selectedTab} onChange={onTabChange}>
                    <Tab label="Character" />
                    <Tab label="Attributes" />
                    <Tab label="Skills" />
                </Tabs>
            </AppBar>
            {
                selectedTabPanel
            }
            <StyleSidebar open={drawerOpen} onClose={onDrawerClose}>
                <SelectCharacter />
            </StyleSidebar>
        </Fragment>
    )
};

export default CharacterCreator;