# Soyuz-project Frontend application

Next generation frontend engine, sharpen to driven bussinness focused applications.

Sojuz project is technological 
alliance between backends services, sourcing design, and nice to have frontend implementation.

Extremely light, engine core below 10kb

## Project areas (sight of SoyuzShema)


```

   
   SOYUZ                                   Extended GUTENBERG
   app mockup builder                      blocks shema called
   ══════════════════                      SoyuzShema
                                           ═════════════════════
 ╭─────────┐ 
 │         │
 ├─────────┤   ┌──┐ ┌──────────────╮       ╭───────────────────────────────╮
 └─────────┘   │  │ │           ○○○│       │                            ○○○│
               ├──┤ ├──────────────┤       ├───────────────────────────────┤
   ┌─────────┐ │  │ │              │       │ {                             │
   │         │ └──┘ │              │       │    blockName: core/paragraph  │
   │         │ ┌────┘              │       │    content: Hello world!      │
   └─────────┘ │                   │       │    innerBlocks: [...]         │
   ┌───────────┘                   │       │ }                             │
   │                               │       │                               │
   └───────────────────────────────┘       └───────────────────────────────┘



   With frontend events triggered          And pluggable parts
   on the backend side                     working as applications
   ══════════════════════════════          ═══════════════════════

   Create    ◜־־־־־־־◝   Process           ┌──────────────┐ ┌──────────────┐
   invoice   │       │  checkout           │ Applications │ │ Ecommerce    │
   ───────── │       │ ─────────           │ loader       │ │ module       │
             │       │                     └──────────────┘ └──────────────┘
   Add to    ◟_______◞       Get           ┌──────────────┐ ┌──────────────┐  
   cart      ◟_______◞  products           │ Applications │ │ Events       │
   ───────── ◟_______◞ ─────────           │ builder      │ │ manager      │
             ◟_______◞                     └──────────────┘ └──────────────┘
                    
            
           

```

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

## Wiki

[Wiki](https://github.com/Soyuz-project/Frontend/wiki)

## Roadmap

- [x] Soyuz project frontend engine 
- [x] Apploader (Application)
- [ ] GUI builder (Application)
- [ ] Aplications manager (Application)
- [ ] Events manager (Application)
- [ ] Ecommerce module (Application)
- [ ] STRAPI integration
- [ ] Documentation
- [ ] Ecommerce extended process, invoices, cash flow, store (Application)
- [ ] Soyuz elasticsarch backend service
- [ ] Soyuz elasticsarch backend integration 
- [ ] Elasticsarch statement api
- [ ] WordPerss integration
- [ ] Woocommerce integration
- [ ] Realse appscript with ver 2.0
