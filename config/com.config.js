// 两个环境通用配置
const path = require('path')

const HtmlWebpackPlugin = require('html-webpack-plugin');
const {
  CleanWebpackPlugin
} = require('clean-webpack-plugin');
const TerserPlugin = require("terser-webpack-plugin");
const UglifyJsPlugin = require('uglifyjs-webpack-plugin')
const webpack = require('webpack')

module.exports = {
  mode: "development",
  target: 'web',
  // devtool: "eval-source-map",
  // 指定入口文件
  entry: "./src/index.js",
  // 指定出口文件
  output: {
    path: path.resolve(__dirname, '../build'), // 绝对路径,
    publicPath: "/",
    filename: '[name].js'
  },
  module: {
    rules: [{
        test: /\.css$/,
        use: [
          "style-loader",
          "css-loader",
          {
            loader: 'postcss-loader',
            options: {
              postcssOptions: {
                plugins: [
                  [
                    'autoprefixer',
                    {
                      // 选项
                    },
                  ],
                ],
              },
            },
          },
        ]
      },
      {
        test: /\.less$/,
        use: [
          "style-loader",
          "css-loader",
          "less-loader"
        ]
      },
      {
        test: /\m?.js$/,
        loader: "babel-loader",
        // use: [
        //   {
        //     loader: "babel-loader",
        //     options: {
        //       presets: [
        //         [
        //           "@babel/preset-env",
        //           {
        //             useBuiltIns: "usage", // 实现按需加载
        //           }
        //         ]
        //       ]
        //     }
        //   }
        // ],
        exclude: /node_modules/
      },

    ]
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: './index.html'
    }),
    new CleanWebpackPlugin(),
    new webpack.HotModuleReplacementPlugin(),
    new webpack.IgnorePlugin({
      resourceRegExp: /^\.\/locale$/,
      contextRegExp: /moment$/
    }),



  ],
  devServer: {
    static: {
      directory: path.join(__dirname, '/'),
    },
    port: 7777,
    open: true,
    compress: true,
  },
  optimization: {
    // usedExports: true // tree shaking
    minimize: true, //这个可以压缩loader代码 https://webpack.docschina.org/migrate/3/#uglifyjsplugin-minimize-loaders
    minimizer: [new TerserPlugin({
        test: /moment/,
      }),
      new UglifyJsPlugin({
        compress: {
          warnings: false
        }
      })
    ],
    splitChunks: {
      chunks: 'all',
      minSize: 30, //提取出的chunk的最小大小
      cacheGroups: {
        default: {
          name: 'common',
          chunks: 'initial',
          minChunks: 1, //模块被引用2次以上的才抽离
          priority: -20
        },
        vendors: { //拆分第三方库（通过npm|yarn安装的库）
          test: /[\\/]node_modules[\\/]/,
          name: 'vendor',
          chunks: 'initial',
          priority: -10
        }
      }
    }
  }
}
