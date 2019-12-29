import { Reducer } from "react";
import { State } from "./model/state";
import { DEFAULT_CHARACTER } from "./data/default-character";
import { Character } from "./model/character";
import { saveCharacter, clearCharacter } from "./persistance";

export enum ActionType {
    UpdateCharacter = "updateCharacter",
    SaveCharacter = "saveCharacter",
    ClearCharacter = "clearCharacter"
}

export type Action = {
    type: ActionType;
    data?: any;
};

export const reducer: Reducer<State, Action> = (state: State, action: Action): State => {
    switch (action.type) {
        case ActionType.UpdateCharacter:
            return { ...state, character: action.data as Character };
        case ActionType.SaveCharacter:
            saveCharacter(state.character);
            return { ...state };
        case ActionType.ClearCharacter:
            clearCharacter();
            return { ...state };
        default:
            return { ...state };
    }
}

export const INITIAL_STATE: State = {
    character: DEFAULT_CHARACTER
};