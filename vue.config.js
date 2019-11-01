const path = require('path')
const webpack = require('webpack')

function resolve(dir) {
  return path.join(__dirname, dir)
}

module.exports = {
  css: {
    loaderOptions: {
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
  // webpack 配置2
  // VueCLI 内部的 webpack 配置是通过 webpack- chain 维护的
  // 这个库提供了一个 webpack 原始配置的上层抽象，使其可以定义具名的 loader 规则和具名插件，并有机会在后期进入这些规则并对它们的选项进行修改
  chainWebpack: config => {
    // 针对 moment 第三方库的优化（去掉国际化语言包）
    config.plugin('context')
      .use(webpack.ContextReplacementPlugin,
        [/moment[/\\]locale$/, /zh-cn/])
    config.module
      // .rule('iview')
      // .test(/\.vue$/)
      // .use('iview-loader')
      //   .loader('iview-loader')
      //   .options({
      //     prefix: true
      //   })
    config.resolve.alias
      .set('api', resolve('src/api'))
      .set('common', resolve('src/common'))
      .set('components', resolve('src/components'))
  }
}