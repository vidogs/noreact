const path = require('path')

module.exports = {
    mode: "development",
    devtool: "inline-source-map",
    entry: {
        main: "./lib/demo/index.tsx",
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
