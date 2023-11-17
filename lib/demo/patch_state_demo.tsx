import JSX from "../jsx";
import {Component} from "../jsx";
import {useState} from "../useState";

export function patch_state_demo(): Component {
    function App(): Component {
        const [state, setState] = useState({
            counter1: 0,
            counter2: 0,
        })

        const patchState = (patch: {}) => {
            setState({
                ...state,
                ...patch,
            })
        }

        return (
            <div>
                <p>Counter 1: {state.counter1}</p>
                <div>
                    <button onclick={() => patchState({counter1: state.counter1 + 1})}>Increase Counter 1</button>
                </div>

                <p></p>

                <p>Counter 2: {state.counter2}</p>
                <div>
                    <button onclick={() => patchState({counter2: state.counter2 + 1})}>Increase Counter 2</button>
                </div>
            </div>
        )
    }

    return <App />
}
