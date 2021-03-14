<template>
  <div @click="action(event)" :class="[blockAttrs.className]">
    <span v-html="blockAttrs.content" />
  </div>
</template>

<script>
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
