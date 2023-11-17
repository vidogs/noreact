import {Component, ComponentId, ComponentKeyFunction, Props, RenderResult} from "./jsx";
import {componentsNodes, getNextComponentId} from "./utils";
import {hooksState} from "./HookState";
import {Debug} from "./debug";

export class FunctionComponent implements Component {
    isComponent: boolean = true
    id: ComponentId
    func: ComponentKeyFunction
    props: Props

    constructor(func: ComponentKeyFunction, props: Props = {}) {
        this.id = getNextComponentId()
        this.func = func
        this.props = props
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
