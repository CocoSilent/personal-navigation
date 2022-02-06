const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');


const publicPath = '/'

module.exports = {
    mode: "development",
    entry: './src/index.tsx',
    devtool: 'inline-source-map',
    devServer: {
        static: {
            directory: path.join(__dirname, '../dist'),
        },
        compress: true,
        port: 9000,
    },
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
        new HtmlWebpackPlugin({
            template: "public/index.html",
            publicPath,
        }),
    ]
}