export const default_app_events = [
    {
      "name": "Show aplication loader page with controlls",
      "slug": "soyuz-app-loader-event",
      "plugin":'soyuz-app-loader',
      "source": "pages",
      "method": "READ",
      "query_variables": {
        "slug": "soyuz-app-loader"
      }
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
        "className": "-center -middle -bg-c-primary -mar-s",
        "size":100,
        "fill":"#fff",
        "viewBox" : "0 0 100 100",
        "path": "m 45.32,11.52 -7.65,4.37 2.27,3.9 7.64,-4.4 z m 3.58,4.92 -8.01,4.63 3.79,6.62 8.08,-4.54 z m -12.37,0.13 -7.64,4.42 2.27,3.9 7.63,-4.42 z m 3.16,5.22 -8,4.63 3.71,6.45 8.06,-4.55 z m 19.23,2.6 c -2,0 -4.17,0.62 -6.5,1.94 -13.26,7.64 -4.96,22.46 -14.26,27.86 -2.43,1.4 -3.7,0.76 -4.6,-0.77 -1.03,-1.82 -0.77,-2.93 1.67,-4.33 l 7.1,-4.11 -5.54,-9.61 -7.61,4.42 c -7.12,4.11 -5.76,11.25 -2.23,17.41 4.65,8.02 10.63,10.1 18.37,5.64 12.71,-7.34 6.25,-23.23 13.17,-27.21 2.04,-1.19 3.48,-1.36 4.67,0.68 1.1,1.96 0.3,3.22 -1.74,4.37 l -5.73,3.36 5.52,9.59 6.45,-3.69 c 6.87,-4 5.94,-10.74 2.17,-17.24 -2.93,-5.09 -6.5,-8.23 -10.91,-8.31 z m 12.85,26.4 -10.44,6.08 4.93,8.56 10.61,-5.9 z m -12.05,6.96 -10.44,6.07 4.83,8.41 10.58,-5.91 z M 37.4,77.11 c -0.75,0.1 -1.32,0.21 -1.71,0.55 -0.39,0.38 -0.58,0.76 -0.58,1.27 0,0.3 0.1,0.6 0.19,0.8 0.11,0.22 0.29,0.39 0.46,0.52 0.2,0.17 0.4,0.3 0.66,0.34 0.24,0.1 0.49,0.18 0.75,0.21 0.25,0.1 0.51,0.13 0.78,0.17 0.22,0.1 0.43,0.18 0.62,0.26 0.2,0.12 0.35,0.26 0.46,0.38 0.12,0.23 0.18,0.39 0.18,0.64 0,0.32 -0.12,0.74 -0.38,0.98 -0.29,0.33 -0.74,0.41 -1.35,0.41 -0.5,0 -0.95,-0.1 -1.3,-0.41 C 35.84,83.07 35.63,82.57 35.59,82 h -0.65 c 0,0.75 0.26,1.32 0.71,1.64 0.45,0.34 1.03,0.58 1.75,0.58 1.6,0 2.43,-0.66 2.44,-1.97 0,-0.33 -0.1,-0.6 -0.15,-0.82 -0.12,-0.2 -0.25,-0.37 -0.42,-0.55 -0.19,-0.11 -0.4,-0.25 -0.64,-0.33 -0.22,-0.1 -0.48,-0.13 -0.72,-0.22 -0.25,-0.1 -0.49,-0.1 -0.72,-0.12 -0.26,-0.1 -0.47,-0.13 -0.67,-0.21 -0.19,-0.1 -0.36,-0.17 -0.5,-0.35 -0.15,-0.1 -0.24,-0.29 -0.28,-0.5 -0.1,-0.34 0.1,-0.68 0.31,-0.98 0.23,-0.3 0.69,-0.47 1.35,-0.51 0.44,0 0.81,0.12 1.14,0.34 0.33,0.25 0.49,0.64 0.49,1.15 h 0.62 c 0,-0.59 -0.18,-1.02 -0.54,-1.4 -0.4,-0.43 -0.97,-0.6 -1.71,-0.64 z m 6.42,0 c -1,0.1 -1.76,0.38 -2.28,1.06 -0.54,0.67 -0.81,1.48 -0.81,2.51 0,0.97 0.27,1.81 0.81,2.55 0.51,0.58 1.28,0.99 2.33,0.99 1.05,0 1.82,-0.41 2.34,-0.99 0.52,-0.74 0.8,-1.58 0.8,-2.55 0,-1.03 -0.28,-1.87 -0.8,-2.51 -0.52,-0.68 -1.3,-1.02 -2.39,-1.06 z m 3.76,0.17 2.38,3.87 v 2.83 H 50.6 V 81.1 l 2.46,-3.82 H 52.3 l -2.04,3.27 -1.95,-3.27 z m 6.33,0 v 4.25 c 0,1.7 0.89,2.69 2.59,2.69 1.74,0 2.68,-0.99 2.68,-2.69 V 77.28 H 58.5 v 4.04 c 0,1.59 -0.63,2.32 -2,2.32 -1.31,0 -1.99,-0.73 -1.95,-2.32 v -4.04 z m 6.62,0 v 0.59 h 3.95 l -4.33,5.69 v 0.42 h 5.14 v -0.42 h -4.33 l 4.29,-5.69 v -0.59 z m -16.69,0.38 c 1.66,0.1 2.5,1.06 2.53,3.02 0,0.81 -0.2,1.49 -0.58,2.07 -0.41,0.65 -1.04,0.89 -1.92,0.89 -0.88,0 -1.51,-0.24 -1.92,-0.89 -0.19,-0.26 -0.34,-0.58 -0.43,-0.91 -0.1,-0.35 -0.16,-0.78 -0.16,-1.16 0,-0.81 0.21,-1.49 0.61,-2.12 0.39,-0.61 1.02,-0.86 1.87,-0.9 z"
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
        "content": "Engine sandbox of Soyuz project"
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
        "className": "tr -gap-s -left",
        "initial_event": "soyuz-app-loader-event"
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
      "blockName": "AppLoader",
      "plugin":'soyuz-app-loader',
      "attrs": {
        "className": "-left -mar-s",
      }
    },
    {
      "blockName": "core/button",
      "plugin":'soyuz-app-loader',
      "attrs": {
        "className": "-left -b -b-light-gray -pad-s -hvr-invert",
        "content":"x"
      }
    }
  ]
}] 

 