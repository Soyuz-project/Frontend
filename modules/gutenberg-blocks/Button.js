/* register action method */
import { tick } from '~/plugins/soyuz-store-api';
import { transformer } from '~/plugins/soyuz-walker';
import { action, getClick } from '~/plugins/soyuz-targeter';

export default {
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
        /* DirtyHack to run reactivity with store */
        this.blockAttrs.tick = tick.value
        return Object.assign({}, transformer(this.blockAttrs, this.blockAttrs))
      }
      return this.blockAttrs;
    },
  },
  render(h) {
    return  (
      <div onClick={(e) => action(e, this.attrs)} class={[this.attrs?.className]}>
      	<span>{this.attrs?.content}</span>
      </div>
    );
  },
};