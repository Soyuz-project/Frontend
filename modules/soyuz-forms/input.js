
import { action, getClick } from '~/plugins/soyuz-targeter';
import { S, store, setTick } from '~/plugins/soyuz-store-api';
import { soyuzRouter } from '~/plugins/soyuz-actions-router';
import { replace } from '~/plugins/soyuz-walker';
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
        const source = this.get_source(this.blockAttrs?.source_map)
        return S.get({ source: source })
      },
      set(value) {
        setTick()
        const source = this.get_source(this.blockAttrs?.source_map)
        return S.set({ source: source, value })
      },
    },
  },
  methods: {
    get_source: function (source_map) {
      if(source_map.collection){
        return `${this.blockAttrs.collection_source}.${this.blockAttrs.collection_index}.${this.blockAttrs.source_map.collection}`
      }
      if(source_map.source_path){
        return `${this.blockAttrs.source_map.source}.${this.blockAttrs.source_map.source_slug}.${this.blockAttrs.source_map.source_path}.${this.blockAttrs.source_map.rest_path}`
      }
      if(source_map.rest_path){
       //  console.log('by click', store)
        return `${this.blockAttrs.source_map.source}.${this.blockAttrs.source_map.source_slug}.${this.blockAttrs.source_map.source_path}.${this.blockAttrs.source_map.rest_path}`
      }
    }
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

