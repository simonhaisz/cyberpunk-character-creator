import { Character, CharacterRef } from "./character";
import { Karma } from "./karma";
import { AllQualities } from "./quality";
import { Skills } from "./skills";
import { CustomItem } from "./custom-item";
import { Spells } from "./magic";
import { Dictionary } from "./dictionary";
import { Gear } from "./gear";

export type State = {
    characters: CharacterRef[];
    selectedCharacter: Character;
    karma: Karma;
    allQualities: AllQualities;
    allSkills: Skills;
    allContacts: CustomItem[];
    allSpells: Spells;
    allGear: Dictionary<Gear[]>;
    customItems: Dictionary<CustomItem>;
};