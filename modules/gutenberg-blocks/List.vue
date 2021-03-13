<template functional>
  <div
    :class="['sjz-text sjz-paragraph sjz-list', data.class, props.blockAttrs.className]"
    v-html="props.blockAttrs.innerHTML"
  />
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
<!-- <style src="~/css/core/core-list.css"></style> -->
