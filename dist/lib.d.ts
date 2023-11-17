type ComponentId = number;
type RenderResult = Node[];
type PropValue = string | number | Component[] | (() => void) | ((HTMLElement: any) => void);
interface Component {
    isComponent: boolean;
    id: ComponentId;
    props: Props;
    render: () => RenderResult;
}
type Props = {
    key?: string;
    $ref?: (HTMLElement: any) => void;
    children?: Component[];
    [id: string]: PropValue;
};
type ComponentKeyFunction = ((props: Props | undefined) => Component) | (() => Component);
type ComponentKey = keyof HTMLElementTagNameMap | ComponentKeyFunction;

declare const JSX: {
    createElement(element: ComponentKey, props: Props, ...children: Component[]): Component;
};
declare namespace JSX {
    type Element = Component;
    interface IntrinsicElements {
        [elemName: string]: any;
    }
}

declare function useState<T>(initialValue: T): [T, (data: T) => void];

declare function useEffect(effect: () => void, dependencies: any[]): void;

declare function useReference<T extends HTMLElement>(): [() => T, (data: T) => void];

declare function onDomReady(cb: Function): void;
declare function attach(root: HTMLElement, component: Component): void;

export { type Component, JSX, attach, JSX as default, onDomReady, useEffect, useReference, useState };
