module.exports = {
  // 将部署应用程序的基本URL
  // 将部署应用程序的基本URL。
  // 默认情况下，Vue CLI假设您的应用程序将部署在域的根目录下。
  // https://www.my-app.com/。如果应用程序部署在子路径上，则需要使用此选项指定子路径。例如，如果您的应用程序部署在https://www.foobar.com/my-app/，集baseUrl到'/my-app/'.

  publicPath: process.env.NODE_ENV === 'production' ? './' : './',

  // outputDir: 在npm run build时 生成文件的目录 type:string, default:'dist'
  outputDir: 'dist',

  // 是否为 Babel 或 TypeScript 使用 thread-loader。
  // 该选项在系统的 CPU 有多于一个内核时自动启用，仅作用于生产构建。
  parallel: require('os').cpus().length > 1,

  chainWebpack: config => {
    const svgRule = config.module.rule('svg')
    svgRule.uses.clear()
    svgRule
      .test(/\.svg$/)
      .use('svg-sprite-loader')
      .loader('svg-sprite-loader')
      .options({
        symbolId: 'icon-[name]'
      })

    config.module
      .rule('fonts')
      .test(/\.(code|eot|ttf|otf|woff|woff2?)(\?.*)?$/)
      .use('url-loader')
      .loader('url-loader')
      .tap(options => Object.assign(options, {
        limit: 1024000
      }))

    config.module
      .rule('i18n')
      .resourceQuery(/blockType=i18n/)
      .type('javascript/auto')
      .use('i18n')
      .loader('@kazupon/vue-i18n-loader')
  },

  // configureWebpack: {
  //   externals: {
  //     vue: 'Vue',
  //     axios: 'axios',
  //     'element-ui': 'ElementUI',
  //     'vue-i18n': 'VueI18n',
  //     'vue-class-component': 'vue-class-component',
  //     'vue-property-decorator': 'vue-property-decorator',
  //     'vue-router': 'VueRouter',
  //     vuex: 'Vuex',
  //     'file-saver': 'saveAs',
  //     jquery: '$',
  //     lodash: '_',
  //     moment: 'moment',
  //     vuedraggable: 'vuedraggable',
  //     xlsx: '^0.15.6'
  //   }
  // },
  // pages:{ type:Object,Default:undfind }
  /*
构建多页面模式的应用程序.每个“页面”都应该有一个相应的JavaScript条目文件。该值应该是一
个对象，其中键是条目的名称，而该值要么是指定其条目、模板和文件名的对象，要么是指定其条目
的字符串，
注意：请保证pages里配置的路径和文件名 在你的文档目录都存在 否则启动服务会报错的
*/
  css: { extract: false },
  pages: {
    index: {
      // entry for the page
      entry: 'examples/main.js',
      // the source template
      template: 'public/index.html',
      // output as dist/index.html
      filename: 'index.html'
    }
    // when using the entry-only string format,
    // template is inferred to be `public/subpage.html`
    // and falls back to `public/index.html` if not found.
    // Output filename is inferred to be `subpage.html`.
    // subpage: 'src/subpage/main.js'
  },

  //   lintOnSave：{ type:Boolean default:true } 问你是否使用eslint
  lintOnSave: true,
  // productionSourceMap：{ type:Bollean,default:true } 生产源映射
  // 如果您不需要生产时的源映射，那么将此设置为false可以加速生产构建
  productionSourceMap: false,
  // devServer:{type:Object} 3个属性host,port,https
  // 它支持webPack-dev-server的所有选项

  devServer: {
    port: 8091, // 端口号
    host: 'localhost',
    https: false, // https:{type:Boolean}
    open: true, // 配置自动启动浏览器
    // proxy: 'http://localhost:4000' // 配置跨域处理,只有一个代理
    proxy: {
      '/rbpcservice': {
        // target: 'http://localhost:58855',
        target: 'http://10.191.4.79:8077',
        changeOrigin: true,
        pathRewrite: {
          '^/rbpcservice': ''
        }
      },
      '/rbacservice': {
        target: 'http://localhost:58855',
        changeOrigin: true,
        pathRewrite: {
          '^/rbacservice': ''
        }
      },
      '/usermanagementservice': {
        target: 'http://10.190.80.224:8087',
        changeOrigin: true,
        pathRewrite: {
          '^/usermanagementservice': ''
        }
      },
      '/storageservice': {
        target: 'http://itc-pca-web1:8067',
        changeOrigin: true,
        pathRewrite: {
          '^/storageservice': ''
        }
      },
      '/datacenterservice/api': {
      // '/datacenterservice': {
        target: 'http://localhost:59966',
        // target: 'http://10.190.50.61:8096/maintain/datacenterservice',
        changeOrigin: true,
        pathRewrite: {
          '^/datacenterservice/api': '/api/IIMes/maintain'
          // '^/datacenterservice': ''
        }
      },
      '/dataservice': {
        target: 'http://10.190.50.55:58855',
        changeOrigin: true,
        pathRewrite: {
          '^/dataservice': ''
        }
      },
      '/dataimportservice': {
        target: 'http://10.190.80.224:3001',
        changeOrigin: true,
        pathRewrite: {
          '^/dataimportservice': ''
        }
      },
      '/penservice': {
        target: 'http://10.190.4.57:58865',
        changeOrigin: true,
        pathRewrite: {
          '^/penservice': ''
        }
      }
    }
  }
}
