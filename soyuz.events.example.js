/* 
    Example events file
*/
export const events = [
	{
        name: 'Pages',
        slug: 'pages',
        method: 'READ',
        query_variables: { slug: 'header' },
        responce_filters: [{ get: { source: 'pages.0' } }],
    },
    {
        name: 'Header',
        slug: 'header',
        method: 'READ',
        query_variables: { slug: '^router.params.slug' },
    },
    {
        name: 'Pages',
        slug: 'footer',
        method: 'READ',
        query_variables: { slug: 'footer' },
    },
    // {
    //     name: 'Pages all',
    //     slug: 'pages',
    //     method: 'READ',
    //     query_variables: { slug: 'footer' },
    // },
    {
        name: 'Insert page form',
        slug: 'pages',
        method: 'READ',
        query_variables: { slug: 'insert-page' },
        default_data: [{
            name: 'New page',
            slug: '',
            blocks: []
        }]
    },
    {
        name: 'Insert page',
        slug: 'insert-page',
        method: 'WRITE',
        actions: [
        ]
    }
]

/* 
    Example conditional logic
*/
const conditionalLogic = [
    { '^router.params.slug':'page-1'  , condition:'=='}
]

/* 
    Example block
*/
{
  "blockName": "core/button",
  "attrs": {
    "className": "",
    "conditionalLogic": [],
    "componentAttrs": [],
    "map": [],
    "content": "Close without changes",
    "actions": [
      {
        "routerDelQuery": [
          "editable"
        ]
      }
    ]
  },
  "innerBlocks": []
}