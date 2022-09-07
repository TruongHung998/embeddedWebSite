const DEFAULT_BUILD_MODE = 'local'
const BUILD_MODE = process.env.BUILD_MODE || DEFAULT_BUILD_MODE
const DEFAULT_BASE_URL = '/'
const BASE_URL = {
  local: '/',
  staging: 'https://cdn.vkl.vn/',
  production: 'https://app.e-plus.vn/form/',
  firebase: 'https://dat-hen-noi-bo-2ft2342342jh234.web.app/'
}[BUILD_MODE] || DEFAULT_BASE_URL

module.exports = {
  filenameHashing: true,

  publicPath: BASE_URL,

  css: {
    extract: false,
  },

  pages: {
    dev: {
      entry: './src/dev.js',
      title: 'Dev'
    }
  },

  configureWebpack: {
    optimization: {
      splitChunks: false
    }
  },

  chainWebpack: config => {
    // config.plugins.delete('html')
    // config.plugins.delete('preload')
    // config.plugins.delete('prefetch')
    config.entryPoints.delete('app')
    if (BUILD_MODE !== 'local')
      config.entryPoints.delete('dev')

    config.module
			.rule('vue')
			.use('vue-svg-inline-loader')
      .loader('vue-svg-inline-loader')

    config
      .entry('embed')
      .add('./src/embed.js')
      .end()
  }
}
