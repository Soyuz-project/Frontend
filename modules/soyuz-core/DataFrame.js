/* eslint-disable react/no-unknown-property */
/* eslint-disable react/react-in-jsx-scope */

/* data frame component start renderind app */
/* blocks data frame default run `pages READ` event */
import { runEvent } from '~/plugins/soyuz-events-api';
import { S , store} from '~/plugins/soyuz-store-api';
import { InitialStoreRouter } from '~/plugins/soyuz-actions-router';
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
    event: {
      default: () => ({
        name: 'Pages',
        slug: 'pages',
        method: 'READ',
        query_variables: { slug: '^router.params.slug' },
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
    
    blockAttrs.initial_event ? event = blockAttrs.initial_event : null
    const data = runEvent(event) || [];  

    const wrapperClass = blockAttrs.className ? `wrapper-${blockAttrs.className}` : ''

    console.log('store', store)

    // BLOCKS COLLECTION 
    return  data ? (
      <div class={`blocks-wrapper ${wrapperClass}`} style="border:1px dashed red; padding:2px; margin:2px">
          {/* Render blocks collection (like pages collection) */}
          {data?.map((entry, i) => {
            return (<div class={blockAttrs.className}>
              {
                entry.blocks.map((block, j) => {
                  
                  /* add collection handler if exist */
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

    // BLOCKS FRAME
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

    // ONE BLOCK FRAME
    // return (<div style="border:1px solid blue; padding:5px;">
    //       {          
    //            <inner-block  blocks={data}/>
    //       }
    // </div>)
  },
};
