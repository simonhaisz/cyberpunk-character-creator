import { Character } from "./character";

export function getModifier(character: Character, name: string): number {
	const modifier = character.modifiers.find(m => m.name === name);
	if (modifier) {
		return modifier.rating;
	}
	return 0;
}