import React, { FC, Fragment } from "react";
import CombatSpellList from "./CombatSpellList";
import DetectionSpellList from "./DetectionSpellList";
import HealthSpellList from "./HealthSpellList";
import IllusionSpellList from "./IllusionSpellList";
import ManipulationSpellList from "./ManipulationSpellList";
import { useGlobalState } from "../context";
import { getCharacterSpellsCost } from "../model/magic";
import { Typography, makeStyles } from "@material-ui/core";

const useStyles = makeStyles({
	header: {
        marginLeft: 5,
        marginRight: 5,
		marginBottom: 10,
		marginTop: 20,
	}
})

const SpellSection: FC = () => {
	const classes = useStyles();
	const character = useGlobalState("selectedCharacter");
	const spellsCost = getCharacterSpellsCost(character);
	return (
		<Fragment>
			<Typography className={classes.header} variant="h6">Spells ({spellsCost})</Typography>
			<CombatSpellList />
			<DetectionSpellList />
			<HealthSpellList />
			<IllusionSpellList />
			<ManipulationSpellList />
		</Fragment>
	);
};

export default SpellSection;