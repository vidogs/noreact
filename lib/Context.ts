import {ContextId} from "./jsx";
import {getNextContextId} from "./utils";
import {ProviderComponent, ProviderComponentProps} from "./ProviderComponent";
import {hooksState} from "./HookState";

export interface Context<T> {
    id: ContextId
    value: T
    Provider: (props: ProviderComponentProps<T>) => ProviderComponent<T>
}

export function createContext<T>(value: T): Context<T> {
    const context: Context<T> = {
        id: getNextContextId(),
        value: value,
        Provider: undefined,
    }

    context.Provider = (props: ProviderComponentProps<T>) => {
        return new ProviderComponent<T>(context, props)
    }

    return context
}
