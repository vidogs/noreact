import {Component, ComponentId, ContextId, EffectCallback, HookId} from "./jsx";
import {Debug} from "./debug";
import {Context} from "./Context";

class HooksState {
    private currentComponent: Component | undefined
    private nextHookIndex: HookId
    private stack: [Component, HookId][]
    private previousContexts: { [key: ContextId]: [any, Context<any>][] }

    states: { [key: ComponentId]: { [key: HookId]: any } }
    references: { [key: ComponentId]: { [key: HookId]: HTMLElement } }
    effects: { [key: ComponentId]: { [key: HookId]: [string, EffectCallback] } }
    contexts: { [key: ContextId]: [any, Context<any>] }

    constructor() {
        this.currentComponent = undefined
        this.nextHookIndex = 0
        this.stack = []
        this.previousContexts = {}

        this.states = {}
        this.references = {}
        this.effects = {}
        this.contexts = {}
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

    provideContext<T>(context: Context<T>, value: T) {
        if(this.contexts[context.id]) {
            if(!this.previousContexts[context.id]) {
                this.previousContexts[context.id] = []
            }

            const [currentValue, currentContext] = this.contexts[context.id]

            this.previousContexts[context.id].push([currentValue, currentContext])
        }

        this.contexts[context.id] = [value, context]
    }

    exitContext<T>(context: Context<T>) {
        delete this.contexts[context.id]

        if(this.previousContexts[context.id]) {
            if(this.previousContexts[context.id].length > 0) {
                const [currentValue, currentContext] = this.previousContexts[context.id].pop()

                this.contexts[context.id] = [currentValue, currentContext]
            }
        }
    }

    getContext<T>(id: ContextId): [T, Context<T>] {
        if(!this.contexts[id]) {
            console.error('no context provided', id)

            throw new Error('no context provided')
        }

        return this.contexts[id]
    }

    getCurrentState(): [Component, HookId] {
        const id = this.nextHookIndex

        this.nextHookIndex++

        return [this.currentComponent, id]
    }
}

export const hooksState = new HooksState()
