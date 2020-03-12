import React, { FC, useState } from "react";

import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListSubheader from "@material-ui/core/ListSubheader";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import Switch from "@material-ui/core/Switch";

import styled from "styled-components";
import { useDispatch, useGlobalState } from "../context"
import { Skill } from "../model/character";
import { ACTIVE_SKILLS_NAMES } from "../data/skills";
import { SkillComponent } from "./SkillComponent";
import { ActionType } from "../reducer";

const ListHeader = styled.div`
    display: flex;
    flex-direction: row;
`;

export const SkillsComponents: FC = () => {
    const dispatch = useDispatch();
    const character = useGlobalState("character");
    const { skills } = character;
    const [showAllSkills, setShowAllSkills] = useState(skills.length === 0);

    const shownSkills = [...skills];

    if (showAllSkills) {
        for (const skillName of ACTIVE_SKILLS_NAMES) {
            if (skills.find(s => s.name === skillName) === undefined) {
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

    const onSkillUpdate = (skill: Skill) => {
        const newSkills = [ ...skills ];
        const skillIndex = skills.findIndex(s => s.name === skill.name);
        if (skillIndex > -1) {
            if (skill.rating > 0) {
                newSkills[skillIndex] = skill;
            } else {
                newSkills.splice(skillIndex, 1);
            }
        } else if (skill.rating > 0) {
            newSkills.push(skill);
        }
        dispatch({
            type: ActionType.UpdateCharacter,
            data: { ...character, skills: newSkills }
        });
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
                    <ListItem>
                        <SkillComponent skill={s} onUpdate={onSkillUpdate} />
                    </ListItem>
                ))
            }
        </List>
    );
}