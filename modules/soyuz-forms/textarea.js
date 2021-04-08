
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
  data() {
    return {
      rows: this.blockAttrs.rows || 4,
    };
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
    return  <textarea v-model={this.value} onClick={(e) => action(e, this.blockAttrs)} class={[this.blockAttrs?.className]} rows={this.rows} />
  },
};

