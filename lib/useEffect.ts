import {hooksState} from "./HookState";
import {calculateDependenciesHash} from "./utils";

export function useEffect(effect: () => void, dependencies: any[]) {
    const [jsxElement, hookId] = hooksState.getCurrentState()

    if (!hooksState.effects[jsxElement.id]) {
        hooksState.effects[jsxElement.id] = {}
    }

    const hash = calculateDependenciesHash(dependencies)

    if (!hooksState.effects[jsxElement.id][hookId]) {
        hooksState.effects[jsxElement.id][hookId] = [hash, effect]

        effect()
    } else {
        const [currentHash, currentEffect] = hooksState.effects[jsxElement.id][hookId]

        if(currentHash != hash) {
            hooksState.effects[jsxElement.id][hookId] = [hash, effect]

            effect() // @todo ?
        }
    }
}
