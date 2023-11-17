import {hooksState} from "./HookState";
import {reRenderElement} from "./utils";
import {Debug} from "./debug";

export function useState<T>(initialValue: T): [T, (data: T) => void] {
    const [component, hookId] = hooksState.getCurrentState()

    if (!hooksState.states[component.id]) {
        hooksState.states[component.id] = {}
    }

    if (hooksState.states[component.id][hookId] === undefined) {
        hooksState.states[component.id][hookId] = initialValue
    }

    if (Debug.isHooksDebug) {
        console.info('[USE STATE]', component.id, '[HOOK ID]', hookId, '[ELEMENT]', component)
    }

    const set = (newValue: T) => {
        if (Debug.isHooksDebug) {
            console.info('[SET STATE]', component.id, '[HOOK ID]', hookId, '[NEW VALUE]', newValue)
        }

        hooksState.states[component.id][hookId] = newValue

        reRenderElement(component)
    }

    return [hooksState.states[component.id][hookId], set]
}
