# Soyuz-project Frontend application

Next generation frontend engine, sharpen to driven bussinness focused applications.

Sojuz project is technological 
alliance between backends services, sourcing design, and nice to have frontend implementation.

## Build Setup

```bash
# install dependencies
$ yarn install

# serve with hot reload at localhost:3000
$ yarn dev

# build for production and launch public server
$ yarn build
$ yarn start

# generate static project
$ yarn generate
```

For detailed explanation on how things work, check out [Nuxt.js docs](https://nuxtjs.org).

## Hosting on GithUb Pages

To host this on `gh-pages` run following command:

```bash
yarn gh-pages
```

This will generate static version of Soyuz Frontend with router base set to: `/Frontend` which should be changed inside `nuxt.config-ghpages.js` file if using custom domain, or different repository name.