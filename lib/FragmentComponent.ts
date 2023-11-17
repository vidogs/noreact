import {Component, ComponentId, Props, RenderResult} from "./jsx";
import {getNextComponentId, renderComponents} from "./utils";
import {Debug} from "./debug";

export class FragmentComponent implements Component {
    isComponent: boolean = true
    id: ComponentId
    props: Props

    constructor(props: Props = {}) {
        this.id = getNextComponentId()
        this.props = props
    }

    render(): RenderResult {
        if (Debug.isRenderDebug) {
            console.group('[RENDER]', this.id, '[FRAGMENT]', 'with props', this.props)
        }

        const nodes = renderComponents(this.props.children)

        if (Debug.isRenderDebug) {
            console.groupEnd()
        }

        return nodes
    }
}
