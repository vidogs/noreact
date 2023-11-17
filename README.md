# Lightweight react-like framework 

- Typescript supported
- JSX supported
- States
- Hooks
- Re-render only updated components

[Demo](https://github.com/vidogs/noreact-demo)

## Supported react hooks
- `useState`
- `useEffect`

## Installation & Usage

### Install requirements for demo

```shell
npm install --save-dev typescript ts-loader webpack webpack-cli
npm install @vidog/noreact
```

*Here we use webpack, you can use whatever you want*

### Create some files

**tsconfig.json**
```json
{
    "compilerOptions": {
        "module": "commonjs",
        "target": "ES5",
        "rootDir": "src",
        "outDir": "dist",
        "jsx": "react",
        "reactNamespace": "JSX"
    }
}
```

**webpack.config.js**
```js
const path = require('path')

module.exports = {
    mode: "development",
    devtool: "inline-source-map",
    entry: {
        main: "./src/index.tsx",
    },
    output: {
        path: path.resolve(__dirname, './build'),
        filename: "app.js"
    },
    resolve: {
        extensions: [".ts", ".tsx", ".js", ".jsx"],
    },
    module: {
        rules: [
            {
                test: /\.tsx?$/,
                loader: "ts-loader",
                options: { allowTsInNodeModules: true }
            }
        ]
    }
}
```

**src/index.tsx**
```typescript jsx
import * as NoReact from "@vidog/noreact"
import JSX, {attach, onDomReady, useEffect, useState} from "@vidog/noreact"

interface ButtonProps {
    onclick: (x: any) => void
    children?: NoReact.Component[]
}

function Button(props: ButtonProps): NoReact.Component {
    return (
        <button onclick={props.onclick}>{props.children}</button>
    )
}

function Counter(): NoReact.Component {
    const [counter, setCounter] = useState(0)

    useEffect(() => {
        console.log('[COUNTER]', 'changed to', counter)
    }, [counter])

    const onButtonClick = () => {
        console.log('[CLICK]')

        setCounter(counter + 1)
    }

    return (
        <>
            <p><b>Count:</b> <span style={style}>{counter}</span></p>
            <div>
                <Button onclick={(_) => onButtonClick()}>Click <b>Me</b>!</Button>
            </div>
        </>
    )
}

function App(): NoReact.Component {
    return (
        <div>
            <h1>Hello, world!</h1>
            <Counter />
        </div>
    )
}

onDomReady(() => {
    const root = document.getElementById('root')

    attach(root, <App />)
})
```

**index.html**
```html
<html>
    <head>
        <title>NoReact Demo</title>
        <script src="./build/app.js"></script>
    </head>
    <body>
        <div id="root"></div>
    </body>
</html>
```

### Run

```shell
npx webpack
open index.html
```

## Building and publishing library
```shell
# generate bundle and types
npx tsup lib/lib.ts --dts

# publish library
npm publish --access public
```
