import React, { FC, useReducer } from "react";
import { DispatchContext, StateContext } from "./context";
import { reducer, INITIAL_STATE } from "./reducer";
import { State } from "./model/state";
import { loadCharacter, loadCharacters, loadSelectedCharacter } from "./persistance";
import CharacterCreator from "./component/CharacterCreator";

const App: FC = () => {
    const [state, dispatch] = useReducer(reducer, INITIAL_STATE, (s: State): State => {
        const characters = loadCharacters();
        const selectedCharacterKey = loadSelectedCharacter();
        let selectedCharacter = s.selectedCharacter;
        if (selectedCharacterKey > -1) {
            const selectedCharacterRef = characters.find(c => c.key === selectedCharacterKey);
            if (selectedCharacterRef) {
                const loadedCharacter = loadCharacter(selectedCharacterRef.key);
                if (loadedCharacter) {
                    selectedCharacter = loadedCharacter;
                }
            }
        }
        return { ...s, characters, selectedCharacter };
    });
    return (
        <DispatchContext.Provider value={dispatch}>
            <StateContext.Provider value={state}>
                <CharacterCreator />
            </StateContext.Provider>
        </DispatchContext.Provider>
    );
};

export default App;