module.exports = {
  /*
  ** Router config
  */
  /*
  ** Headers of the page
  */
  head: {
    title: 'mynuxt',
    meta: [
      { charset: 'utf-8' },
      { hid: 'description', name: 'viewport', content: 'width=750,user-scalable=no,target-densitydpi=device-dpi' }
    ],
    link: [
      { rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' },
      { rel: 'stylesheet', href: 'https://unpkg.com/element-ui/lib/theme-default/index.css' }
    ]
  },
  build: {
    extend (config, ctx) {
      if (ctx.dev && ctx.isClient) {
        config.module.rules.push({
          enforce: 'pre',
          test: /\.(js|vue)$/,
          loader: 'eslint-loader',
          exclude: /()/
        })
      }
    }
  },
  root: true,
  parser: 'babel-eslint',
  env: {
    browser: true,
    node: true
  },
  extends: 'standard',
  /*
  ** Customize the progress bar color
  */
  loading: { color: '#3B8070' },
  /*
  ** Build configuration
  */
  vender: [
    'axios',
    'mint-ui',
    './assets/js/base.js'
  ],
  babel: {
    'plugins': [['component', [
      {
        'libraryName': 'mint-ui',
        'style': true
      }
    ]]],
    comments: true
  },
  plugins: [
    { src: './plugins/mint-ui', ssr: true }
  ],
  css: [
    'assets/main.css'
  ]
}
