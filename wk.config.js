const path = require('path')

module.exports = {
    // 指定入口文件
    entry: "./src/index.js",
    // 指定出口文件
    output: {
        path: path.resolve(__dirname, './dist'),  // 绝对路径
        filename: 'boundle.js'
    }
}