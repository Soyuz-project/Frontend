/* eslint-disable react/jsx-key */
/* eslint-disable react/no-unknown-property */
/* eslint-disable react/jsx-no-undef */
/* eslint-disable react/react-in-jsx-scope */
/* eslint-disable complexity */

/* dynamic modules */
import { modules } from '~/nuxt.modules.js';
import { checkDisplay } from '~/plugins/soyuz-conditional-logic';
// if innerblock isnt global - import it (check /plugins/inner-block.js)
// import { InnerBlock } from '~/modules/soyuz-core/InnerBlock.js';

export default {
  functional: true,
  props: {
    blocks: {
      type: Object,
      default: () => ({}),
    }
  },
  // eslint-disable-next-line react/display-name
  render(
    h,
    {
      props: {
        blocks: { blockName = '', blockAttrs = {}, attrs = blockAttrs, innerBlocks = []},
      },
    }
  ) {
    const compName = blockName.replace(/[\/-]/g, '');
    const Block = modules[compName];
    return Block ? checkDisplay(() =>
      <Block
        blockAttrs={{...attrs,blockName}}
        scopedSlots={{
          default: innerBlocks 
            ? () =>
                innerBlocks.map((block, i) =>  (
                  <InnerBlock 
                    key={i} 
                    blocks={{ 
                      ...block, 
                      attrs: { 
                        ...block.attrs, 
                        targetable: attrs.targetable,
                        source_slug:attrs.source_slug, 
                        collection_slug:attrs.collection_slug, 
                        collection_index:attrs.collection_index 
                      } }} 
                  />
                ))
            : null,
        }}
      /> , attrs
            // Vue bug - if we return null but when rendering InnerBlock added some prop
      // eg: ':key="key"' - vue throws error and sometimes duplicate render tree
    ) : <template />;

  },
};
