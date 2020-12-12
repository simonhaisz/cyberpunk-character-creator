import { getNaturalAttributeRating } from "./attributes";
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
    const charisma = getNaturalAttributeRating(character, "Charisma");
    const willpower = getNaturalAttributeRating(character, "Willpower");
    return (charisma + willpower) * 10;
}

export function getAllContactsCost(character: Character): number {
	return character.contacts.map(c => getContactCost(c)).reduce((a, b) => a + b, 0);
}

export function getContactsCost(character: Character): number {
	const allContactsCost = getAllContactsCost(character);
	const freeContactPoints = getFreeContactPoints(character);
	return Math.max(allContactsCost - freeContactPoints, 0);
}