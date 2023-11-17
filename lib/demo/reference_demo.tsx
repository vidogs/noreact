import JSX from "../jsx";
import {Component} from "../jsx";
import {useReference} from "../useReference";

export function reference_demo() {
    function App(): Component {
        const [getInputReference, setInputReference] = useReference<HTMLInputElement>()

        const onButtonClick = () => {
            alert(getInputReference().value)
        }

        return (
            <div>
                <input type='text' $ref={setInputReference} />
                <button onclick={onButtonClick}>Alert</button>
            </div>
        )
    }

    return <App />
}
