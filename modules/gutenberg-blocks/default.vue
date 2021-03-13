<template functional>
  <div :class="data.class" v-html="props.blockAttrs.innerHTML" />
</template>

<script>
export default {
  props: {
    blockAttrs: {
      type: Object,
      default: () => ({}),
    },
  },
};
</script>
