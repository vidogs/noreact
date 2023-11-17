import JSX from "../jsx";
import {Component} from "../jsx";

export function hello_demo(): Component {
    function App(): Component {
        return (
            <div>
                <h1>Hello, world!</h1>
            </div>
        )
    }

    return <App />
}
