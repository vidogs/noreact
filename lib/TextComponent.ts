import {Component, ComponentId, Props, RenderResult} from "./jsx";
import {getNextComponentId} from "./utils";
import {Debug} from "./debug";

export class TextComponent implements Component {
    isComponent: boolean = true
    id: ComponentId
    text: string
    props: Props

    constructor(text: string, props: Props = {}) {
        this.id = getNextComponentId()
        this.text = text
        this.props = props
    }

    render(): RenderResult {
        if (Debug.isRenderDebug) {
            console.group('[RENDER]', this.id, '[TEXT]', this.text, 'with props', this.props)
        }

        const textNode = document.createTextNode(this.text)

        if (Debug.isRenderDebug) {
            console.groupEnd()
        }

        return [textNode]
    }
}
