const path = require('path')

module.exports = {
  css: {
    loaderOptions: {
      less: {
        // 若 less-loader 版本小于 6.0，请移除 lessOptions 这一级，直接配置选项。
        // lessOptions: {
        modifyVars: {
          hack: `true; @import "${path.join(
            __dirname,
            './src/assets/less/index.less'// 这个import 的路径必须是绝对路径，所以需要path.join
          )}";`
        }
      }
      // }
    }
  },
  configureWebpack: {
    resolve: {
      alias: {
        assets: '@/assets',
        common: '@/common',
        components: '@/components',
        network: '@/network',
        views: '@/views'
      }
    }
  }
}
