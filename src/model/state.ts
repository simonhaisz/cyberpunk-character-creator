import { Character, CharacterRef } from "./character";
import { Karma } from "./karma";
import { Qualities } from "./quality";

export type State = {
    characters: CharacterRef[];
    selectedCharacter: Character;
    karma: Karma;
    qualities: Qualities;
};