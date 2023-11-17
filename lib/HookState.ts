import {Component, ComponentId, ContextId, EffectCallback, HookId} from "./jsx";
import {Debug} from "./debug";
import {Context} from "./Context";

class HooksState {
    private currentComponent: Component | undefined
    private hookIds: { [key: ComponentId]: HookId }
    private stack: [Component, HookId][]
    private previousContexts: { [key: ContextId]: [any, Context<any>][] }

    states: { [key: ComponentId]: { [key: HookId]: any } }
    references: { [key: ComponentId]: { [key: HookId]: HTMLElement } }
    effects: { [key: ComponentId]: { [key: HookId]: [string, EffectCallback] } }
    contexts: { [key: ContextId]: [any, Context<any>] }

    constructor() {
        this.currentComponent = undefined
        this.hookIds = {}
        this.stack = []
        this.previousContexts = {}

        this.states = {}
        this.references = {}
        this.effects = {}
        this.contexts = {}
    }

    enterState(component: Component) {
        if(!this.hookIds[component.id]) {
            this.hookIds[component.id] = 0
        }

        if (this.currentComponent) {
            this.hookIds[this.currentComponent.id] = 0
            this.stack.push([this.currentComponent, this.hookIds[component.id]])
        }

        if (Debug.isHooksDebug) {
            console.group('[DISPATCHER]', component)
        }

        this.currentComponent = component
    }

    exitState() {
        if (this.stack.length > 0) {
            [this.currentComponent, this.hookIds[this.currentComponent.id]] = this.stack.pop()
        } else {
            this.hookIds[this.currentComponent.id] = 0
            this.currentComponent = undefined
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
        if(!this.hookIds[this.currentComponent.id]) {
            this.hookIds[this.currentComponent.id] = 0
        }

        const id = this.hookIds[this.currentComponent.id]

        this.hookIds[this.currentComponent.id]++

        return [this.currentComponent, id]
    }
}

export const hooksState = new HooksState()
