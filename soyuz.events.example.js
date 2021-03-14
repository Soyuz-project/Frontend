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
    }
    {
        name: 'Pages',
        slug: 'footer',
        method: 'READ',
        query_variables: { slug: 'footer' },
    }
]

/* 
    Example conditional logic
*/
const conditionalLogic = [
    { '^router.params.slug':'page-1'  , condition:'=='}
]