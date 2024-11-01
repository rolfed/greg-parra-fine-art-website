// Generated using webpack-cli https://github.com/webpack/webpack-cli

const path = require('path');
const glob = require('glob');
const packageJson = require('./package.json');

const WorkboxWebpackPlugin = require('workbox-webpack-plugin');
const { DefinePlugin } = require('webpack');

const isProduction = process.env.NODE_ENV == 'production';

// Find all subdirectories within src (e.g., src/handlers, src/utils)
const folders = glob.sync('./src/*/').reduce((entries, folder) => {
    const folderName = path.basename(folder); // e.g., 'handlers', 'utils'
    entries[folderName] = `${folder}index.js`; // Use each folder's index.js as entry
    return entries;
}, {});

const config = {
    entry: {
        main: './src/index.js',
        ...folders,
    },
    resolve: {
        alias: {
            '@handlers': path.resolve(__dirname, 'src/handlers'),
            '@utils': path.resolve(__dirname, 'src/utils'),
        }
    },
    output: {
        path: path.resolve(__dirname, 'dist'),
    },
    plugins: [
        new DefinePlugin({
            LIBRARY_VERSION: JSON.stringify(packageJson.version)

        })
        // Add your plugins here
        // Learn more about plugins from https://webpack.js.org/configuration/plugins/
    ],
    module: {
        rules: [
            {
                test: /\.(js|jsx)$/i,
                loader: 'babel-loader',
                exclude: '/node_modules',
            },
            {
                test: /\.(eot|svg|ttf|woff|woff2|png|jpg|gif)$/i,
                type: 'asset',
            },

            // Add your rules for custom modules here
            // Learn more about loaders from https://webpack.js.org/loaders/
        ],
    },
};

module.exports = () => {
    if (isProduction) {
        config.mode = 'production';


        config.plugins.push(new WorkboxWebpackPlugin.GenerateSW());

    } else {
        config.mode = 'development';
    }
    return config;
};
