import React, { FC } from "react";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListSubheader from "@material-ui/core/ListSubheader";
import { makeStyles } from "@material-ui/core";
import { Skill as SkillData } from "../model/character";
import { Item, getChildItems } from "../model/custom-item";
import { AddCustomItemData, ActionType } from "../reducer";
import { useDispatch, useGlobalState } from "../context";
import PickerButton from "./PickerButton";
import Skill from "./Skill";

const useStyles = makeStyles({
    header: {
        display: "flex",
        flexDirection: "row",
        marginBottom: 20,
    }
});

type Props = {
    breadcrums: string[];
	skills: SkillData[];
	allSkills: Item[];
    headerLabel: string;
    computeSkillCost: (rating: number) => number;
	onSkillsUpdated: (updatedSkills: SkillData[]) => void;
};
const SkillList: FC<Props> = (props: Props) => {
	const { breadcrums, skills, allSkills, headerLabel, computeSkillCost, onSkillsUpdated } = props;

    const classes = useStyles();
    const dispatch = useDispatch();
    const customItems = useGlobalState("customItems");

    skills.sort((a, b) => a.name.localeCompare(b.name));

    const parentPath = breadcrums.join(".");
    allSkills.push(...getChildItems(customItems, parentPath));
    allSkills.sort((a, b) => a.Name.localeCompare(b.Name));

    const onSkillUpdate = (skill: SkillData) => {
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
        onSkillsUpdated(newSkills);
    };
    
    const addSkill = (name: string) => {
        onSkillUpdate({ name, rating: 1 });
    };

    const removeSkill = (name: string) => {
        onSkillUpdate({ name, rating: -1 });
    };

    const createNewSkill = (item: Item) => {
        const path = `${parentPath}.${item.Name}`;
        const data: AddCustomItemData = { path, item: item };
        dispatch({ type: ActionType.AddCustomItem, data });
    };

	return (
        <List subheader={
            <div className={classes.header}>
                <ListSubheader>
                    {headerLabel}
                    <PickerButton
                        breadcrums={breadcrums}
                        values={allSkills}
                        selectedValueNames={skills.map(s => s.name)}
                        addValue={addSkill}
                        removeValue={removeSkill}
                        allowNewValues
                        createValue={createNewSkill}
                    />
                </ListSubheader>
            </div>
        }
        >
        {
            skills.map(s => (
                <ListItem key={s.name}>
                    <Skill skill={s} onUpdate={onSkillUpdate} computeCost={computeSkillCost} />
                </ListItem>
            ))
        }
        </List>
	);
};

export default SkillList;