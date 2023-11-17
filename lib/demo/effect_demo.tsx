import JSX from "../jsx";
import {Component} from "../jsx";
import {useState} from "../useState";
import {useEffect} from "../useEffect";

export function effect_demo(): Component {
    function App(): Component {
        const [counter, setCounter] = useState(0)

        useEffect(() => {
            console.log('Counter changed to', counter)
        }, [counter])

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
