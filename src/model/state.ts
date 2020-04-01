import { Character, CharacterRef } from "./character";
import { Karma } from "./karma";
import { Qualities } from "./quality";
import { Skills } from "./skills";
import { Dictionary, Item } from "./custom-item";

export type State = {
    characters: CharacterRef[];
    selectedCharacter: Character;
    karma: Karma;
    qualities: Qualities;
    skills: Skills;
    customItems: Dictionary<Item>;
};