
import { S, store, tick } from '~/plugins/soyuz-store-api';
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
        /* DirtyHack to run reactivity with store */
        this.blockAttrs.tick = tick.value
        this.blockAttrs.click = S.get({source:'click.compName'})
        return Object.assign({}, this.blockAttrs)
    },
  },
  render(h) {
    return  (
      <div>
        <span>Targeter:{this.attrs?.click}</span>
      </div>
    );
  },
};


