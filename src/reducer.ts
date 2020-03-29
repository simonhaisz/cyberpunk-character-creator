import { Reducer } from "react";
import { State } from "./model/state";
import { getDefaultCharacter, isDefaultCharacter, hasDefaultKey } from "./data/default-character";
import { Character, CharacterRef } from "./model/character";
import { saveCharacter, clearCharacter, saveSelectedCharacter, loadCharacter } from "./persistance";
import { getDefaultKarma, getCharacterKarma } from "./model/karma";
import { Qualities } from "./model/quality";
import { Skills } from "./model/skills";

export enum ActionType {
    UpdateCharacter = "updateCharacter",
    SaveCharacter = "saveCharacter",
    ClearCharacter = "clearCharacter",
    SelectCharacter = "selectCharacter",
    LoadQualities = "loadQualities",
    LoadSkills = "loadSkills",
    LoadGear = "loadGear",
}

export type Action = {
    type: ActionType;
    data?: any;
};

export type UpdateCharacterData = Character;
export type SelectCharacterData = CharacterRef;
export type LoadQualitiesData = Qualities;
export type LoadSkillsData = Skills;

export const reducer: Reducer<State, Action> = (state: State, action: Action): State => {
    switch (action.type) {
        case ActionType.UpdateCharacter: {
            const selectedCharacter = action.data as UpdateCharacterData;
            const karma = getCharacterKarma(state.karma, selectedCharacter, state);
            return { ...state, selectedCharacter, karma };
        }
        case ActionType.SaveCharacter: {
            if (hasDefaultKey(state.selectedCharacter)) {
                // character has not been saved yet
                if (isDefaultCharacter(state.selectedCharacter)) {
                    // don't save copies of the empty character
                    break;
                }
                state.selectedCharacter.key = Date.now();
                const { key, name, streetName } = state.selectedCharacter;
                state.characters.push({ key, name, streetName });
            }
            // the list of characters is not saved separatly - it is constructed from all the available characters
            saveCharacter(state.selectedCharacter);
            return { ...state};
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
            saveSelectedCharacter(characterRef.key);
            const selectedCharacter = loadCharacter(characterRef.key);
            if (!selectedCharacter) {
                throw new Error(`Could not find saved character ${JSON.stringify(characterRef)}`);
            }
            const karma = getCharacterKarma(state.karma, selectedCharacter, state);
            return { ...state, selectedCharacter, karma};
        }
        case ActionType.LoadQualities: {
            const qualities = action.data as LoadQualitiesData;
            return { ...state, qualities };
        }
        case ActionType.LoadSkills: {
            const skills = action.data as LoadSkillsData;
            return { ...state, skills };
        }
        case ActionType.LoadGear: {
            throw new Error(`'${ActionType.LoadGear}' action not supported`);
        }
    }
    return { ...state };
}

export const INITIAL_STATE: State = {
    characters: [getDefaultCharacter()],
    selectedCharacter: getDefaultCharacter(),
    karma: getDefaultKarma(),
    qualities: { positive: [], negative: [] },
    skills: { active: [], knowledge: [], language: [] },
};