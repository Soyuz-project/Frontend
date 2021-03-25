/* eslint-disable react/no-unknown-property */
/* eslint-disable react/react-in-jsx-scope */

/* data frame component start renderind app */
/* blocks data frame default run `pages READ` event */
import { initFrameEvent, runEvent } from '~/plugins/soyuz-events-api';
import { storeRouter } from '~/plugins/soyuz-actions-router';
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
    }
  },
  render(h, { props: {blockAttrs, urlQuery} }) {

    storeRouter(urlQuery)

    const event_slug = blockAttrs.event || 'router';
    const data = runEvent({ slug: event_slug }) || []; 


    // BLOCKS COLLECTION 
    return  data ? (
      <div onClick={(e) => action(e, blockAttrs)} class={`blocks-wrapper`} style="border:1px dashed #eee; padding:3px; margin:5px">
          {/* Render blocks collection (like pages collection) */}
          {data?.map((entry, i) => {
            return (<div class={blockAttrs.className}>
              {
                entry.blocks.map((block, j) => {
                  /* add collection handler if exist */
                  block.attrs.source_slug = entry.slug
                  block.attrs.collection_source = entry.collection_source 
                  block.attrs.collection_index = entry.collection_index 
                  /* render block */
                  return <inner-block key={i+j} blocks={block} />
                })
              }
            </div>)
          })}
      </div>
    ): null;
  },
};
