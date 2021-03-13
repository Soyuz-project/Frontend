<template functional>
  <!-- classes alignfull has-background-dim has-parallax -->
  <hr :class="` ${props.blockAttrs.className}`" />
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
<!-- <style src="~/css/core/core-separator.css"></style> -->
