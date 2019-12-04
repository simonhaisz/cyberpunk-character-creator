import { createContext, Dispatch, useContext } from "react";
import { State } from "./model/state";
import { Action, INITIAL_STATE } from "./reducer";

export const DispatchContext = createContext<Dispatch<Action>>(() => {});

export const useDispatch = (): Dispatch<Action> => {
    return useContext(DispatchContext);
}

export const StateContext = createContext<State>(INITIAL_STATE);

export const useGlobalState = <K extends keyof State>(property: K) => {
    const state = useContext(StateContext);
    return state[property];
}