import React, { FC } from "react";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListSubheader from "@material-ui/core/ListSubheader";
import { makeStyles, ListItemText } from "@material-ui/core";
import { Item, getChildItems } from "../model/custom-item";
import { AddCustomItemData, ActionType } from "../reducer";
import { useDispatch, useGlobalState } from "../context";
import PickerButton from "./PickerButton";

const useStyles = makeStyles({
    header: {
        display: "flex",
        flexDirection: "row",
        marginBottom: 20,
    }
});

type Props = {
    breadcrums: string[];
	spells: string[];
	allSpells: string[];
    headerLabel: string;
	onSpellsUpdated: (updatedSpells: string[]) => void;
};
const SkillList: FC<Props> = (props: Props) => {
	const { breadcrums, spells, allSpells, headerLabel, onSpellsUpdated } = props;

    const classes = useStyles();
    const dispatch = useDispatch();
    const customItems = useGlobalState("customItems");

    spells.sort();

    const parentPath = breadcrums.join(".");
    allSpells.push(...getChildItems(customItems, parentPath).map(i => i.Name));
    allSpells.sort();

    const onSpellUpdate = (add: boolean, spell: string) => {
		const newSpells = [ ...spells ];
		if (add) {
			newSpells.push(spell);
		} else {
			const index = newSpells.findIndex(s => s === spell);
            if (index < 0) {
                throw new Error(`Could not find quality with name '${spell}'`);
            }
            newSpells.splice(index, 1);
		}
		newSpells.sort();
		onSpellsUpdated(newSpells);
    };
    
    const addSpell = (spell: string) => {
        onSpellUpdate(true, spell);
    };

    const removeSpell = (spell: string) => {
        onSpellUpdate(false, spell);
    };

    const createNewSpell = (item: Item) => {
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
                        values={allSpells}
                        selectedValueNames={spells}
                        addValue={addSpell}
                        removeValue={removeSpell}
                        allowNewValues
                        createValue={createNewSpell}
                    />
                </ListSubheader>
            </div>
        }
        >
        {
            spells.map(s => (
                <ListItem key={s}>
					<ListItemText>{s} (5)</ListItemText>
                </ListItem>
            ))
        }
        </List>
	);
};

export default SkillList;