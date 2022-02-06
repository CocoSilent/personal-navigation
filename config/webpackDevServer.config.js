const path = require('path');
const config = require('./webpack.common');
const { merge } = require('webpack-merge');

module.exports = merge(config, {
    mode: "development",
    devtool: 'inline-source-map',
    devServer: {
        static: {
            directory: path.join(__dirname, '../dist'),
        },
        compress: true,
        port: 9000,
    },
});