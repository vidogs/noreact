import {Component, ComponentId, Props, RenderResult} from "./jsx";
import {getNextComponentId, renderComponents} from "./utils";
import {Debug} from "./debug";
import {hooksState} from "./HookState";
import {Context} from "./Context";

export interface ProviderComponentProps<T> extends Props {
    value: T
}

export class ProviderComponent<T> implements Component {
    isComponent: boolean
    id: ComponentId
    props: ProviderComponentProps<T>
    context: Context<T>

    constructor(context: Context<T>, props: ProviderComponentProps<T>) {
        this.id = getNextComponentId()
        this.props = props
        this.context = context
    }

    render(): RenderResult {
        if (Debug.isRenderDebug) {
            console.group('[RENDER]', this.id, '[PROVIDER]', this.context, '[PROPS]', this.props)
        }

        hooksState.provideContext(this.context, this.props.value)

        const nodes = renderComponents(this.props.children)

        hooksState.exitContext(this.context)

        if (Debug.isRenderDebug) {
            console.groupEnd()
        }

        return nodes
    }
}
