export const default_app_events = [
  {
    slug:'default-page',
    source:'pages', 
    query_variables:{slug: '{router.params.slug}'}
  },
  {
    "name": "Init app loader bar",
    "slug": "soyuz-app-loader-init-event",
    "plugin":'soyuz-app-loader',
    "source": "pages",
    "method": "READ",
    "query_variables": {
      "slug": "soyuz-app-loader"
    }
  },
  {
    "name": "Load app",
    "slug": "soyuz-app-loader-process-event",
    "plugin":'soyuz-app-loader',
    "method": "WRITE",
    "actions":[
      {"push_collection":{"source":"events","value":"{this.parent.data.events}","unique":"slug"}},
      {"push_collection":{"source":"pages","value":"{this.parent.data.pages}","unique":"slug"}},
      {"set_blocks":{"value":"{this.parent.data.blocks}"}},
      {"resolve_mutation":{"success":"The application has been installed"}}
    ]
  }
]
export const default_app_pages = 
[
{
"name": "Header",
"slug": "header",
"type": "page",
"blocks": [
  {
    "blockName": "coresvg",
    "attrs": {
      "className": "-center -middle -bg-c-primary -mar-s -pad-s",
      "size":100,
      "fill":"#fff",
      "viewBox" : "0 0 24 24",
      "path": "M 14.52 1.68 C 13.57 1.67 12.62 2.09 11.68 3.02 C 7.87 6.84 12.03 11.1 9.365 13.77 C 8.668 14.47 8.186 14.38 7.736 13.94 C 7.224 13.42 7.207 13.01 7.904 12.31 L 9.939 10.27 L 7.188 7.52 L 4.996 9.713 C 2.956 11.75 4.07 14.05 5.832 15.81 C 8.14 18.12 10.36 18.28 12.59 16.06 C 16.23 12.41 12.59 7.612 14.58 5.623 C 15.16 5.04 15.63 4.847 16.23 5.439 C 16.77 5.988 16.67 6.543 16.04 7.084 L 14.39 8.736 L 17.14 11.49 L 19 9.633 C 20.97 7.658 20.03 5.454 18.16 3.596 C 16.97 2.404 15.74 1.693 14.52 1.68 z M 6.789 1.689 L 4.434 4.045 L 7.221 6.836 L 9.578 4.475 L 6.789 1.689 z M 4.107 4.375 L 1.752 6.736 L 4.537 9.521 L 6.895 7.16 L 4.107 4.375 z M 19.89 9.426 L 17.54 11.79 L 20.32 14.57 L 22.68 12.21 L 19.89 9.426 z M 17.22 12.12 L 14.86 14.47 L 17.65 17.26 L 20 14.9 L 17.22 12.12 z M 6.369 19.28 L 6.371 19.29 C 6.03 19.29 5.776 19.39 5.592 19.54 C 5.414 19.71 5.326 19.9 5.326 20.12 C 5.326 20.26 5.356 20.39 5.416 20.49 C 5.466 20.59 5.543 20.67 5.627 20.73 C 5.717 20.83 5.812 20.85 5.926 20.88 C 6.047 20.88 6.154 20.98 6.268 20.98 C 6.389 20.98 6.502 20.98 6.623 21.08 C 6.728 21.08 6.826 21.18 6.908 21.19 C 6.998 21.29 7.07 21.29 7.121 21.37 C 7.171 21.47 7.213 21.55 7.213 21.67 C 7.213 21.84 7.142 21.99 7.027 22.11 C 6.897 22.24 6.699 22.3 6.418 22.3 C 6.183 22.3 5.979 22.3 5.822 22.13 C 5.662 22.01 5.578 21.82 5.545 21.55 L 5.256 21.55 C 5.256 21.88 5.376 22.14 5.578 22.3 C 5.78 22.47 6.049 22.55 6.375 22.55 C 7.115 22.55 7.486 22.25 7.498 21.66 C 7.498 21.51 7.468 21.38 7.418 21.28 C 7.368 21.18 7.303 21.1 7.225 21.04 C 7.145 20.94 7.042 20.93 6.938 20.89 C 6.832 20.89 6.725 20.79 6.605 20.79 C 6.49 20.79 6.384 20.79 6.273 20.69 C 6.158 20.69 6.063 20.59 5.967 20.59 C 5.887 20.59 5.808 20.49 5.738 20.44 C 5.678 20.34 5.633 20.3 5.615 20.21 C 5.585 20.05 5.645 19.89 5.754 19.75 C 5.869 19.61 6.07 19.55 6.369 19.53 C 6.574 19.53 6.746 19.63 6.893 19.69 C 7.044 19.8 7.119 19.98 7.119 20.2 L 7.4 20.2 C 7.4 19.94 7.32 19.73 7.152 19.56 C 6.971 19.38 6.716 19.29 6.369 19.28 z M 9.309 19.29 C 8.85 19.29 8.51 19.46 8.262 19.77 C 8.018 20.08 7.898 20.45 7.898 20.91 C 7.898 21.37 8.018 21.74 8.262 22.05 C 8.498 22.37 8.85 22.52 9.33 22.53 C 9.81 22.53 10.16 22.37 10.4 22.05 C 10.65 21.74 10.77 21.37 10.77 20.91 C 10.77 20.45 10.65 20.07 10.4 19.76 C 10.16 19.45 9.801 19.3 9.309 19.29 z M 11.36 19.37 L 11.03 19.39 L 12.13 21.15 L 12.13 22.47 L 12.42 22.47 L 12.42 21.11 L 13.54 19.37 L 13.2 19.37 L 12.27 20.86 L 11.36 19.37 z M 14.22 19.37 L 13.94 19.39 L 13.94 21.32 C 13.94 22.13 14.32 22.54 15.12 22.55 C 15.92 22.55 16.3 21.98 16.32 21.32 L 16.32 19.37 L 16.02 19.37 L 16.02 21.21 C 16.02 21.93 15.74 22.29 15.12 22.28 C 14.51 22.28 14.21 21.94 14.22 21.21 L 14.22 19.37 z M 19.12 19.37 L 16.96 19.39 L 16.96 19.64 L 18.76 19.64 L 16.78 22.23 L 16.78 22.47 L 19.13 22.47 L 19.13 22.21 L 17.15 22.21 L 19.12 19.62 L 19.12 19.37 z M 9.32 19.56 L 9.322 19.56 L 9.324 19.56 C 10.08 19.56 10.47 20.03 10.47 20.93 C 10.47 21.31 10.37 21.63 10.21 21.89 C 10.02 22.16 9.726 22.3 9.33 22.3 C 8.935 22.3 8.635 22.16 8.453 21.89 C 8.353 21.76 8.294 21.62 8.252 21.46 C 8.212 21.29 8.191 21.12 8.191 20.93 C 8.191 20.56 8.293 20.24 8.471 19.97 C 8.651 19.7 8.927 19.58 9.32 19.56 z "
    }
  }
]
},
{
"name": "Home",
"slug": "home",
"type": "page",
"blocks": [
  {
    "blockName": "core/paragraph",
    "attrs": {
      "tagName":"h2",
      "className": "-tight -left -middle",
      "content": "Nocode sandbox of Soyuz project!"
    }
  },
  {
    "blockName": "core/paragraph",
    "attrs": {
      "tagName":"h4",
      "className": "-tight -left -middle",
      "content": "Next generation frontend engine, sharpen to driven bussinness focused applications."
    }
  },
  {
    "blockName": "core/paragraph",
    "attrs": {
      "className": "-tight -left -middle",
      "content": "To start work with Sojuz project engine load some examples from: <a href='https://github.com/Soyuz-project/App-templates'>https://github.com/Soyuz-project/App-templates</a>"
    }
  }
]
},
{
"name": "Footer",
"slug": "footer",
"type": "page",
"blocks": [
  {
    "blockName": "core/paragraph",
    "attrs": {
      "className": "-left -mar-s",
      "content": "<a href='https://github.com/Soyuz-project/Frontend'>GITHUB</a>"
    }
  },
  {
    "blockName": "core/hairlane",
    "plugin":'soyuz-app-loader',
    "attrs": {
      "className": "-b-dark-gray"
    }
  },
  {
    "blockName": "DataFrame",
    "plugin":'soyuz-app-loader',
    "attrs": {
      "className": "tr -gap-s -left -pad-s",
      "event": "soyuz-app-loader-init-event"
    }
  }
]
},
{
"name": "App loader",
"slug": "soyuz-app-loader",
"type": "page",
"blocks": [
  {
    "blockName": "form/file",
    "plugin":'soyuz-app-loader',
    "attrs": {
      "className": "-btn-bg -b -b-light-gray -pad-s -hvr-invert -rel -ov-h",
      "content":"Load APP",
      "actions":[
        {"run_event": "soyuz-app-loader-process-event"}
      ]
    }
    
  }
]
},
{
"name": "App loader info",
"slug": "soyuz-app-loader-info",
"plugin":'soyuz-app-loader',
"type": "page",
"blocks": []
}
] 