var webpack = require('webpack');
var path = require('path');
var ExtractTextPlugin = require("extract-text-webpack-plugin");

var extractThemes = new ExtractTextPlugin('./[name].css');

var ROOT_DIR = path.resolve(__dirname, 'src');
var BUILD_DIR = path.resolve(__dirname, 'public');

var config = [{
    entry: ROOT_DIR + '/index.js',
    output: {
        path: BUILD_DIR,
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
                include : ROOT_DIR,
                loader : 'babel-loader'
            }
        ]
    },
    devtool: 'source-map',
}, {
    entry: {
        bundle: ROOT_DIR + "/stylesheets/main.scss",
    },
    output: {
        path: BUILD_DIR,
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
