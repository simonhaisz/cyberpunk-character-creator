import React, { FC, useState, useEffect } from "react";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import IconButton from "@material-ui/core/IconButton";
import Drawer from "@material-ui/core/Drawer";
import MenuIcon from "@material-ui/icons/Menu";
import SaveIcon from "@material-ui/icons/Save";
import ClearIcon from "@material-ui/icons/Clear";
import Tabs from "@material-ui/core/Tabs";
import Tab from "@material-ui/core/Tab";
import { makeStyles } from '@material-ui/core/styles';
import SelectCharacter from "./SelectCharacter";
import CharacterName from "./CharacterName";
import { useDispatch, useGlobalState } from "../context";
import { ActionType } from "../reducer";
import CharacterTab from "./CharacterTab";
import SkillsTab from "./SkillsTab";
import Karma from "./Karma";
import { Qualities } from "../model/quality";
import { Skills as SkillsType } from "../model/skills";
import AttributesTab from "./AttributesTab";

const useStyles = makeStyles({
    bar: {
        flexGrow: 1,
        display: "flex"
    }
});

const CharacterCreator: FC = () => {
    const classes = useStyles();
    const dispatch = useDispatch();
    const selectedCharacter = useGlobalState("selectedCharacter");

    useEffect(() => {
        fetch("/data/qualities.json")
            .then(response => response.json())
            .then(qualities => {
                const data = qualities as Qualities
                dispatch({ type: ActionType.LoadQualities, data });
            })
            .catch(error => {
                console.error(`Error occured loading qualities: ${error.message}\n${error.stack}`);
            });
        fetch("/data/skills.json")
            .then(response => response.json())
            .then(skills => {
                const data = skills as SkillsType;
                dispatch({ type: ActionType.LoadSkills, data });
            });
    }, [dispatch]);

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
            selectedTabPanel = <CharacterTab />
            break;
        case 1:
            selectedTabPanel = <AttributesTab />
            break;
        case 2:
            selectedTabPanel = <SkillsTab />
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
        <div>
            <AppBar position="sticky" color="default">
                <Toolbar>
                    <IconButton edge="start" onClick={onMenuClick} aria-label="menu">
                        <MenuIcon />
                    </IconButton>
                    <div className={classes.bar}>
                        <CharacterName character={selectedCharacter} />
                        <Karma />
                    </div>
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
            <Drawer open={drawerOpen} onClose={onDrawerClose}>
                <SelectCharacter />
            </Drawer>
        </div>
    );
};

export default CharacterCreator;