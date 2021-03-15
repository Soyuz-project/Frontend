/* eslint-disable react/react-in-jsx-scope */
import { S, store, tick } from '~/plugins/soyuz-store-api';
import { transformer } from '~/plugins/soyuz-walker';
export default {
  name: 'Content',
  // functional: true,
  props: {
    blockAttrs: {
      type: Object,
      default: () => ({}),
    },
  },
  computed: {
    attrs() { 
      if(this.blockAttrs.collection_map){
        /* Hack to run reactivity with store */
        this.blockAttrs.tick = tick.value
        this.blockAttrs = Object.assign(this.blockAttrs, transformer(this.blockAttrs.collection_map,'', this.blockAttrs))
      }
      return this.blockAttrs;
    },
    
  },
  // to switch into functional add:
  render(h) {
    const Comp = this.attrs.tagName || 'p';
    return (
      <Comp
        // onClick={(e) => eData(e, this.blockAttrs)}
        class={[this.attrs?.className]}
        domPropsInnerHTML={this.attrs?.content}></Comp>
    );
  },
};
