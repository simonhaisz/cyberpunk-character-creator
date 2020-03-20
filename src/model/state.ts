import { Character, CharacterRef } from "./character";
import { Karma } from "./karma";

export type State = {
    characters: CharacterRef[];
    selectedCharacter: Character;
    karma: Karma;
};