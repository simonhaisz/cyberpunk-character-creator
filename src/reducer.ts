import { Reducer } from "react";
import { State } from "./model/state";
import { getDefaultCharacter, isDefaultCharacter, hasDefaultKey } from "./data/default-character";
import { Character, CharacterRef } from "./model/character";
import { saveCharacter, clearCharacter, loadCharacter, saveCustomItem } from "./persistance";
import { getDefaultKarma, getCharacterKarma } from "./model/karma";
import { Quality } from "./model/quality";
import { Skills } from "./model/skills";
import { CustomItem } from "./model/custom-item";
import { Spell } from "./model/magic";
import { Gear } from "./model/gear";
import { Dictionary } from "./model/dictionary";

export enum ActionType {
    UpdateCharacter = "updateCharacter",
    SaveCharacter = "saveCharacter",
    ClearCharacter = "clearCharacter",
    SelectCharacter = "selectCharacter",
    LoadQualities = "loadQualities",
    LoadSkills = "loadSkills",
    LoadContacts = "loadContacts",
    LoadSpells = "loadSpells",
    LoadGear = "loadGear",
    LoadCustomItems = "loadCustomItems",
    AddCustomItem = "addCustomItem"
}

export type Action = {
    type: ActionType;
    data?: any;
};

export type UpdateCharacterData = Character;
export type SelectCharacterData = CharacterRef;
export type LoadQualitiesData = Dictionary<Quality[]>;
export type LoadSkillsData = Skills;
export type LoadContactsData = CustomItem[];
export type LoadSpellsData = Dictionary<Spell[]>;
export type LoadGearData = Dictionary<Gear[]>;
export type LoadCustomItemsData = Dictionary<CustomItem>;
export type AddCustomItemData = { path: string, item: CustomItem };

export const reducer: Reducer<State, Action> = (state: State, action: Action): State => {
    switch (action.type) {
        case ActionType.UpdateCharacter: {
            const selectedCharacter = action.data as UpdateCharacterData;
            const karma = getCharacterKarma(state.karma, selectedCharacter, state);
            const characters = [...state.characters];
            if (hasDefaultKey(selectedCharacter)) {
                // character has not been saved yet
                if (isDefaultCharacter(selectedCharacter)) {
                    // don't save copies of the empty character
                    break;
                }
                selectedCharacter.key = Date.now();
                const { key, name, streetName } = selectedCharacter;
                characters.push({ key, name, streetName });
            }
            // the list of characters is not saved separatly - it is constructed from all the available characters
            saveCharacter(selectedCharacter);
            return { ...state, selectedCharacter, characters, karma };
        }
        case ActionType.ClearCharacter: {
            clearCharacter(state.selectedCharacter);
            const characters = state.characters
                .filter(c => c.key !== state.selectedCharacter.key)
                .map(({ key, name, streetName }) => ({ key, name, streetName }));
            return { ...state, characters, selectedCharacter: getDefaultCharacter(), karma: getDefaultKarma() };
        }
        case ActionType.SelectCharacter: {
            const characterRef = action.data as SelectCharacterData;
            // Loading the app with a saved character can throw an error calculating karma cost, as the available data (qualities, etc) have not been loaded yet
            // saveSelectedCharacter(characterRef.key);
            const selectedCharacter = loadCharacter(characterRef.key);
            if (!selectedCharacter) {
                throw new Error(`Could not find saved character ${JSON.stringify(characterRef)}`);
            }
            const karma = getCharacterKarma(state.karma, selectedCharacter, state);
            return { ...state, selectedCharacter, karma};
        }
        case ActionType.LoadQualities: {
            const allQualities = action.data as LoadQualitiesData;
            return { ...state, allQualities };
        }
        case ActionType.LoadSkills: {
            const allSkills = action.data as LoadSkillsData;
            return { ...state, allSkills };
        }
        case ActionType.LoadContacts: {
            const allContacts = action.data as LoadContactsData;
            return { ...state, allContacts}
        }
        case ActionType.LoadGear: {
            const allGear = action.data as LoadGearData;
            return { ...state, allGear };
        }
        case ActionType.LoadSpells: {
            const allSpells = action.data as LoadSpellsData;
            return { ...state, allSpells };
        }
        case ActionType.LoadCustomItems: {
            const customItems = action.data as LoadCustomItemsData;
            return { ...state, customItems };
        }
        case ActionType.AddCustomItem: {
            const newItem = action.data as AddCustomItemData;
            // persist item in local storage for later
            saveCustomItem(newItem.path, newItem.item);
            const customItems = { ...state.customItems };
            customItems[newItem.path] = newItem.item;
            return { ...state, customItems };
        }
    }
    return { ...state };
}

export const INITIAL_STATE: State = {
    characters: [],
    selectedCharacter: getDefaultCharacter(),
    karma: getDefaultKarma(),
    allQualities: { positive: [], negative: [] },
    allSkills: { active: [], knowledge: [], language: [] },
    allContacts: [],
    allSpells: { combat: [], detection: [], health: [], illusion: [], manipulation: [] },
    allGear: {},
    customItems: {},
};