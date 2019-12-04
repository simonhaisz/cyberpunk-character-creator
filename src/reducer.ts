import { Reducer } from "react";
import { State } from "./model/state";
import { DEFAULT_CHARACTER } from "./data/default-character";
import { Character } from "./model/character";

export enum ActionType {
    UpdateCharacter = "updateCharacter"
}

export type Action = {
    type: ActionType;
    data: any;
};

export const reducer: Reducer<State, Action> = (state: State, action: Action): State => {
    switch (action.type) {
        case ActionType.UpdateCharacter:
            return { ...state, character: action.data as Character };
        default:
            return { ...state };
    }
}

export const INITIAL_STATE: State = {
    character: DEFAULT_CHARACTER
};