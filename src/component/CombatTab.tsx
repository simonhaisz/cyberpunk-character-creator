import React, { FC, Fragment } from "react";
import Divider from "@material-ui/core/Divider";
import Typography from "@material-ui/core/Typography";
import { useGlobalState } from "../context";
import { getEffectiveAttributeRating } from "../model/attributes";
import ReadOnlyProperty from "./ReadOnlyProperty";
import { makeStyles } from "@material-ui/core";
import { MetaType } from "../model/character";

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
})

const CombatTab: FC = () => {

	const classes = useStyles();

	const character = useGlobalState("selectedCharacter");

	const body = getEffectiveAttributeRating(character, "Body");
	const agility = getEffectiveAttributeRating(character, "Agility");
	const reaction = getEffectiveAttributeRating(character, "Reaction");
	const intuition = getEffectiveAttributeRating(character, "Intuition");
	const willpower = getEffectiveAttributeRating(character, "Willpower");

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

export default CombatTab;