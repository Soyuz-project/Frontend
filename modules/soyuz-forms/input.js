
import { action } from '~/plugins/soyuz-targeter';
import { modelProcess } from '~/plugins/postprocess-data';
export default {
  name: 'Input',
  props: {
    blockAttrs: {
      type: Object,
      default: () => ({}),
    },
  },
  computed: {
    value: {
      get() {
        return modelProcess(this.blockAttrs, 'get')
      },
      set(value) {
        return modelProcess(this.blockAttrs, 'set', value)
      },
    },
  },
  render(h) {
    return  <input v-model={this.value} onClick={(e) => action(e, this.blockAttrs)} class={[this.blockAttrs?.className]} />
  },
};

