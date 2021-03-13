<template>
  <div :class="[blockAttrs.className]">
    <label>{{ blockAttrs.label }}</label>
    <input v-if="tagName == 'input'" v-model="value" :class="inputClass" />
    <textarea :rows="rows" v-if="tagName == 'textarea'" v-model="value" :class="inputClass"></textarea>
  </div>
</template>

<script>
/// import { sClass, parser } from '~/plugins/sojuz-renderer';
// import { S } from '~/plugins/sojuz-store-api';
// import { sRun, sRoute, sData } from '~/plugins/sojuz-actions-api';
// import { eData } from '~/plugins/sojuz-editable';

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
    };
  },
  computed: {
    value: {
      get() {
        // const b = this.blockAttrs;
        // if (b.nq && b.path) {
        //   b.value = S.getDeep({ nq: b.nq, path: `${b.path}${b.pathSufix || ''}` });
        // }
        // return b.value;
      },
      set(value) {
        // const b = this.blockAttrs;
        // if (b.nq && b.path) {
        //   // set by defined path
        //   S.setDeep({ nq: b.nq, path: `${b.path}${b.pathSufix || ''}`, value: value });
        // } else {
        //   // set by auto path
        //   b.nq ? S.setDeep({ nq: b.nq, path: `${b.i}.${b.map.value}`, value: value }) : null;
        // }
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
