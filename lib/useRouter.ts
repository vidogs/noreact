import {Component} from "./jsx";
import {Context, createContext} from "./Context";
import {hooksState} from "./HookState";
import {onHashChange, updateComponent} from "./utils";
import {useState} from "./useState";
import {useEffect} from "./useEffect";

export type RouterMode = 'hash' | 'uri'

export interface Route {
    uri: string
    handler: () => Component
}

export interface RouterContextValue {

}

export const RouterContext: Context<RouterContextValue> = createContext<RouterContextValue>({})

// export function runRouter(mode: RouterMode, routes: Route[], update: () => void): Component {
//     //
//     //
//     // useEffect(() => {
//     //     console.log('[NEW URI]', uri)
//     //
//     //     if(oldUri != uri) {
//     //         update()
//     //     }
//     // }, [uri])
//     //
//     // useEffect(() => {
//     //     console.log('[TIMER START]')
//     //
//     //     setTimeout(() => {
//     //         console.log('[TIMER TICK]')
//     //
//     //         setUri(1)
//     //     }, 2000)
//     // }, [])
//     //
//     // return routes[uri].handler()
// }

let updateRouter: () => void

onHashChange(() => {
    if(updateRouter) {
        updateRouter()
    }
})

export function useRouter(mode: RouterMode, notFound: () => Component, ...routes: Route[]): Component {
    const [component, _] = hooksState.getCurrentState()
    let [uri, setUri] = useState(window.location.hash)

    const update = () => {
        console.log('[UPDATE]')
        updateComponent(component)
    }

    updateRouter = () => {
        setUri(window.location.hash)
    }

    useEffect(() => {
        console.log('[NEW URI]', uri)

        update()
    }, [uri])

    uri = uri.trim()

    if(uri[0] == '#') {
        uri = uri.slice(1)
    }

    if(!uri) {
        uri = '/'
    }

    let handler: () => Component = notFound

    for(let i in routes) {
        const route = routes[i]
        if(uri == route.uri) {
            console.log('[ROUTE]', route.uri)
            handler = route.handler
            break
        }
    }

    return handler()
}
