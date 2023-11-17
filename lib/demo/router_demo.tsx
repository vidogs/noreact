import JSX from "../jsx";
import {Component} from "../jsx";
import {useRouter} from "../useRouter";

const lorem = "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum."

export function router_demo(): Component {
    function NotFound(): Component {
        return (
            <>
                <h1>Not Found</h1>

                <div><a href='#/'>Home</a></div>
            </>
        )
    }

    function Home(): Component {
        return (
            <>
                <h1>Home</h1>

                <div><a href='#/about'>About</a></div>
            </>
        )
    }

    function About(): Component {
        return (
            <>
                <h1>About</h1>

                <div>{lorem}</div>

                <div><a href='#/'>Home</a></div>
            </>
        )
    }

    function App(): Component {
        const router = useRouter('hash',
            () => <NotFound/>,
            {uri: '/', handler: () => <Home/>},
            {uri: '/about', handler: () => <About/>},
        )

        return (
            <div>
                <h1>Router</h1>

                {router}
            </div>
        )
    }

    return <App/>
}
