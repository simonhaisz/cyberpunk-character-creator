import React, { FC, Fragment } from "react";
import List from "@material-ui/core/List";
import Typography from "@material-ui/core/Typography";
import { makeStyles } from "@material-ui/core";
import PickerButton from "./PickerButton";
import Contact from "./Contact";
import { useDispatch, useGlobalState } from "../context";
import { Contact as ContactData, getAllContactsCost, getFreeContactPoints } from "../model/contact";
import { UpdateCharacterData, ActionType, AddCustomItemData } from "../reducer";
import { getChildItems, CustomItem } from "../model/custom-item";

const useStyles = makeStyles({
	header: {
		display: "flex",
		flexDirection: "row",
	},
	headerLabel: {
		lineHeight: 3,
		fontWeight: 700,
	},
});

const breadcrums = ["Contacts"];
const parentPath = breadcrums.join(".");

const ContactList: FC = () => {
	const classes = useStyles();
	const dispatch = useDispatch();
	const character = useGlobalState("selectedCharacter");
	const allContacts = useGlobalState("allContacts");
	const customItems = useGlobalState("customItems");
	const { contacts: selectedContacts } = character;

	selectedContacts.sort((a, b) => a.name.localeCompare(b.name));

	const contactsCost = getAllContactsCost(character);
	const freeContactPoints = getFreeContactPoints(character);
    const totalCost = contactsCost - freeContactPoints;
	const headerLabel = `Contacts (${contactsCost} - ${freeContactPoints} = ${totalCost})`;
	
	allContacts.push(...getChildItems(customItems, parentPath));
    allContacts.sort((a, b) => a.Name.localeCompare(b.Name));

	const onContactUpdate = (contact: ContactData) => {
		const newContacts = [...selectedContacts];
		const contactIndex = selectedContacts.findIndex(s => s.name === contact.name);
		if (contactIndex > -1) {
			if (contact.connection > 0 && contact.loyalty > 0) {
				newContacts[contactIndex] = contact;
			} else {
				newContacts.splice(contactIndex, 1);
			}
		} else if (contact.connection > 0 && contact.loyalty > 0) {
			newContacts.push(contact);
		}
		const data: UpdateCharacterData = { ...character, contacts: newContacts };
		dispatch({ type: ActionType.UpdateCharacter, data });
	};

	const addContact = (name: string) => {
		onContactUpdate({ name, connection: 1, loyalty: 1 });
	};

	const removeContact = (name: string) => {
		onContactUpdate({ name, connection: -1, loyalty: -1 });
	};

	const createNewContact = (item: CustomItem) => {
        const path = `${parentPath}.${item.Name}`;
        const data: AddCustomItemData = { path, item: item };
        dispatch({ type: ActionType.AddCustomItem, data });
    };

	return (
		<Fragment>
			<div className={classes.header}>
				<PickerButton
					breadcrums={breadcrums}
					values={allContacts}
					selectedValueNames={selectedContacts.map(s => s.name)}
					addValue={addContact}
					removeValue={removeContact}
					allowNewValues
					createValue={createNewContact}
				/>
				<Typography className={classes.headerLabel}>{headerLabel}</Typography>
			</div>
			<List>
				{
					selectedContacts.map(c => (
						<Contact key={c.name} contact={c} onUpdate={onContactUpdate} />
					))
				}
				</List>
		</Fragment>
	);
}

export default ContactList;