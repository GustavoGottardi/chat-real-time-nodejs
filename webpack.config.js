const path = require('path');
const webpack = require('webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = {
    entry: './app/app.js',
    output: {
        path: './dist/',
        filename: 'app-bundle.js'
    },
    plugins: [
        new webpack.optimize.DedupePlugin(),
        new HtmlWebpackPlugin({template: './app/index.html'}),
    ],

    module: {
        loaders: [
            {
                test: /\.js$/,
                exclude: /(node_modules|bower_components)/,
                loader: 'babel-loader',
                query: {
                    presets: ['es2015']
                }
            },
            {
                test: /\.scss$/,
                loader: 'style!css!sass'
            },
            {
                test: /\.css$/,
                loader: 'style!css'
            },
            {
                test: /\.woff(2)?(\?v=[0-9]\.[0-9]\.[0-9])?$/,
                loader: "url?limit=10000&mimetype=application/font-woff"
            },
            {
                test: /\.(jpe?g|png|gif|ttf|eot|svg)(\?v=[0-9]\.[0-9]\.[0-9])?$/,
                loader: "file"
            },
            { 
                test: /\.(png|jpg)$/, 
                loader: 'url-loader?limit=8192'
            },
            { 
                test: /\.html$/, 
                loader: 'raw' 
            },
            {
                test: /\.json$/,
                loader: 'json'
            }
        ]
    },
    devtool: 'source-map'
};
