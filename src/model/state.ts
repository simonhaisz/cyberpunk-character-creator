import { Character, CharacterRef } from "./character";
import { Karma } from "./karma";
import { AllQualities } from "./quality";
import { Skills } from "./skills";
import { Dictionary, Item } from "./custom-item";
import { Spells, Magic } from "./magic";

export type State = {
    characters: CharacterRef[];
    selectedCharacter: Character;
    karma: Karma;
    allQualities: AllQualities;
    allSkills: Skills;
    allContacts: Item[];
    allSpells: Spells;
    magic: Magic;
    customItems: Dictionary<Item>;
};