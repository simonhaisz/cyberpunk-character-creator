import React, { FC, Fragment } from "react";
import Divider from "@material-ui/core/Divider";
import Typography from "@material-ui/core/Typography";
import { useDispatch, useGlobalState } from "../context";
import { getEffectiveAttributeRating, getNaturalAttributeRating } from "../model/attributes";
import ReadOnlyProperty from "./ReadOnlyProperty";
import { makeStyles } from "@material-ui/core";
import { isAwakened, MetaType } from "../model/character";
import { getModifier } from "../model/modifier";
import ModifiableProperty from "./ModifiableProperty";
import { ActionType, UpdateCharacterData } from "../reducer";

const useStyles = makeStyles({
	header: {
		marginTop: 10,
		marginLeft: 5,
	},
	section: {
		display: "flex",
		flexDirection: "row",
		marginBottom: 10,
	},
});

const StatsTab: FC = () => {

	const classes = useStyles();
	const dispatch = useDispatch();

	const character = useGlobalState("selectedCharacter");

	const body = getNaturalAttributeRating(character, "Body");
	const agility = getNaturalAttributeRating(character, "Agility");
	const reaction = getNaturalAttributeRating(character, "Reaction");
	const strength = getNaturalAttributeRating(character, "Strength");
	const charisma = getNaturalAttributeRating(character, "Charisma");
	const intuition = getNaturalAttributeRating(character, "Intuition");
	const logic = getNaturalAttributeRating(character, "Logic");
	const willpower = getNaturalAttributeRating(character, "Willpower");

	let essence = 6;

	for (const item of character.gear) {
		if (item.essence !== undefined) {
			essence -= parseFloat(item.essence);
		}
	}

	const awakened = isAwakened(character);
	let magic = getNaturalAttributeRating(character, "Magic");
	const essenceLost = Math.ceil(6 - essence);
	magic -= essenceLost;

	const athletics = character.activeSkills.find(s => s.name === "Athletics")?.rating || 0;

	const initiative = getEffectiveAttributeRating(character, "Reaction") + getEffectiveAttributeRating(character, "Intuition");
	const initiativePasses = 1;

	const physicalBoxes = 8 + Math.ceil(getEffectiveAttributeRating(character, "Body") / 2);
	const stunBoxes = 8 + Math.ceil(getEffectiveAttributeRating(character, "Willpower") / 2);

	let sneaking = agility;
	if (character.metaType !== MetaType.Dwarf) {
		sneaking += 1;
	}

	let walking = sneaking + athletics;
	if (character.metaType !== MetaType.Dwarf) {
		walking += 2;
	}

	const running = walking * 2;

	const ModifierProperty = (props: { name: string, value: number} ) => {
		const {name, value} = props;
		const modifier = getModifier(character, name);
		const updateModifier = (newValue: number) => {
			const newModifiers = [...character.modifiers]
			const modifierIndex = newModifiers.findIndex(m => m.name === name);
			if (modifierIndex > -1) {
				newModifiers.splice(modifierIndex, 1);
			}
			newModifiers.push({
				name,
				rating: newValue
			});
			const data: UpdateCharacterData = { ...character, modifiers: newModifiers };
			dispatch({ type: ActionType.UpdateCharacter, data });
		};
		return (
			<ModifiableProperty
				name={name}
				value={value}
				modifier={modifier}
				updateModifier={updateModifier}
				/>
		);
	}

	return (
		<Fragment>
			<Typography className={classes.header}>Attributes</Typography>
			<Divider />
			<div className={classes.section}>
				<ModifierProperty name="Body" value={body} />
				<ModifierProperty name="Agility" value={agility} />
				<ModifierProperty name="Reaction" value={reaction} />
				<ModifierProperty name="Strength" value={strength} />
			</div>
			<div className={classes.section}>
				<ModifierProperty name="Charisma" value={charisma} />
				<ModifierProperty name="Intuition" value={intuition} />
				<ModifierProperty name="Logic" value={logic} />
				<ModifierProperty name="Willpower" value={willpower} />
			</div>
			<div className={classes.section}>
				<ReadOnlyProperty name="Essence" value={essence} />
				{
					awakened ?
					<ReadOnlyProperty name="Magic" value={magic} />
					:
					null
				}
			</div>
			<Typography className={classes.header}>Initiative</Typography>
			<Divider />
			<div className={classes.section}>
				<ModifierProperty name="Initiative" value={initiative} />
				<ModifierProperty name="Initiative Passes" value={initiativePasses} />
			</div>
			<Typography className={classes.header}>Condition Monitor</Typography>
			<Divider />
			<div className={classes.section}>
				<ReadOnlyProperty name="Physical Boxes" value={physicalBoxes} />
				<ReadOnlyProperty name="Stun Boxes" value={stunBoxes} />
			</div>
			<Typography className={classes.header}>Movement</Typography>
			<Divider />
			<div className={classes.section}>
				<ReadOnlyProperty name="Sneaking" value={sneaking} />
				<ReadOnlyProperty name="Walking" value={walking} />
				<ReadOnlyProperty name="Running" value={running} />
			</div>
		</Fragment>
	);
};

export default StatsTab;