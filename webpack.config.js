var webpack = require('webpack');
var path = require('path');
var ExtractTextPlugin = require("extract-text-webpack-plugin");

var extractThemes = new ExtractTextPlugin('./[name].css');

var MODULE_ROOT_DIR = path.resolve(__dirname, 'module/src');
var MODULE_BUILD_DIR = path.resolve(__dirname, 'module/public');
var MODULE_MAIN_SCSS = MODULE_ROOT_DIR + "/stylesheets/main.scss";

var DOC_ROOT_DIR = path.resolve(__dirname, 'src');
var DOC_BUILD_DIR = path.resolve(__dirname, 'public');
var DOC_MAIN_SCSS = DOC_ROOT_DIR + "/stylesheets/main.scss";

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
                test: /\.js$/,
                exclude: /node_modules/,
                use: [
                    {
                        loader: 'babel-loader',
                        query: {
                            presets: ['es2015', 'react']
                        }
                    }
                ]
            },
            {
                test : /\.jsx?/,
                exclude: /node_modules/,
                include : MODULE_ROOT_DIR,
                loader : 'babel-loader'
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
                test: /\.js$/,
                exclude: /node_modules/,
                use: [
                    {
                        loader: 'babel-loader',
                        query: {
                            presets: ['es2015', 'react']
                        }
                    }
                ]
            },
            {
                test : /\.jsx?/,
                exclude: /node_modules/,
                include : DOC_ROOT_DIR,
                loader : 'babel-loader'
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