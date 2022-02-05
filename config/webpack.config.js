const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');


const publicPath = '/'

module.exports = {
    mode: "production",
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
        filename: 'static/js/[name].[contenthash:8].js'
    },
    plugins: [
        new HtmlWebpackPlugin({
            template: "public/index.html",
            publicPath,
        }),
    ]
}