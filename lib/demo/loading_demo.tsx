import JSX from "../jsx";
import {Component} from "../jsx";
import {useState} from "../useState";
import {useEffect} from "../useEffect";

export function loading_demo(): Component {
    function App(): Component {
        const [isLoading, setIsLoading] = useState(true)

        useEffect(() => {
            console.log('Loading...')

            setTimeout(() => {
                console.log('Loaded')

                setIsLoading(false)
            }, 1000)
        }, [])

        let content: Component = <div>Loading...</div>

        if(!isLoading) {
            content = <div>Loading done</div>
        }

        return (
            <div>
                {content}
            </div>
        )
    }

    return <App />
}
