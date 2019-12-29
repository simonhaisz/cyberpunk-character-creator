import React, { FC, useReducer } from "react";
import { CharacterComponent } from "./component/CharacterComponent";
import { DispatchContext, StateContext } from "./context";
import { reducer, INITIAL_STATE } from "./reducer";
import { State } from "./model/state";
import { loadCharacter } from "./persistance";

export const App: FC = () => {
    const [state, dispatch] = useReducer(reducer, INITIAL_STATE, (s: State) => {
        const savedCharacter = loadCharacter();
        const character = savedCharacter || s.character;
        return { ...s, character };
    });
    return (
        <DispatchContext.Provider value={dispatch}>
            <StateContext.Provider value={state}>
                <CharacterComponent />
            </StateContext.Provider>
        </DispatchContext.Provider>
    );
};