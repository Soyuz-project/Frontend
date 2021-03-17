<template>
  <div :class="[blockAttrs.className]">
    <label>{{ blockAttrs.label }}</label>
    <input v-if="tagName == 'input'" v-model="value" :class="inputClass" />
    <textarea :rows="rows" v-if="tagName == 'textarea'" v-model="value" :class="inputClass"></textarea>
  </div>
</template>

<script>
import { S, store, setTick } from '~/plugins/soyuz-store-api';
import Vue from 'vue';
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
};
</script>
<style scoped>
textarea {
  width: 100%;
  display: block;
}
</style>
