const config = require('./webpack.common');
const { merge } = require('webpack-merge');

module.exports = merge(config, {
    mode: 'production'
});