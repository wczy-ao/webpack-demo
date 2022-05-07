const path = require('path')

const HtmlWebpackPlugin = require('html-webpack-plugin');
const {
  CleanWebpackPlugin
} = require('clean-webpack-plugin');

const webpack = require('webpack')

module.exports = {
  mode: "development",
  target: 'web',
  // devtool: "eval-source-map",
  // 指定入口文件
  entry: "./src/index.js",
  // 指定出口文件
  output: {
    path: path.resolve(__dirname, './build'), // 绝对路径,
    publicPath: "/",
    filename: 'boundle.js'
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
    new webpack.HotModuleReplacementPlugin()
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
    usedExports: true
  }
}
