const path = require('path')

module.exports = {
    entry: {
        contentScript: './src/chrome/content-script.ts',
        serviceWorker: './src/chrome/service-worker.ts',
    },
    mode: 'production',
    module: {
        rules: [
            {
                test: /\.ts?$/,
                use: [
                    {
                        loader: 'ts-loader',
                        options: {
                            compilerOptions: { noEmit: false },
                        },
                    },
                ],
                exclude: /node_modules/,
            },
        ],
    },
    resolve: {
        extensions: ['.ts', '.js'],
    },
    output: {
        filename: 'chrome/[name].js',
        path: path.resolve(__dirname, 'build'),
    },
}
