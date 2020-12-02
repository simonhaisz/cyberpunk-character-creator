import React, { FC, Fragment } from "react";
import Divider from "@material-ui/core/Divider";
import Typography from "@material-ui/core/Typography";
import { useGlobalState } from "../context";
import { getEffectiveAttributeRating } from "../model/attributes";
import ReadOnlyProperty from "./ReadOnlyProperty";
import { makeStyles } from "@material-ui/core";
import { isAwakened, MetaType } from "../model/character";

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

	const character = useGlobalState("selectedCharacter");

	const body = getEffectiveAttributeRating(character, "Body");
	const agility = getEffectiveAttributeRating(character, "Agility");
	const reaction = getEffectiveAttributeRating(character, "Reaction");
	const strength = getEffectiveAttributeRating(character, "Strength");
	const charisma = getEffectiveAttributeRating(character, "Charisma");
	const intuition = getEffectiveAttributeRating(character, "Intuition");
	const logic = getEffectiveAttributeRating(character, "Logic");
	const willpower = getEffectiveAttributeRating(character, "Willpower");

	let essence = 6;

	for (const item of character.gear) {
		if (item.essence !== undefined) {
			essence -= parseFloat(item.essence);
		}
	}

	const awakened = isAwakened(character);
	let magic = getEffectiveAttributeRating(character, "Magic");
	const essenceLost = Math.ceil(6 - essence);
	magic -= essenceLost;

	const athletics = character.activeSkills.find(s => s.name === "Athletics")?.rating || 0;

	const initiative = reaction + intuition;
	const initiativePasses = 1;

	const physicalBoxes = 8 + Math.ceil(body / 2);
	const stunBoxes = 8 + Math.ceil(willpower / 2);

	let sneaking = agility;
	if (character.metaType !== MetaType.Dwarf) {
		sneaking += 1;
	}

	let walking = sneaking + athletics;
	if (character.metaType !== MetaType.Dwarf) {
		walking += 2;
	}

	const running = walking * 2;

	return (
		<Fragment>
			<Typography className={classes.header}>Attributes</Typography>
			<Divider />
			<div className={classes.section}>
				<ReadOnlyProperty name="Body" value={body} />
				<ReadOnlyProperty name="Agility" value={agility} />
				<ReadOnlyProperty name="Reaction" value={reaction} />
				<ReadOnlyProperty name="Strength" value={strength} />
				<ReadOnlyProperty name="Charisma" value={charisma} />
				<ReadOnlyProperty name="Intuition" value={intuition} />
				<ReadOnlyProperty name="Logic" value={logic} />
				<ReadOnlyProperty name="Willpower" value={willpower} />
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
				<ReadOnlyProperty name="Initiative" value={initiative} />
				<ReadOnlyProperty name="Initiative Passes" value={initiativePasses} />
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