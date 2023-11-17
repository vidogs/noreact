import JSX from "../jsx";
import {Context, createContext} from "../Context";
import {Component} from "../jsx";
import {useContext} from "../useContext";
import {attach, onDomReady} from "../utils";

export function contextDemo() {
    const MyContext: Context<number> = createContext(100500)

    function ProviderDemo(): Component {
        const myContextNumber = useContext(MyContext)

        return <div>Number: {myContextNumber}</div>
    }

    function App(): Component {
        return (
            <div>
                <h1>Hello, world!</h1>

                <MyContext.Provider value={3.14}>
                    <ProviderDemo />

                    <MyContext.Provider value={1000-7}>
                        <ProviderDemo />
                    </MyContext.Provider>

                    <ProviderDemo />
                </MyContext.Provider>
            </div>
        )
    }

    onDomReady(() => {
        const root = document.getElementById('root')

        attach(root, <App />);
    })
}
