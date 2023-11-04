module.exports = {
    webpack: {
        configure: (webpackConfig, { env, paths }) => {
            return {
                ...webpackConfig,
                entry: {
                    main: [
                        env === 'development' &&
                            require.resolve(
                                'react-dev-utils/webpackHotDevClient',
                            ),
                        paths.appIndexJs,
                    ].filter(Boolean),
                    // This defines the name and file path for the separately compiled files
                    // Filename will be 'build/static/js/[name]' where name is [name]: "path"
                    serviceWorker: './src/chrome/service-worker.ts',
                    contentScript: './src/chrome/content-script.ts',
                },
                output: {
                    ...webpackConfig.output,
                    filename: 'static/js/[name].js',
                },
                optimization: {
                    ...webpackConfig.optimization,
                    runtimeChunk: false,
                },
            }
        },
    },
}
