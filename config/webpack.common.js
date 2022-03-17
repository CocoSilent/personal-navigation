const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const CopyWebpackPlugin = require('copy-webpack-plugin');


const args = process.argv;
const isEnvDevelopment = args[2] === 'serve';

const publicPath = isEnvDevelopment ? '/' : '//web-6g2g7792915bd2fb-1302006950.tcloudbaseapp.com/nav/';

// css不隔离  less全隔离
const cssRegex = /\.css$/;
// const cssModuleRegex = /\.module\.css$/;
const lessRegex = /\.less$/;
const lessModuleRegex = /\.module\.less$/;

module.exports = {
    entry: './src/index.tsx',
    module: {
        rules: [
            {
                test: cssRegex,
                use: [
                    {
                        loader: 'style-loader',
                    },
                    {
                        loader: 'css-loader',
                        options: {
                            // 样式隔离
                            // modules: true,
                        },
                    },
                ],
            },
            {
                test: lessRegex,
                exclude: lessModuleRegex,
                use: [
                    {
                        loader: 'style-loader',
                    },
                    {
                        loader: 'css-loader',
                        options: {
                            importLoaders: 1,
                        }
                    },
                    {
                        loader: 'less-loader',
                        options: {
                            lessOptions: {
                                strictMath: true,
                            },
                        },
                    },
                ],
            },
            {
                test: lessModuleRegex,
                use: [
                    {
                        loader: 'style-loader',
                    },
                    {
                        loader: 'css-loader',
                        options: {
                            // 样式隔离
                            modules: true,
                            importLoaders: 1,
                        },
                    },
                    {
                        loader: 'less-loader',
                        options: {
                            lessOptions: {
                                strictMath: true,
                            },
                        },
                    },
                ],
            },
            {
                test: /\.tsx?$/,
                use: 'ts-loader',
                exclude: /node_modules/,
            },
            {
                test: /\.(png|svg|jpg|jpeg|gif)$/i,
                include: path.resolve(__dirname, '../src'),
                type: 'asset/resource',
            }
        ],
    },
    resolve: {
        extensions: ['.tsx', '.ts', '.js'],
        fallback: {
            "crypto": require.resolve("crypto-browserify"),
            "stream": require.resolve("stream-browserify")
        },
        alias: {
            '@': './',
        }
    },
    output: {
        path: path.resolve(__dirname, '../dist'),
        filename: 'static/js/[name].[contenthash:8].js',
        publicPath,
        clean: true,
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
    ],
    optimization: {
        splitChunks: {
            chunks: 'all',
        },
        runtimeChunk: 'single',
    }
}
