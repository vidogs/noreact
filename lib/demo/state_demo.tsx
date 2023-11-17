import JSX from "../jsx";
import {Component} from "../jsx";
import {useState} from "../useState";

export function state_demo(): Component {
    function App(): Component {
        const [counter, setCounter] = useState(0)

        return (
            <div>
                <p>Counter: {counter}</p>
                <div>
                    <button onclick={() => setCounter(counter + 1)}>Increase</button>
                </div>
            </div>
        )
    }

    return <App />
}
