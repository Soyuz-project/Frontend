<template functional>
  <div :class="[props.blockAttrs.className]" v-html="props.blockAttrs.innerHTML" />
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
<!-- <style src="~/css/core/core-table.css"></style> -->
