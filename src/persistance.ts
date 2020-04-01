import { Character, CharacterRef } from "./model/character";
import { Item, Dictionary } from "./model/custom-item";

const CHARACTER_KEY = "character";

function createCharacterKey(key: number): string {
    return `${CHARACTER_KEY}:${key}`;
}

export function loadCharacters(): CharacterRef[] {
    const characters: CharacterRef[] = [];
    for (let i = 0; i < localStorage.length; i++) {
        const key = localStorage.key(i);
        if (key === null) {
            continue;
        }
        // charater:1337
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
    const character = localStorage.getItem(createCharacterKey(key));
    if (character) {
        return JSON.parse(character);
    } else {
        return undefined;
    }
}

export function saveCharacter(character: Character) {
    localStorage.setItem(createCharacterKey(character.key), JSON.stringify(character));
}

export function clearCharacter(character: Character) {
    localStorage.removeItem(createCharacterKey(character.key));
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

const CUSTOM_ITEM_KEY = "custom-item";

function createCustomItemKey(path: string, name: string): string {
    return `${CUSTOM_ITEM_KEY}:${path}.${name}}`;
}

export function loadCustomItems(): Dictionary<Item> {
    const customItems: Dictionary<Item> = {};
    for (let i = 0; i < localStorage.length; i++) {
        const key = localStorage.key(i);
        if (key === null) {
            // not a custom item
            continue;
        }
        /*
        custom-item:category.group.name => [
            "custom-item:category.group.name",
            "category.group",
            "name"
        ]
        */
        const result = /^custom-item:(?:((?:(?:\w+)(?:\.)?)*)\.)?(\w+)$/i.exec(key);
        if (result) {
            const path = result[1];
            const itemJSON = localStorage.getItem(key);
            if (itemJSON) {
                const item = JSON.parse(itemJSON);
                customItems[path] = item;
            }
        }
    }
    return customItems;
}

export function saveCustomItem(path: string, item: Item) {
    const key = createCustomItemKey(path, item.Name);
    localStorage.setItem(key, JSON.stringify(item));
}

export function clearCustomItem(path: string, item: Item) {
    const key = createCustomItemKey(path, item.Name);
    localStorage.removeItem(key);
}