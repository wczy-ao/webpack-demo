// 生产环境配置
const path = require('path')
const {
  merge
} = require('webpack-merge')
const baseConfig = require('./com.config.js')

const HtmlWebpackPlugin = require('html-webpack-plugin');
const {
  CleanWebpackPlugin
} = require('clean-webpack-plugin');

const webpack = require('webpack')

const prodConfig = {
  mode: "production",
  devtool: "cheap-module-source-map",
}

module.exports = merge(baseConfig, prodConfig)
