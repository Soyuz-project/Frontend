/* eslint-disable react/jsx-key */
/* eslint-disable react/no-unknown-property */
/* eslint-disable react/jsx-no-undef */
/* eslint-disable react/react-in-jsx-scope */
/* eslint-disable complexity */

/* dynamic modules */
import { modules } from '~/nuxt.modules.js';
import { S, store } from '~/plugins/soyuz-store-api';
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
    const Attrs = Object.assign({}, attrs,  { compName });



    const Tpl = checkDisplay(
      <Block
        blockAttrs={Attrs}
        scopedSlots={{
          default: innerBlocks 
            ? () =>
                innerBlocks.map((block, i) => console.log(Attrs, block) || (
                  <InnerBlock 
                    key={i} 
                    blocks={{ 
                      ...block, 
                      attrs: { 
                        ...block.attrs, 
                        source_slug:Attrs.source_slug, 
                        collection_slug:Attrs.collection_slug, 
                        collection_index:Attrs.collection_index 
                      } }} 
                  />
                ))
            : null,
        }}
      /> , Attrs
    );

    return  Block ? (
      Tpl
    ) : (
      // Vue bug - if we return null but when rendering InnerBlock added some prop
      // eg: ':key="key"' - vue throws error and sometimes duplicate render tree
      <template />
    );
 
  },
};
