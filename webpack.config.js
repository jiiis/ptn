var path = require('path'),
    webpack = require('webpack'),
    webpackMerge = require('webpack-merge'),
    NpmInstallPlugin = require('npm-install-webpack-plugin'),
    ProgressBarPlugin = require('progress-bar-webpack-plugin'),
    lifecycleEvent = process.env.npm_lifecycle_event,
    baseConfig,
    envConfig;

const PATH_ASSETS = 'themes/ptn/assets';
const PATHS = {
    src: {
        shared: {
            top: path.resolve(PATH_ASSETS, 'scripts/src/shared/top')
        }
    },
    dist: {
        scripts: path.resolve(PATH_ASSETS, 'scripts/dist')
    }
};

baseConfig = {
    resolve: {
        root: __dirname,
        alias: {
            assets: path.resolve('themes/ptn/assets')
        }
    },
    module: {
        loaders: [
            {
                test: /\.less$/,
                loader: 'style!css!less'
            }
        ]
    },
    plugins: [
        new NpmInstallPlugin({
            save: true,
            saveDev: true,
            saveExact: true
        }),
        new ProgressBarPlugin()
    ]
};

switch (lifecycleEvent) {
    case 'build':
    default:
        envConfig = {
            entry: {
                'shared/top': PATHS.src.shared.top
            },
            output: {
                filename: '[name].js',
                path: PATHS.dist.scripts
            }
        };
}

module.exports = webpackMerge(baseConfig, envConfig);
