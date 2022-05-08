// 开发环境配置
const webpack = require('webpack');

const {
  merge
} = require('webpack-merge')
const baseConfig = require('./com.config.js')

const devConfig = {
  devtool: 'eval',
  mode: 'development',
  plugins: [
    new webpack.HotModuleReplacementPlugin()
  ]
}

module.exports = merge(baseConfig, devConfig)
