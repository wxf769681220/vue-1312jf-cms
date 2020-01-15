const path = require('path')
const webpack = require('webpack')

function resolve(dir) {
  return path.join(__dirname, dir)
}

module.exports = {
  css: {
    loaderOptions: {
      // iview4.0 需要添加 less-loader
      less: {
        javascriptEnabled: true
      }
    }
  },
  // webpack 配置1
  configureWebpack: config => {
    if (process.env.NODE_ENV === 'production') {
      // 为生产环境修改配置...
    } else {
      // 为开发环境修改配置...
    }
  },
  chainWebpack: config => {
    // 针对 moment 插件语言包优化
    config.plugin('context')
      .use(webpack.ContextReplacementPlugin,
        [/moment[/\\]locale$/, /zh-cn/])
    // 配置别名
    config.resolve.alias
      .set('api', resolve('src/api'))
      .set('common', resolve('src/common'))
      .set('components', resolve('src/components'))
  }
}