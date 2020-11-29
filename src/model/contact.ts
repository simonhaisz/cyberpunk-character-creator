import { Character } from "./character";

export type Contact = {
	name: string;
	connection: number;
	loyalty: number;
};

export function getContactRatingCost(rating: number): number {
	switch (rating) {
		case 1:
			return 2;
		case 3:
			return 7;
		case 5:
			return 15;
		case 7:
			return 30;
		default:
			throw new Error();
	}
}

export function getContactCost(contact: Contact): number {
	let cost = 0;
	cost += getContactRatingCost(contact.connection);
	cost += getContactRatingCost(contact.loyalty);
	return cost;
}

export function getFreeContactPoints(character: Character): number {
    const charisma = character.attributes.find(a => a.name === "Charisma");
    if (charisma === undefined) {
        throw new Error(`Character '${character.streetName}' has no attribute 'Charisma'`);
    }
    const willpower = character.attributes.find(a => a.name === "Willpower");
    if (willpower === undefined) {
        throw new Error(`Character '${character.streetName}' has no attribute 'Willpower'`);
    }
    return (charisma.rating + willpower.rating) * 10;
}

export function getAllContactsCost(character: Character): number {
	return character.contacts.map(c => getContactCost(c)).reduce((a, b) => a + b, 0);
}