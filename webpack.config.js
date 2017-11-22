const webpack = require('webpack');
const path = require('path');
const ExtractTextPlugin = require("extract-text-webpack-plugin");

const extractThemes = new ExtractTextPlugin('./[name].css');

const MODULE_ROOT_DIR = path.resolve(__dirname, 'module');
const MODULE_BUILD_DIR = path.resolve(__dirname, 'module/public');
const MODULE_MAIN_SCSS = MODULE_ROOT_DIR + "/stylesheets/main.scss";

const DOC_ROOT_DIR = path.resolve(__dirname, 'src');
const DOC_BUILD_DIR = path.resolve(__dirname, 'public');
const DOC_MAIN_SCSS = DOC_ROOT_DIR + "/stylesheets/main.scss";

var config = [{
    entry: MODULE_ROOT_DIR + '/index.js',
    output: {
        path: MODULE_BUILD_DIR,
        filename: 'bundle.js'
    },
    resolve: {
        extensions: ['.js', '.jsx']
    },
    module : {
        loaders : [
            {
                test: /\.(js|jsx)$/,
                exclude: /node_modules/,
                use: [
                    {
                        loader: 'babel-loader',
                        query: {
                            presets: ['es2015', 'react']
                        }
                    }
                ]
            }
        ]
    },
    devtool: 'source-map',
}, {
    entry: {
        bundle: MODULE_MAIN_SCSS,
    },
    output: {
        path: MODULE_BUILD_DIR,
        filename: '[name].css',
    },
    module: {
        rules: [
            {
                test: /\.scss$/,
                use: extractThemes.extract({
                    fallback: "style-loader",
                    use: [{
                        loader: "css-loader",
                        options: {
                            sourceMap: true
                        }
                    }, {
                        loader: "sass-loader",
                        options: {
                            sourceMap: true
                        }
                    }]
                })
            }
        ]
    },
    plugins: [
        extractThemes
    ],
    devtool: 'source-map'
}, {
    entry: DOC_ROOT_DIR + '/App.jsx',
    output: {
        path: DOC_BUILD_DIR + '/js',
        filename: 'bundle.js'
    },
    resolve: {
        extensions: ['.js', '.jsx']
    },
    module : {
        loaders : [
            {
                test: /\.(js|jsx)$/,
                exclude: /node_modules/,
                use: [
                    {
                        loader: 'babel-loader',
                        query: {
                            presets: ['es2015', 'react']
                        }
                    }
                ]
            }
        ]
    },
    devtool: 'source-map',
}, {
    entry: {
        bundle: DOC_MAIN_SCSS,
    },
    output: {
        path: DOC_BUILD_DIR + '/css',
        filename: '[name].css',
    },
    module: {
        rules: [
            {
                test: /\.scss$/,
                use: extractThemes.extract({
                    fallback: "style-loader",
                    use: [{
                        loader: "css-loader",
                        options: {
                            sourceMap: true
                        }
                    }, {
                        loader: "sass-loader",
                        options: {
                            sourceMap: true
                        }
                    }]
                })
            }
        ]
    },
    plugins: [
        extractThemes
    ],
    devtool: 'source-map'
}];

module.exports = config;