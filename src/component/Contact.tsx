import React, { FC } from "react";
import { Contact as ContactData, getContactCost, getContactRatingCost } from "../model/contact";
import { Typography, makeStyles } from "@material-ui/core";
import Property from "./Property";
import { NamedProperty } from "../model/character";

const useStyles = makeStyles({
	root: {
		display: "flex",
		flexDirection: "column",
	},
    header: {
        marginBottom: 40,
	},
	rating: {
		marginBottom: 20,
	}
});

type Props = {
	contact: ContactData;
	onUpdate: (contact: ContactData) => void;
};
const Contact: FC<Props> = (props: Props) => {
	const { contact, onUpdate } = props;

	const classes = useStyles();

	const contactCost = getContactCost(contact);

	const connection: NamedProperty = { name: "Connection", rating: contact.connection };
	const onUpdateConnection = (updatedConnection: NamedProperty) => {
		const updatedContact = { ...contact, connection: updatedConnection.rating };
		onUpdate(updatedContact);
	};
	const loyalty: NamedProperty = { name: "Loyalty", rating: contact.loyalty };
	const onUpdateLoyalty = (updatedLoyalty: NamedProperty) => {
		const updatedContact = { ...contact, loyalty: updatedLoyalty.rating };
		onUpdate(updatedContact);
	};

	return (
		<div className={classes.root}>
			<Typography className={classes.header} variant="h6">{contact.name} ({contactCost})</Typography>
			<div className={classes.rating}>
				<Property
					property={connection}
					onUpdate={onUpdateConnection}
					min={1}
					max={3}
					step={2}
					formatDisplayValue={(value => value.toString())}
					computeCost={getContactRatingCost}
				/>
			</div>
			<div className={classes.rating}>
				<Property
					property={loyalty}
					onUpdate={onUpdateLoyalty}
					min={1}
					max={5}
					step={2}
					formatDisplayValue={(value => value.toString())}
					computeCost={getContactRatingCost}
				/>
			</div>
		</div>
	);
}

export default Contact;