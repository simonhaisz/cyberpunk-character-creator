import { Character, CharacterRef } from "./character";
import { Karma } from "./karma";
import { AllQualities } from "./quality";
import { Skills } from "./skills";
import { Dictionary, Item } from "./custom-item";
import { Spells } from "./magic";
// import { AllGear } from "./gear";

export type State = {
    characters: CharacterRef[];
    selectedCharacter: Character;
    karma: Karma;
    allQualities: AllQualities;
    allSkills: Skills;
    allContacts: Item[];
    allSpells: Spells;
    allGear: any;
    customItems: Dictionary<Item>;
};