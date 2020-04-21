const Dotenv = require('dotenv-webpack');
const merge = require('webpack-merge');

const BundleAnalyzerPlugin = require('webpack-bundle-analyzer').BundleAnalyzerPlugin;
const common = require('./webpack.common.js');

module.exports = merge(common, {
  mode: 'development',
  devServer: {
    hot: true,
    port: 8080,
    historyApiFallback: true,
    noInfo: false,
    stats: 'normal',
    watchOptions: {
      poll: true
    }
  },
  plugins: [
    new Dotenv({ path: './client/cfg/dev.env' }),
    new BundleAnalyzerPlugin()
  ]
});
