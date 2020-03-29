import { Character, CharacterRef } from "./character";
import { Karma } from "./karma";
import { Qualities } from "./quality";
import { Skills } from "./skills";

export type State = {
    characters: CharacterRef[];
    selectedCharacter: Character;
    karma: Karma;
    qualities: Qualities;
    skills: Skills;
};