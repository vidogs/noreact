import {hooksState} from "./HookState";

export function useReference<T extends HTMLElement>(): [() => T, (data: T) => void] {
    const [jsxElement, hookId] = hooksState.getCurrentState()

    if (!hooksState.references[jsxElement.id]) {
        hooksState.references[jsxElement.id] = {}
    }

    if (!hooksState.references[jsxElement.id][hookId]) {
        hooksState.references[jsxElement.id][hookId] = undefined
    }

    const getReference = () => hooksState.references[jsxElement.id][hookId] as T

    const setReference = (x: T) => {
        hooksState.references[jsxElement.id][hookId] = x
    }

    return [getReference, setReference]
}
