import {hooksState} from "./HookState";
import {calculateDependenciesHash} from "./utils";

export function useEffect(effect: () => void, dependencies: any[]) {
    const [component, hookId] = hooksState.getCurrentState()

    if (!hooksState.effects[component.id]) {
        hooksState.effects[component.id] = {}
    }

    const hash = calculateDependenciesHash(dependencies)

    if (!hooksState.effects[component.id][hookId]) {
        hooksState.effects[component.id][hookId] = [hash, effect]

        effect()
    } else {
        const [currentHash, currentEffect] = hooksState.effects[component.id][hookId]

        if(currentHash != hash) {
            hooksState.effects[component.id][hookId] = [hash, effect]

            effect() // @todo ?
        }
    }
}
