import React, { FC, useState, useEffect } from "react";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import IconButton from "@material-ui/core/IconButton";
import Badge from "@material-ui/core/Badge";
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
import { ActionType, LoadSkillsData, LoadContactsData, LoadQualitiesData, LoadSpellsData, LoadGearData } from "../reducer";
import CharacterTab from "./CharacterTab";
import SkillsTab from "./SkillsTab";
import Karma from "./Karma";
import AttributesTab from "./AttributesTab";
import ContactsTab from "./ContactsTab";
import { isAwakened } from "../model/character";
import MagicTab from "./MagicTab";
import GearTab from "./GearTab";
import { transformAllGear, getCharacterGearNuyenCost, getCharacterGearKarmaCost } from "../model/gear";
import { getMetaTypeCost } from "../model/meta-type";
import { transformAllQualities, getCharacterQualitiesCost } from "../model/quality";
import { getAllContactsCost } from "../model/contact";
import { getCharacterSpellsCost, transformAllSpells } from "../model/magic";
import { getSkillsCost } from "../model/skills";
import { getAttributesCost } from "../model/attributes";
import CombatTab from "./CombatTab";
import { createPublicUrl } from "../request";

const useStyles = makeStyles({
    bar: {
        flexGrow: 1,
        display: "flex",
    }
});

const CharacterCreator: FC = () => {
    const classes = useStyles();
    const dispatch = useDispatch();
    const selectedCharacter = useGlobalState("selectedCharacter");
    const allQualities = useGlobalState("allQualities");
    const allGear = useGlobalState("allGear");

    const [drawerOpen, setDrawerOpen] = useState(false);
    const [selectedTab, setSelectedTab] = useState(0);

    useEffect(() => {
        fetch(createPublicUrl("data/qualities.json"))
            .then(response => response.json())
            .then(qualities => {
                const data = transformAllQualities(qualities) as LoadQualitiesData;
                dispatch({ type: ActionType.LoadQualities, data });
            })
            .catch(error => {
                console.error(`Error occured loading qualities: ${error.message}\n${error.stack}`);
            });
        fetch(createPublicUrl("data/skills.json"))
            .then(response => response.json())
            .then(skills => {
                const data = skills as LoadSkillsData;
                dispatch({ type: ActionType.LoadSkills, data });
            })
            .catch(error => {
                console.error(`Error occured loading skills: ${error.message}\n${error.stack}`);
            });
        fetch(createPublicUrl("data/contacts.json"))
            .then(response => response.json())
            .then(contacts => {
                const data = contacts.all as LoadContactsData;
                dispatch({ type: ActionType.LoadContacts, data });
            })
            .catch(error => {
                console.error(`Error occured loading contacts: ${error.message}\n${error.stack}`);
            });
        fetch(createPublicUrl("data/magic.json"))
            .then(response => response.json())
            .then(magic => {
                const spellData = transformAllSpells(magic.spells) as LoadSpellsData;
                dispatch({ type: ActionType.LoadSpells, data: spellData });
            })
            .catch(error => {
                console.error(`Error occured loading magic: ${error.message}\n${error.stack}`);
            });
        fetch(createPublicUrl("data/gear.json"))
            .then(response => response.json())
            .then(gear => {
                const gearData = transformAllGear(gear) as LoadGearData;
                dispatch({ type: ActionType.LoadGear, data: gearData });
            })
            .catch(error => {
                console.error(`Error occured loading gear: ${error.message}\n${error.stack}`);
            });
    }, [dispatch]);

    const saveClickHandler = () => {
        dispatch({ type: ActionType.SaveCharacter });
    };
    const resetClickHandler = () =>{
        dispatch({ type: ActionType.ClearCharacter });
    };

    const characterCost = getMetaTypeCost(selectedCharacter.metaType) + getCharacterQualitiesCost(selectedCharacter, allQualities);
    const attributesCost = getAttributesCost(selectedCharacter);
    const skillsCost = getSkillsCost(selectedCharacter);
    const contactsCost = getAllContactsCost(selectedCharacter);
    const magicCost = getCharacterSpellsCost(selectedCharacter);
    const gearNuyenCost = getCharacterGearNuyenCost(selectedCharacter, allGear);
    const getGearKarmaCost = getCharacterGearKarmaCost(gearNuyenCost);

    let gearNuyenCostLabel: string;
    if (gearNuyenCost < 1000) {
        gearNuyenCostLabel = `¥${gearNuyenCost}`;
    } else if (gearNuyenCost < 1000000) {
        gearNuyenCostLabel = `¥${Math.round(gearNuyenCost / 100) / 10}K`;
    } else {
        gearNuyenCostLabel = `¥${Math.round(gearNuyenCost / 100000) / 10}M`;
    }

    const onTabChange = (_event: React.ChangeEvent<{}>, newValue: number) => {
        setSelectedTab(newValue);
    };

    const awakened = isAwakened(selectedCharacter);

    let selectedTabPanel: JSX.Element | null;
    switch (selectedTab) {
        case 0:
            selectedTabPanel = <CharacterTab />;
            break;
        case 1:
            selectedTabPanel = <AttributesTab />;
            break;
        case 2:
            selectedTabPanel = <SkillsTab />;
            break;
        case 3:
            selectedTabPanel = <ContactsTab />;
            break;
        case 4: {
            selectedTabPanel = <GearTab />;
            break;
        }
        case 5: {
            selectedTabPanel = <MagicTab />;
            break;
        }
        case 6: {
            selectedTabPanel = <CombatTab />;
            break;
        }
        default:
            throw new Error(`Unknown tab index ${selectedTab}`);
    }

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
                <Tabs value={selectedTab} onChange={onTabChange} variant="scrollable">
                    <Tab
                        label={
                            <Badge badgeContent={characterCost} color="default" showZero max={999}>
                                Character
                            </Badge>
                        }
                    />
                    <Tab
                        label={
                            <Badge badgeContent={attributesCost} color="default" showZero max={999}>
                                Attributes
                            </Badge>
                        }
                    />
                    <Tab
                        label={
                            <Badge badgeContent={skillsCost} color="default" showZero max={999}>
                                Skills
                            </Badge>
                        }
                    />
                    <Tab
                        label={
                            <Badge badgeContent={contactsCost} color="default" showZero max={999}>
                                Contacts
                            </Badge>
                        }
                    />
                    <Tab
                        label={
                            <Badge badgeContent={gearNuyenCostLabel} color="default" showZero max={1000000} anchorOrigin={{ vertical: "top", horizontal: "left" }}>
                                <Badge badgeContent={getGearKarmaCost} color="default" showZero max={999} anchorOrigin={{ vertical: "top", horizontal: "right" }}>
                                    Gear
                                </Badge>
                            </Badge>
                        }
                    />
                    <Tab
                        disabled={!awakened}
                        label={
                            <Badge badgeContent={magicCost} color="default" showZero max={999}>
                                Magic
                            </Badge>
                        }
                    />
                    <Tab label="Combat" />
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