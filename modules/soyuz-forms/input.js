
import { action, getClick } from '~/plugins/soyuz-targeter';
import { S, store, setTick } from '~/plugins/soyuz-store-api';
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
      inputClass: 'td -pad-s -b -b-light-gray',
      source: `${this.blockAttrs.collection_source}.${this.blockAttrs.collection_index}.${this.blockAttrs.collection_map.value}`
    };
  },
  computed: {
    value: {
      get() {
        return S.get({ source: this.source })
      },
      set(value) {
        console.log(store)
        setTick()
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

// <template>
//   <div :class="[blockAttrs.className]">
//     <label>{{ blockAttrs.label }}</label>
//     <input v-if="tagName == 'input'" v-model="value" :class="inputClass" />
//     <textarea :rows="rows" v-if="tagName == 'textarea'" v-model="value" :class="inputClass"></textarea>
//   </div>
// </template>