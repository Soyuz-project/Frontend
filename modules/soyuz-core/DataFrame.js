/* eslint-disable react/no-unknown-property */
/* eslint-disable react/react-in-jsx-scope */

/* data frame component start renderind app */
/* blocks data frame default run `pages READ` event */
import { runEvent } from '~/plugins/soyuz-events-api';
import { S } from '~/plugins/soyuz-store-api';
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


    const storageUrlQuery = S.set({ source:'router', value: urlQuery })
    
    const data = runEvent(event) || [];  
    const wrapperClass = blockAttrs.className ? `wrapper-${blockAttrs.className}` : ''

    // BLOCKS COLLECTION 
    return  data ? (
      <div class={`blocks-wrapper ${wrapperClass}`}>
          {/* Render blocks collection (like pages collection) */}
          {data?.map((entry, i) => {
            return (<div class={blockAttrs.className}>
              {
                entry.blocks.map((block, j) => {
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
