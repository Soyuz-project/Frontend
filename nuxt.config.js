
export default {
  // Global page headers: https://go.nuxtjs.dev/config-head
  head: {
    title: 'soyuz-project',
    htmlAttrs: {
      lang: 'en'
    },
    meta: [
      { charset: 'utf-8' },
      { name: 'viewport', content: 'width=device-width, initial-scale=1' },
      { hid: 'description', name: 'description', content: '' }
    ],
    link: [
      { rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' }
    ]
  },

  // Global CSS: https://go.nuxtjs.dev/config-css
  css: [
    '~/assets/css/soyuz/_core/core.css',
    '~/assets/css/soyuz/colors/colors-wild-berry.css',
    '~/assets/css/soyuz/navigation/url-style-default.css',
    '~/assets/css/soyuz/navigation/nav-list-dropdown-tip.css',
    
    '~/assets/css/soyuz/sizing/width-default.css',
    '~/assets/css/soyuz/sizing/sizing-golden-default.css',

    '~/assets/css/soyuz-forms/checkbox-default.css',
    '~/assets/css/soyuz-forms/select-default.css',
    '~/assets/css/soyuz-forms/file-default.css',

    // '~/assets/css/modules/sliders/whiplash.css',
    // '~/assets/css/modules/layout/masonry.css',
    '~/assets/css/modules/layout/full-height.css',
    '~/assets/css/modules/layout/scrollbar-thin.css',
    '~/assets/css/modules/layout/targeter.css',
    '~/assets/css/modules/navigation/nav-separator.css',
    '~/assets/css/modules/navigation/btn-decorator-default.css',
    

    '~/assets/css/fonts/roboto-condensed-all.css',
  ],

  // Plugins to run before rendering page: https://go.nuxtjs.dev/config-plugins
  plugins: [
    { src: '~/plugins/inner-block', },
    { src: '~/plugins/soyuz-actions-router', },
  ],
  router: {
    prefetchLinks: false,
    extendRoutes(routes, resolve) {
      /*
       *  always app init from components/Page.vue
       */
      const PageComponent = resolve(__dirname, '~/modules/soyuz-core/DataFrame.js');
      /*
       *  to show any routing content with popup
       */
      const modalRoute = [
        {
          path: 'modal/:modalSlug',
        },
        {
          path: 'modal/:modalSlug/:post_name',
        },
        {
          path: 'menu/:menuItem',
        },
        {
          path: 'menu/:menuItem/:menuTarget',
        },
      ];
      routes.push(
        ...[
          /*
           *  custom routes
           *  TODO - rename 'profile' route as 'panel'
           */
          {
            name: 'home',
            path: '/',
            component: PageComponent,
            children: modalRoute,
            props: route => ({urlQuery: { params:{slug:'home'}, query:route.query  }, blockAttrs:{targetable:true}})
          },
          {
            name: 'page',
            path: '/:slug',
            component: PageComponent,
            children: modalRoute,
            props: route => ({urlQuery: { params:route.params, query:route.query }, blockAttrs:{targetable:true}})
          },
        ]
      );
    },

  },

  ssr: false, // Disable Server Side rendering

  // Auto import components: https://go.nuxtjs.dev/config-components
  components: true,

  // Modules for dev and build (recommended): https://go.nuxtjs.dev/config-modules
  buildModules: [
  ],

  // Modules: https://go.nuxtjs.dev/config-modules
  modules: [
    '@nuxtjs/apollo',
  ],

  // Build Configuration: https://go.nuxtjs.dev/config-build
  build: {
  },

  // apollo client
  apollo: {
    clientConfigs: {
      // you can setup multiple clients with arbitrary names
      default: {
        // required
        // strapi
        // httpEndpoint: 'http://185.243.54.202:1337/graphql',
        httpEndpoint: 'http://localhost:4000/graphql',

      },
    }
  },
}
