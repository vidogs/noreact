import {Component, ComponentId, Props, RenderResult} from "./jsx";
import {getNextComponentId, renderComponent} from "./utils";
import {Debug} from "./debug";

export class TagComponent implements Component {
    isComponent: boolean = true
    id: ComponentId
    props: Props
    tag: keyof HTMLElementTagNameMap

    constructor(tag: keyof HTMLElementTagNameMap, props: Props = {}) {
        this.id = getNextComponentId()
        this.props = props
        this.tag = tag
    }

    render(): RenderResult {
        if (Debug.isRenderDebug) {
            console.group('[RENDER]', this.id, '[TAG]', this.tag, '[PROPS]', this.props)
        }

        const childrenWithNodes: [Component, RenderResult][] = []

        if (this.props.children) {
            for (let i in this.props.children) {
                const child = this.props.children[i]

                const nodes = renderComponent(child)

                childrenWithNodes.push([child, nodes])
            }
        }

        const tagNode = document.createElement(this.tag)

        for (let key in this.props) {
            if (key === 'children') {
                continue
            }

            const value = this.props[key]

            if (Debug.isRenderDebug) {
                console.log('[TAG]', tagNode, '[PROP]', key, '[VALUE]', value)
            }

            if (typeof value === 'function') {
                tagNode[key] = value
            } else {
                tagNode.setAttribute(key, value.toString())
            }
        }

        for (let i in childrenWithNodes) {
            const [child, nodes] = childrenWithNodes[i]

            if(child.props.$ref && nodes.length > 1) {
                console.error("too many nodes for $ref", child)

                throw new Error("too many nodes for $ref")
            } else if (child.props.$ref) {
                const node = nodes[0]

                const addedNode = tagNode.appendChild(node)

                child.props.$ref(addedNode)
            } else {
                for (let n in nodes) {
                    const node = nodes[n]

                    tagNode.appendChild(node)
                }
            }
        }

        if (Debug.isRenderDebug) {
            console.groupEnd()
        }

        return [tagNode]
    }
}
