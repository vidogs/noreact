import {Context} from "./Context";
import {hooksState} from "./HookState";

export function useContext<T>(context: Context<T>): T {
    const [value, _] = hooksState.getContext<T>(context.id)

    return value
}
