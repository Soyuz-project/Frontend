
import { action } from '~/plugins/soyuz-targeter';
import { modelProcess } from '~/plugins/postprocess-data';
export default {
  name: 'Input',
  props: {
    /*
      label: string
      nq: string (store to get value, default get from parent dataFrame)
      path: string (path to value, default get data from parent dataFrame)
      pathSufix: string (split with original path)
      tagName: string | input, textarea
      rows: number
    */
    blockAttrs: {
      type: Object,
      default: () => ({}),
    },
  },
  data() {
    return {
      initvalue: this.blockAttrs.value || '',
      tagName: this.blockAttrs.tagName || 'input',
      rows: this.blockAttrs.rows || 4,
      inputClass: 'td -pad-s -b -b-light-gray'
    };
  },
  computed: {
    value: {
      get() {
        return modelProcess(this.blockAttrs, 'get')
      },
      set(value) {
        setTick()
        console.log(store)
        return S.set({ source: this.source, value })
      },
    },
  },
  render(h) {
    return  (
      <div onClick={(e) => action(e, this.blockAttrs)} class={[this.blockAttrs?.className]}>
        <label>{ this.blockAttrs.label }</label>
        <input v-model={this.value} />
      </div>
    );
  },
};

