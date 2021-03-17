/* eslint-disable react/react-in-jsx-scope */
import { S, store, tick } from '~/plugins/soyuz-store-api';
import { transformer } from '~/plugins/soyuz-walker';
import { action, getClick } from '~/plugins/soyuz-targeter';
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
      if(this.blockAttrs.watch){
        /* Hack to run reactivity with store */
        this.blockAttrs.tick = tick.value
        return Object.assign({}, transformer(this.blockAttrs, this.blockAttrs))
      }
      return this.blockAttrs;
    },
    
  },
  // to switch into functional add:
  render(h) {
    const Comp = this.attrs.tagName || 'p';
    return (
      <Comp
        onClick={(e) => action(e, this.attrs)}
        class={[this.attrs?.className]}
        domPropsInnerHTML={this.attrs?.content}></Comp>
    );
  },
};
