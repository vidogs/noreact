import {Component, ComponentId, ComponentKeyFunction, Props, RenderResult} from "./jsx";
import {componentsNodes, getNextComponentId} from "./utils";
import {hooksState} from "./HookState";
import {Debug} from "./debug";

export class FunctionComponent implements Component {
    isComponent: boolean = true
    id: ComponentId
    props: Props
    func: ComponentKeyFunction

    constructor(func: ComponentKeyFunction, props: Props = {}) {
        this.id = getNextComponentId()
        this.props = props
        this.func = func
    }

    render(): RenderResult {
        if (Debug.isRenderDebug) {
            console.group('[RENDER]', this.id, '[FUNCTION]', 'with props', this.props)
        }

        const functionResult = this.func(this.props)

        hooksState.enterState(this)

        const nodes = functionResult.render()

        hooksState.exitState()

        componentsNodes[this.id] = [this, nodes]

        if (Debug.isRenderDebug) {
            console.groupEnd()
        }

        return nodes
    }
}
