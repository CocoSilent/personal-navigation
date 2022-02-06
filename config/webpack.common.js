const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
var CopyWebpackPlugin = require('copy-webpack-plugin'); CopyWebpackPlugin = require('copy-webpack-plugin');


const publicPath = '/'

module.exports = {
    entry: './src/index.tsx',
    module: {
        rules: [
            {
                test: /\.tsx?$/,
                use: 'ts-loader',
                exclude: /node_modules/,
            },
        ],
    },
    resolve: {
        extensions: ['.tsx', '.ts', '.js'],

    },
    output: {
        path: path.resolve(__dirname, '../dist'),
        filename: 'static/js/[name].[contenthash:8].js',
        publicPath,
    },
    plugins: [
        new CopyWebpackPlugin({
            patterns: [
                { from: "public/", globOptions: {
                    ignore: ["**/*.html"],
                } },
            ],
        }),
        new HtmlWebpackPlugin({
            template: "public/index.html",
            publicPath,
        }),
    ]
}