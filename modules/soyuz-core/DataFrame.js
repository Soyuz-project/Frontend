/* eslint-disable react/no-unknown-property */
/* eslint-disable react/react-in-jsx-scope */

/* data frame component start renderind app */
/* blocks data frame default run `pages READ` event */
// import { initFrameEvent, runEvent } from '~/plugins/soyuz-events-api';
import { storeRouter } from '~/plugins/soyuz-actions-router';
import { action, getClick } from '~/plugins/soyuz-targeter';
import { S, store, first } from '~/plugins/soyuz-store-api';
import { read } from '~/plugins/soyuz-resolver';
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
  },
  render(h, { props: {blockAttrs, urlQuery} }) {
    
    /* update global router scope */
    storeRouter(urlQuery)

    /* set forced optimistic responces if application is in editable mode */
    const optimistic = store.soyuz_editable ? true : false
    const res = read(blockAttrs.event || 'default-page', optimistic)

    return res.template.length ? <div onClick={(e) => action(e, blockAttrs)} class={`blocks-wrapper ${blockAttrs.targetable ? 'targetable' : null}`}>
      {
        /* check collection */
        res.collection.map((collection_unit, i) => {
        return (<div class={blockAttrs.className}>
          {
            res.template.map((tpl, j)=>{

              /* render template */
              return tpl.blocks.map((block, k) => {
                block.attrs.collection_source = res.event.collection ? res.event.collection.source : null 
                block.attrs = {
                  ...block.attrs, 
                  collection_index: i, 
                  targetable:blockAttrs.targetable,
                  source_slug: res.template[j].slug,
                  source:res.event.source
                }

                /* render block */
                return <inner-block key={i+k+j} blocks={block} />
              })
            })
          }
        </div>)
      })}
    </div> : <h3 class="-pad-m">Page not found</h3> 
  },
};
