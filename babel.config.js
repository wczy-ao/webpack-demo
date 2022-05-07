// 与wk.config.js 下面的配置二选一
module.exports = {
  presets: [
    [
      '@babel/preset-env',
      {
        useBuiltIns: 'usage' // 实现按需加载
      }
    ]
  ]
}
