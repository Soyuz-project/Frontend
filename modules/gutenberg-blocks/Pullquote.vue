<template>
  <div :class="blockAttrs.className" v-html="blockAttrs.innerHTML" />
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
<!-- <style src="~/css/core/core-pullquote.css"></style> -->
