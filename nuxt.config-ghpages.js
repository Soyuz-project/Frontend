import nuxtCfg from './nuxt.config';

export default {
  ...nuxtCfg,
  router: {
    ...nuxtCfg.router,
    base: '/Frontend',
  }
}
