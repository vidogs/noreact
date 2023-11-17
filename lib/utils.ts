import {Component, ComponentId, RenderResult} from "./jsx";
import {Debug} from "./debug";

let nextElementId: ComponentId = 0

export const componentsNodes: { [key: ComponentId]: [Component, Node[]] } = {}

export function getNextComponentId(): ComponentId {
    const id = nextElementId

    nextElementId++

    return id
}

export function calculateDependenciesHash(dependencies: any[]): string {
    // @todo calculate sha or md5 of objects

    let result = ""

    for (let i in dependencies) {
        const dependency = dependencies[i]

        result += dependency.toString()
    }

    return result
}

export let isComponent = (p: any): p is Component => !!p.isComponent

export function createDocumentFragment(nodes: Node[]): DocumentFragment {
    const fragment = new DocumentFragment()

    fragment.append(...nodes)

    return fragment
}

export function renderComponents(elements: Component[]): RenderResult {
    const children = []

    for (let i in elements) {
        children.push(...renderComponent(elements[i]))
    }

    return children
}

export function renderComponent(element: Component): RenderResult {
    const children = []

    if (!element) {
        return children
    }

    switch (typeof element) {
        case 'object':
            if (isComponent(element)) {
                children.push(...element.render())
            } else if (Array.isArray(element)) {
                children.push(...renderComponents(element))
            } else {
                console.error('unknown object to render')
            }

            break

        default:
            console.error('unknown child to render', typeof element)
    }

    return children
}

export function reRenderElement(component: Component) {
    if (!componentsNodes[component.id]) {
        console.error('no element to re-render in DOM storage', component.id)

        throw new Error("no element to re-render in DOM storage")
    }

    const [_, nodes] = componentsNodes[component.id]

    if (nodes.length < 1) {
        console.error('no nodes to re-render in DOM storage', component.id)

        throw new Error("no nodes to re-render in DOM storage")
    }

    const firstNode = nodes[0]

    if (Debug.isRenderDebug) {
        console.group('[RE-RENDER]', component.id, '[NODE]', firstNode, '[PARENT]', firstNode ? firstNode.parentNode : null, '[CHILDREN]', nodes)
    }

    const removeNodes = (el: Component) => {
        delete componentsNodes[el.id]

        if (el.props.children) {
            for (let i in el.props.children) {
                const childElem = el.props.children[i]

                removeNodes(childElem)
            }
        }
    }

    const newNodes = component.render()

    const fragment = createDocumentFragment(newNodes)

    if (nodes.length > 1) {
        for (let i = 1; i < nodes.length; i++) {
            firstNode.parentNode.removeChild(nodes[i])
        }
    }

    firstNode.parentElement.replaceChild(fragment, firstNode)

    removeNodes(component)

    componentsNodes[component.id] = [component, newNodes]

    if (Debug.isRenderDebug) {
        console.groupEnd()
    }
}

export function onDomReady(cb: Function): void {
    if (document.readyState === "complete" || document.readyState === "interactive") {
        cb()

    } else {
        document.addEventListener("DOMContentLoaded", (event: Event) => {
            cb()
        })
    }
}

export function attach(root: HTMLElement, component: Component) {
    const nodes = component.render()

    const fragment = createDocumentFragment(nodes)

    root.appendChild(fragment)

    componentsNodes[component.id] = [component, nodes]
}
