import { Character } from "./model/character";

const CHARACTER_KEY = "character";

export function loadCharacter(): Character | undefined {
    const character = localStorage.getItem(CHARACTER_KEY);
    if (character) {
        return JSON.parse(character);
    } else {
        return undefined;
    }
}

export function saveCharacter(character: Character) {
    localStorage.setItem(CHARACTER_KEY, JSON.stringify(character));
}

export function clearCharacter() {
    localStorage.removeItem(CHARACTER_KEY);
}