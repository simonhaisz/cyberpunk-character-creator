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
import { ActionType, LoadSkillsData, LoadContactsData, LoadQualitiesData, LoadSpellsData } from "../reducer";
import CharacterTab from "./CharacterTab";
import SkillsTab from "./SkillsTab";
import Karma from "./Karma";
import AttributesTab from "./AttributesTab";
import ContactsTab from "./ContactsTab";
import { isAwakened } from "../model/character";
import MagicTab from "./MagicTab";
import GearTab from "./GearTab";

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
                const data = qualities as LoadQualitiesData;
                dispatch({ type: ActionType.LoadQualities, data });
            })
            .catch(error => {
                console.error(`Error occured loading qualities: ${error.message}\n${error.stack}`);
            });
        fetch("/data/skills.json")
            .then(response => response.json())
            .then(skills => {
                const data = skills as LoadSkillsData;
                dispatch({ type: ActionType.LoadSkills, data });
            });
        fetch("/data/contacts.json")
            .then(response => response.json())
            .then(contacts => {
                const data = contacts.all as LoadContactsData;
                dispatch({ type: ActionType.LoadContacts, data });
            });
        fetch("/data/magic.json")
            .then(response => response.json())
            .then(magic => {
                const data = magic.spells as LoadSpellsData;
                dispatch({ type: ActionType.LoadSpells, data });
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

    const awakened = isAwakened(selectedCharacter);

    let selectedTabPanel: JSX.Element | null;
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
        case 3:
            selectedTabPanel = <ContactsTab />
            break;
        case 4: {
            if (awakened) {
                selectedTabPanel = <MagicTab />
            } else {
                selectedTabPanel = <GearTab />
            }
            break;
        }
        case 5: {
            if (awakened) {
                selectedTabPanel = <GearTab />
            } else {
                selectedTabPanel = null;
            }
            break;
        }
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
                    <Tab label="Contacts" />
                    { awakened ? <Tab label="Magic" /> : null }
                    <Tab label="Gear" />
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