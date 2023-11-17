import JSX from "../jsx";
import {Component} from "../jsx";
import {attach, onDomReady} from "../utils";

export function helloDemo() {
    function App(): Component {
        return (
            <div>
                <h1>Hello, world!</h1>
            </div>
        )
    }

    onDomReady(() => {
        const root = document.getElementById('root')

        attach(root, <App />);
    })
}
