import {Component, ComponentId, EffectCallback, HookId} from "./jsx";
import {Debug} from "./debug";

class HooksState {
    private currentComponent: Component | undefined
    private nextHookIndex: HookId
    private stack: [Component, HookId][]

    states: { [key: ComponentId]: { [key: HookId]: any } } = {}
    references: { [key: ComponentId]: { [key: HookId]: HTMLElement } } = {}
    effects: { [key: ComponentId]: { [key: HookId]: [string, EffectCallback] } } = {}

    constructor() {
        this.currentComponent = undefined
        this.nextHookIndex = 0
        this.stack = []
    }

    enterState(element: Component) {
        if (this.currentComponent) {
            this.stack.push([this.currentComponent, this.nextHookIndex])
        }

        if (Debug.isHooksDebug) {
            console.group('[DISPATCHER]', element)
        }

        this.currentComponent = element
    }

    exitState() {
        if (this.stack.length > 0) {
            [this.currentComponent, this.nextHookIndex] = this.stack.pop()
        } else {
            this.currentComponent = undefined
            this.nextHookIndex = 0
        }

        if (Debug.isHooksDebug) {
            console.groupEnd()
        }
    }

    getCurrentState(): [Component, HookId] {
        const id = this.nextHookIndex

        this.nextHookIndex++

        return [this.currentComponent, id]
    }
}

export const hooksState = new HooksState()
