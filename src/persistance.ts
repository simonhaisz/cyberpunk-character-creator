import { Character, CharacterRef } from "./model/character";

const CHARACTER_KEY = "character";

function createKey(key: number): string {
    return `${CHARACTER_KEY}:${key}`;
}

export function loadCharacters(): CharacterRef[] {
    const characters: CharacterRef[] = [];
    for (let i = 0; i < localStorage.length; i++) {
        const key = localStorage.key(i);
        if (key === null) {
            continue;
        }
        if (/^character:\d+$/i.test(key)) {
            const characterJSON = localStorage.getItem(key);
            if (characterJSON) {
                const { key, name, streetName } = JSON.parse(characterJSON);
                characters.push({ key, name, streetName });
            }
        }
    }
    characters.sort((a, b) => a.key - b.key);
    return characters;
}

export function loadCharacter(key: number): Character | undefined {
    const character = localStorage.getItem(createKey(key));
    if (character) {
        return JSON.parse(character);
    } else {
        return undefined;
    }
}

export function saveCharacter(character: Character) {
    localStorage.setItem(createKey(character.key), JSON.stringify(character));
}

export function clearCharacter(character: Character) {
    localStorage.removeItem(createKey(character.key));
}

const SELECTED_CHARACTER_KEY = "selected-character";

export function loadSelectedCharacter(): number {
    const selectedCharacter = localStorage.getItem(SELECTED_CHARACTER_KEY);
    if (selectedCharacter) {
        return parseInt(selectedCharacter);
    } else {
        return -1;
    }
}

export function saveSelectedCharacter(key: number) {
    localStorage.setItem(SELECTED_CHARACTER_KEY, key.toString());
}

export function clearSelectedCharacter() {
    localStorage.removeItem(SELECTED_CHARACTER_KEY);
}