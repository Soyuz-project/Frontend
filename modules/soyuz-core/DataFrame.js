/* eslint-disable react/no-unknown-property */
/* eslint-disable react/react-in-jsx-scope */

/* data frame component start renderind app */
/* blocks data frame default run `pages READ` event */
import { runEvent } from '~/plugins/soyuz-events-api';
import { S } from '~/plugins/soyuz-store-api';
import { InitialStoreRouter } from '~/plugins/soyuz-actions-router';
import { action, getClick } from '~/plugins/soyuz-targeter';
export default {
  functional: true,
  props: {
    blockAttrs: {
      type: Object,
      default: () => ({}),
    },
    urlQuery: {
      type: Object,
      default: () => ({}),
    },
    /* nice to use only READ events */
    /* default event read page (search with pages) by rouing param slug */
    event: {
      default: () => ({
        name: 'Pages',
        slug: 'initial-page',
        source: 'pages',
        method: 'READ',
        query_variables: { slug: '{router.params.slug}' },
        // responce_filters: [{ get: { source: 'pages.0' } }],
      })
    }
  },
  render(h, { props: {blockAttrs, urlQuery, event} }) {

    //  DATA MODEL
    //

    //  BLOCKS COLLECTION (pages list, sliders, etc)
    //  [ 
    //    {
    //      "blocks":
    //      second level - blocks
    //      [
    //        {
    //        //gitengerg block
    //        }
    //      ]
    //    }
    //  ]

    //  BLOCKS FRAME (one page, one slide, group of elements, etc) 
    // 

    //  ONE BLOCK FRAME (icon, button, content, etc) 
    //

    //  BLOCKS AGGREGATION  (list of this same blocks, cards, products, posts etc)
    // 

    InitialStoreRouter(urlQuery)
    
    /* 
      find storage event (defined in blockAttrs) or get default from props 
    */
    const activeEvent = blockAttrs.initial_event ? S.get({ source: 'events', query_variables: {slug: blockAttrs.initial_event} })[0] : event

    const data = runEvent(activeEvent) || [];  

   


    // BLOCKS COLLECTION 
    return  data ? (
      <div onClick={(e) => action(e, blockAttrs)} class={`blocks-wrapper`} style="border:1px dashed red; padding:2px; margin:2px">
          {/* Render blocks collection (like pages collection) */}
          {data?.map((entry, i) => {
            return (<div class={blockAttrs.className}>
              {
                entry.blocks.map((block, j) => {

  
                  
                  /* add collection handler if exist */
                  entry.slug != undefined ? block.attrs.source_slug = entry.slug : null
                  entry.collection_source != undefined ? block.attrs.collection_source = entry.collection_source : null
                  entry.collection_index != undefined  ? block.attrs.collection_index = entry.collection_index : null
                  /* render block */
                  return <inner-block key={i+j} blocks={block} />
                })
              }
            </div>)
          })}
      </div>
    ): null;

    // BLOCKS FRAME (TODO - add prop to turnon this)
    // return data ? (
    //   <div class="frame" style="border:1px solid red; padding:5px;">
    //       {/* Render blocks collection (like pages collection) */}
    //       {data?.map((entry, i) => {
    //         return (<div style="border:1px solid blue; padding:5px;">
    //           {
               
    //                <inner-block key={i} blocks={entry}/>
                
    //           }
    //         </div>)
    //       })}
    //   </div>
    // ): null;

    // ONE BLOCK FRAME (TODO - add prop to turnon this)
    // return (<div style="border:1px solid blue; padding:5px;">
    //       {          
    //            <inner-block  blocks={data}/>
    //       }
    // </div>)
  },
};
