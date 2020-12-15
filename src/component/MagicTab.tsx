import React, { FC, Fragment } from "react";
import Divider from "@material-ui/core/Divider";
import Typography from "@material-ui/core/Typography";
import { useGlobalState, useDispatch } from "../context";
import { ActionType, UpdateCharacterData } from "../reducer";
import { Item } from "../model/item";
import GroupContainer from "./GroupContainer";
import { AdeptPower, computeAdeptPowerCost } from "../model/magic";
import { makeStyles } from "@material-ui/core";
import InitiateGrade from "./InitiateGrade";
import { Dictionary } from "../model/dictionary";

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

const MagicTab: FC = () => {
	const classes = useStyles();
	const dispatch = useDispatch();
	const character = useGlobalState("selectedCharacter");
	const { spells, powers, metaMagics } = character;
	const allSpells = useGlobalState("allSpells");
	const allPowers = useGlobalState("allPowers");

	const allAdeptPowers: Dictionary<AdeptPower[]> = {};
	const allMetaMagics: Dictionary<AdeptPower[]> = {};
	for (const path in allPowers) {
		if (path === "powers.adept-powers") {
			allAdeptPowers[path] = [...allPowers[path]];
		} else if (path === "powers.metamagic") {
			allMetaMagics[path] = [...allPowers[path]];
		} else {
			throw new Error(`Unknown group of powers '${path}'`);
		}
	}

	const isMagician = character.qualities.find(q => q.name === "Magician");
	const isAdept = character.qualities.find(q => q.name === "Adept");

	const createSpellCostLabel = (_item: Item) => {
		return "5";
	};

	const createSpellLabel = (item: Item) => {
		const { name } = item;
		return `${name} (5)`;
	};

	const handleUpdateSpells = (newSpells: Item[]) => {
		const data: UpdateCharacterData = { ...character, spells: newSpells };
		dispatch({ type: ActionType.UpdateCharacter, data });
	};

	const createPowerCostLabel = (item: Item) => {
		const cost = computeAdeptPowerCost(item, allPowers);
		return `${cost}`;
	};

	const createPowerLabel = (item: Item) => {
		const { name } = item;
		const cost = createPowerCostLabel(item);
		return `${name} (${cost})`;
	};

	const handleUpdatePowers = (newPowers: Item[]) => {
		const data: UpdateCharacterData = { ...character, powers: newPowers };
		dispatch({ type: ActionType.UpdateCharacter, data });
	};

	const createMetaMagicCostLabel = (_item: Item) => {
		return "10";
	};

	const createMetaMagicLabel = (item: Item) => {
		const { name } = item;
		return `${name} (10)`;
	};

	const handleUpdateMetaMagic = (newMetaMagics: Item[]) => {
		const data: UpdateCharacterData = { ...character, metaMagics: newMetaMagics };
		dispatch({ type: ActionType.UpdateCharacter, data });
	};

	return (
		<Fragment>
			{
				isMagician ?
				<GroupContainer
					label="Spells"
					items={spells}
					allItems={allSpells}
					createItemLabel={createSpellLabel}
					createItemCostLabel={createSpellCostLabel}
					onUpdateItems={handleUpdateSpells}
				/>
				:
				null
			}
			{
				isAdept ?
				<GroupContainer
					label="Powers"
					items={powers}
					allItems={allAdeptPowers}
					createItemLabel={createPowerLabel}
					createItemCostLabel={createPowerCostLabel}
					onUpdateItems={handleUpdatePowers}
				/>
				:
				null
			}
			<Typography className={classes.header}>Initiation</Typography>
			<Divider />
			<InitiateGrade />
			<GroupContainer
				label="Metamagics"
				items={metaMagics}
				allItems={allMetaMagics}
				createItemLabel={createMetaMagicLabel}
				createItemCostLabel={createMetaMagicCostLabel}
				onUpdateItems={handleUpdateMetaMagic}
			/>
		</Fragment>
	);
};

export default MagicTab;