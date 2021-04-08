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
      "name": "Zaloguj się",
      "slug": "event-modal",
      "source": "pages",
      "method": "READ",
      "query_variables": {
        "slug": "soyuz-login-form"
      },
      "collection": {
        "source": "form-login",
        "default_data": [
          {
            "login": "",
            "password": "",
          }
        ]
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
        "className": "-center -middle -bg-c-primary -mar-s",
        "size":100,
        "fill":"#fff",
        "viewBox" : "0 0 100 100",
      }
    }
  ]
},
{
  "name": "Login form",
  "slug": "soyuz-login-form",
  "type": "page",
  "blocks": [
    {
      "blockName": "input",
      "attrs": {
        "className": "",
        "label": "Login",
        "collection_map": {
          "value": "login"
        }
      },
      "innerBlocks": []
    },
    {
      "blockName": "input",
      "attrs": {
        "className": "",
        "label": "Password",
        "collection_map": {
          "value": "password"
        }
      },
      "innerBlocks": []
    },
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
        "content": "Nocode sandbox of Soyuz project"
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
        "event": "soyuz-app-loader-init-event"
      }
    },
    {
      "blockName": "DataFrame",
      "attrs": {
        "className": "tr -gap-s -left",
        "conditionalLogic": [
          {
            "key": "{router.query.rightpanel}",
            "value": 'login',
            "condition": "=="
          }
        ],
        "event": "event-modal"
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
        "className": "-b -b-light-gray -pad-s -hvr-invert -rel -ov-h",
        "actions":[
          {"run_event": "soyuz-app-loader-process-event"}
        ]
      }
    },
    {
      "blockName": "core/button",
      "plugin":'soyuz-app-loader',
      "attrs": {
        "className": "-left -b -b-light-gray -pad-s -hvr-invert",
        "content":"x"
      }
    },
    {
      "blockName": "form/input",
      "attrs": {
        "className": "-d10",
        "label": "Content",
        "source_map": {
          "source_path": "pages.0.blocks.2.attrs.content",
        }
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
