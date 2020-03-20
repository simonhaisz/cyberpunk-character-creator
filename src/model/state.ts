import { Character, CharacterRef } from "./character";

export type State = {
    characters: CharacterRef[];
    selectedCharacter: Character;
};