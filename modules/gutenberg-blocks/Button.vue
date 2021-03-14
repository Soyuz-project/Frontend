<template>
  <div @click="action(event)" :class="[blockAttrs.className]">
    <span v-html="blockAttrs.content" />
  </div>
</template>

<script>
// import { sClass, parser } from '~/plugins/sojuz-renderer';
// import { S } from '~/plugins/sojuz-store-api';
// import { sRun, sRoute, sData } from '~/plugins/sojuz-actions-api';
// import { eData } from '~/plugins/sojuz-editable';
/* define Actions White List */
// const AWL = { ...S, ...sRoute, ...sData };

export default {
  name: 'Button',
  props: {
    blockAttrs: {
      type: Object,
      default: () => ({}),
    },
  },
  methods: {
    action: function(event) {
      // sRun(this.attrs, AWL);
      /* is Editable mode then edit clicked group*/
      // eData(event, this.attrs);
      console.log('clicked', this)
    },
  },
};
</script>
