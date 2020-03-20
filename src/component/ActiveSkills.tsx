import React, { FC, useState } from "react";

import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListSubheader from "@material-ui/core/ListSubheader";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import Switch from "@material-ui/core/Switch";

import styled from "styled-components";
import { useDispatch, useGlobalState } from "../context"
import { Skill as SkillData, Character } from "../model/character";
import { ACTIVE_SKILLS_NAMES } from "../data/skills";
import ActiveSkill from "./ActiveSkill";
import { ActionType } from "../reducer";

const ListHeader = styled.div`
    display: flex;
    flex-direction: row;
`;

const ActiveSkills: FC = () => {
    const dispatch = useDispatch();
    const character = useGlobalState("selectedCharacter");
    const { activeSkills } = character;
    const [showAllSkills, setShowAllSkills] = useState(activeSkills.length === 0);

    const shownSkills = [...activeSkills];

    if (showAllSkills) {
        for (const skillName of ACTIVE_SKILLS_NAMES) {
            if (activeSkills.find(s => s.name === skillName) === undefined) {
                shownSkills.push({
                    name: skillName,
                    rating: -1
                })
            }
        }
    }

    shownSkills.sort((a, b) => a.name.localeCompare(b.name));

    const onIncludeAllSkillsChange = (_event: React.ChangeEvent<HTMLElement>, checked: boolean) => {
        setShowAllSkills(checked);
    };

    const onSkillUpdate = (skill: SkillData) => {
        const newSkills = [ ...activeSkills ];
        const skillIndex = activeSkills.findIndex(s => s.name === skill.name);
        if (skillIndex > -1) {
            if (skill.rating > 0) {
                newSkills[skillIndex] = skill;
            } else {
                newSkills.splice(skillIndex, 1);
            }
        } else if (skill.rating > 0) {
            newSkills.push(skill);
        }
        const data: Character = { ...character, activeSkills: newSkills };
        dispatch({ type: ActionType.UpdateCharacter, data });
    }

    return (
        <List subheader={
                <ListHeader>
                    <ListSubheader>Active Skills</ListSubheader>
                    <FormControlLabel
                        control={
                            <Switch checked={showAllSkills} onChange={onIncludeAllSkillsChange} size="small" value="show-all-skills" />
                        }
                        label="Show all"
                    />
                </ListHeader>
            }
            >
            {
                shownSkills.map(s => (
                    <ListItem key={s.name}>
                        <ActiveSkill skill={s} onUpdate={onSkillUpdate} />
                    </ListItem>
                ))
            }
        </List>
    );
}

export default ActiveSkills;