const path = require('path')

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
  chainWebpack(config) {
    config.module
      .rule('view-design')
      .test(/view-design.src.*?js$/)
      .use('babel')
      .loader('babel-loader')
      .end(),
    config.resolve.alias
      .set('api', resolve('src/api'))
      .set('common', resolve('src/common'))
      .set('components', resolve('src/components'))
  }
}