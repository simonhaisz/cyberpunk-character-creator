import React, { FC } from "react";

import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListSubheader from "@material-ui/core/ListSubheader";
import { makeStyles } from '@material-ui/core/styles';
import { useDispatch, useGlobalState } from "../context"
import { Skill as SkillData, Character } from "../model/character";
import ActiveSkill from "./ActiveSkill";
import { ActionType } from "../reducer";
import { getActiveSkillsCost } from "../model/skills";
import PickerButton from "./PickerButton";

const useStyles = makeStyles({
    header: {
        display: "flex",
        flexDirection: "row"
    }
});

const ActiveSkills: FC = () => {
    const classes = useStyles();
    const dispatch = useDispatch();
    const character = useGlobalState("selectedCharacter");
    const allSkills = useGlobalState("skills");
    const { activeSkills } = character;

    const activeSkillsCost = getActiveSkillsCost(activeSkills);

    activeSkills.sort((a, b) => a.name.localeCompare(b.name));

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

    const addSkill = (name: string) => {
        onSkillUpdate({ name, rating: 1 });
    };

    const removeSkill = (name: string) => {
        onSkillUpdate({ name, rating: -1 });
    };

    return (
        <List subheader={
                <div className={classes.header}>
                    <ListSubheader>
                        Active Skills ({activeSkillsCost})
                        <PickerButton
                            breadcrums={["Skills", "Active"]}
                            values={allSkills.active}
                            selectedValueNames={activeSkills.map(s => s.name)}
                            addValue={addSkill}
                            removeValue={removeSkill}
                        />
                    </ListSubheader>
                </div>
            }
            >
            {
                activeSkills.map(s => (
                    <ListItem key={s.name}>
                        <ActiveSkill skill={s} onUpdate={onSkillUpdate} />
                    </ListItem>
                ))
            }
        </List>
    );
}

export default ActiveSkills;