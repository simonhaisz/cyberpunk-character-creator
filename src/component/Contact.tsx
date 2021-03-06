import React, { FC, Fragment } from "react";
import ExpansionPanel from "@material-ui/core/Accordion";
import ExpansionPanelSummary from "@material-ui/core/AccordionSummary";
import ExpansionPanelDetails from "@material-ui/core/AccordionDetails";
import ExpandMoreIcon from "@material-ui/icons/ExpandMore";
import Typography from "@material-ui/core/Typography";
import { makeStyles } from "@material-ui/core";
import { Contact as ContactData, getContactCost, getContactRatingCost } from "../model/contact";
import Property from "./Property";
import { NamedProperty } from "../model/character";
import { useGlobalState } from "../context";
import { getMaxConnection } from "../model/create-options";

const useStyles = makeStyles({
	headerLabel: {
		fontWeight: 700,
	},
	details: {
		display: "flex",
		flexDirection: "column",
	},
	rating: {
		marginTop: 30,
	}
});

type Props = {
	contact: ContactData;
	onUpdate: (contact: ContactData) => void;
};
const Contact: FC<Props> = (props: Props) => {
	const { contact, onUpdate } = props;

	const options = useGlobalState("selectedCharacter").options;

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

	const maxConnection = getMaxConnection(options.connectionLevel);

	return (
		<Fragment>
			<ExpansionPanel defaultExpanded={false}>
				<ExpansionPanelSummary expandIcon={<ExpandMoreIcon />}>
					<Typography className={classes.headerLabel}>{contact.name} ({contactCost})</Typography>
				</ExpansionPanelSummary>
				<ExpansionPanelDetails>
					<div className={classes.details}>
						<div className={classes.rating}>
							<Property
								property={connection}
								onUpdate={onUpdateConnection}
								min={1}
								max={maxConnection}
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
				</ExpansionPanelDetails>
			</ExpansionPanel>
		</Fragment>
	);
}

export default Contact;