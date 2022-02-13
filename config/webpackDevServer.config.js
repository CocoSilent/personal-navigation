// const path = require('path');
const config = require('./webpack.common');
const { merge } = require('webpack-merge');

module.exports = merge(config, {
    mode: "development",
    devtool: 'inline-source-map',
    devServer: {
        // 通过CopyWebpackPlugin拷贝了 这里就不用了
        // static: {
        //     directory: path.join(__dirname, '../public'),
        // },
        compress: true,
        port: 9000,
        hot: true, // 热更新
        client: {
            overlay: {
                errors: true,
                warnings: false,
            },
            progress: true,
        },
    },
});
