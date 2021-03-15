// const path = require('path')
// function resolve(dir) {
//   return path.join(__dirname, dir)
// }
// const timestamp = new Date().getTime()
// const version = require('./package.json').version
// const getConfigName = () => {
//   let configFileName = 'local'
//   switch (process.env.DEPLOY_ENV) {
//     case 'production':
//       configFileName = 'pro'
//       console.log('生产环境 当前版本：v' + version + '-' + timestamp)
//       break
//     case 'development':
//       configFileName = 'dev'
//       console.log('开发环境 当前版本：v' + version + '-' + timestamp)
//       break
//     case 'test':
//       configFileName = 'test'
//       console.log('测试环境 当前版本：v' + version + '-' + timestamp)
//       break
//     default:
//       configFileName = 'local'
//       console.log('本地环境 当前版本：v' + version + '-' + timestamp)
//   }
//   configFileName = configFileName + '.conf.js'
//   return configFileName
// }

module.exports = {
  // publicPath: './',
  // outputDir: 'dist',
  // lintOnSave: true,
  // runtimeCompiler: true, //关键点在这

  // 调整内部的 webpack 配置。
  // 查阅 https://github.com/vuejs/vue-doc-zh-cn/vue-cli/webpack.md
  // chainWebpack: config => {
  //   config.resolve.alias.set('@', resolve('src'))
  //   config.resolve.alias.set('CONFIG', path.resolve(__dirname, 'config/' + getConfigName()))
  //   config.module
  //     .rule('eslint')
  //     .use('eslint-loader')
  //     .loader('eslint-loader')
  //     .tap(options => {
  //       options.fix = true
  //       return options
  //     })

  //   config.module
  //     .rule('md')
  //     .test(/\.md/)
  //     .use('vue-loader')
  //     .loader('vue-loader')
  //     .end()
  //     .use('vue-markdown-loader')
  //     .loader('vue-markdown-loader/lib/markdown-compiler')
  //     .options({
  //       raw: true
  //     })
  // },
  // //
  // configureWebpack: {
  //   //重点
  //   output: {
  //     // 输出重构 打包编译后的js文件名称,添加时间戳.
  //     filename: `js[name]-v${version}-${timestamp}.js`,
  //     chunkFilename: `js[name]-v${version}-${timestamp}.js`
  //   },
  //   externals: {
  //     AMap: 'AMap'
  //   }
  // },

  // 配置 webpack-dev-server 行为。
  devServer: {
    port: 8080,
    proxy: {
      '/': {
        target: 'http://47.101.201.21:15080',
        changeOrigin: true,
        pathRewrite: {
          '^/': ''
        }
      }
    }
  }
  // pages: {
  //   //配置多页面入口
  //   index: {
  //     entry: 'src/main.ts',
  //     template: 'public/index.html'
  //   }
  // }
}
