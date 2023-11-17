import {TextComponent} from "./TextComponent";
import {isComponent} from "./utils";
import {FunctionComponent} from "./FunctionComponent";
import {FragmentComponent} from "./FragmentComponent";
import {TagComponent} from "./TagComponent";

export type HookId = number

export type ContextId = number

export type ComponentId = number

export type RenderResult = Node[]

export type PropValue = string | number | Component[] | (() => void) | ((HTMLElement) => void) | any

export type EffectCallback = () => void

export interface Component {
    isComponent: boolean
    id: ComponentId
    props: Props
    render: () => RenderResult
}

export type Props = {
    key?: string
    $ref?: (HTMLElement) => void
    children?: Component[]
    [id: string]: PropValue
}

export type ComponentKeyFunction = ((props: Props | undefined) => Component) | (() => Component)

export type ComponentKey = keyof HTMLElementTagNameMap | ComponentKeyFunction

export const JSX = {
    createElement(element: ComponentKey, props: Props, ...children: Component[]): Component {
        props = props || {}

        const elements = []

        for (let i in children) {
            const child = children[i]

            switch (typeof child) {
                case 'string':
                    elements.push(new TextComponent(child))
                    break

                case 'number':
                    elements.push(new TextComponent((child as number).toString()))
                    break

                case 'boolean':
                    elements.push(new TextComponent((child as boolean).toString()))
                    break

                case 'object':
                    if (isComponent(child)) {
                        elements.push(child as Component)
                    } else if (Array.isArray(child)) {
                        elements.push(...(child as Component[]))
                    } else {
                        console.error('unknown object to render')
                    }

                    break

                case 'undefined':
                    break

                default:
                    console.error('unknown child', typeof child)
            }
        }

        props.children = elements

        if (typeof element === 'function') {
            return new FunctionComponent(element, props)
        } else if (element === undefined) {
            return new FragmentComponent(props)
        } else {
            return new TagComponent(element, props)
        }
    },
}

export default JSX

declare module JSX {
    type Element = Component

    interface IntrinsicElements {
        [elemName: string]: any
    }
}

// @todo!!! redraw only changed elements (do not replace in DOM)
// @todo!!! router
