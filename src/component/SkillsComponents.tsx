import React, { FC, useState } from "react";

import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListSubheader from "@material-ui/core/ListSubheader";

import { useDispatch, useGlobalState } from "../context"
import { Skill } from "../model/character";
import { ACTIVE_SKILL_GROUPS } from "../data/skills";

export const SkillsComponents: FC = () => {
    const dispatch = useDispatch();
    const character = useGlobalState("character");
    const { skills } = character;
    const [includeAllSkills, setIncludeAllSkills] = useState(skills.length > 0);

    const skillGroups = new Map<string, Skill[]>();
    for (const skillGroup of ACTIVE_SKILL_GROUPS) {
        skillGroups.set(skillGroup.name, skillGroup.skills.map(s => ({ group: skillGroup.name, name: s, rating: 0, specialization: "" })));
    }
    for (const skill of skills) {
        const skillGroup = skillGroups.get(skill.group);
        if (!skillGroup) {
            throw new Error(`Could not find skill group '${skill.group}' for skill '${skill.name}'`);
        }
    }
    return (
        <List>

        </List>
    );
}