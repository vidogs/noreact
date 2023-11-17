import JSX from "../jsx";
import {state_demo} from "./state_demo";
import {context_demo} from "./context_demo";
import {hello_demo} from "./hello_demo";
import {reference_demo} from "./reference_demo";
import {attach, onDomReady} from "../utils";
import {effect_demo} from "./effect_demo";
import {loading_demo} from "./loading_demo";
import {patch_state_demo} from "./patch_state_demo";
import {router_demo} from "./router_demo";

const __just_to_compile__ = false

if(__just_to_compile__) {
    hello_demo()
    state_demo()
    patch_state_demo()
    reference_demo()
    context_demo()
    effect_demo()
    loading_demo()
    router_demo()
}

onDomReady(() => {
    const root = document.getElementById('root')

    const app = router_demo()

    attach(root, app)
})
