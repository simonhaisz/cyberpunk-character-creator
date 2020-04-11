import React, { FC, Fragment } from "react";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ExpansionPanel from "@material-ui/core/ExpansionPanel";
import ExpansionPanelSummary from "@material-ui/core/ExpansionPanelSummary";
import ExpansionPanelDetails from "@material-ui/core/ExpansionPanelDetails";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import Typography from "@material-ui/core/Typography";
import ExpandMoreIcon from "@material-ui/icons/ExpandMore";
import { makeStyles } from "@material-ui/core";
import { Skill as SkillData } from "../model/character";
import { CustomItem, getChildItems } from "../model/custom-item";
import { AddCustomItemData, ActionType } from "../reducer";
import { useDispatch, useGlobalState } from "../context";
import PickerButton from "./PickerButton";
import Skill from "./Skill";

const useStyles = makeStyles({
    header: {
        display: "flex",
        flexDirection: "row",
        marginBottom: 20,
        paddingLeft: 16,
        paddingTop: 12,
    },
    headerLabel: {
        lineHeight: 3,
        fontWeight: 700,
    },
});

type Props = {
    breadcrums: string[];
	skills: SkillData[];
	allSkills: CustomItem[];
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

    const createNewSkill = (item: CustomItem) => {
        const path = `${parentPath}.${item.Name}`;
        const data: AddCustomItemData = { path, item: item };
        dispatch({ type: ActionType.AddCustomItem, data });
    };

	return (
        <Fragment>
            <ExpansionPanel defaultExpanded={true}>
                <ExpansionPanelSummary expandIcon={<ExpandMoreIcon />}>
                    <FormControlLabel
                        onClick={(event) => event.stopPropagation()}
                        onFocus={(event) => event.stopPropagation()}
                        control={<PickerButton
                            breadcrums={breadcrums}
                            values={allSkills}
                            selectedValueNames={skills.map(s => s.name)}
                            addValue={addSkill}
                            removeValue={removeSkill}
                            allowNewValues
                            createValue={createNewSkill}
                        />}
                        label=""
                    />
                    <Typography className={classes.headerLabel}>{headerLabel}</Typography>
                </ExpansionPanelSummary>
                <ExpansionPanelDetails>
                    <List>
                    {
                        skills.map(s => (
                            <ListItem key={s.name}>
                                <Skill skill={s} onUpdate={onSkillUpdate} computeCost={computeSkillCost} />
                            </ListItem>
                        ))
                    }
                    </List>
                </ExpansionPanelDetails>
            </ExpansionPanel>
        </Fragment>
	);
};

export default SkillList;