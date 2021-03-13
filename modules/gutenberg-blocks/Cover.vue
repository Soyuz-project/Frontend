<template>

  <div :class="['wp-block-cover', blockAttrs.className]">
    <div
      :style="[
        blockAttrs.dimRatio ? { opacity: blockAttrs.dimRatio / 100 } : { opacity: 0 },
        blockAttrs.customOverlayColor ? { backgroundColor: blockAttrs.customOverlayColor } : null,
      ]"
      :class="['overlay', blockAttrs.overlayColor ? `has-${blockAttrs.overlayColor}-background-color` : null]"
    />
    <ResponsiveImg
      class="corver-img-bg"
      v-if="!blockAttrs.useBg"
      :blockAttrs="{
        id: id,
      }"
    />
    <slot />
  </div>
</template>

<script>
export default {
  props: {
    blockAttrs: {
      type: Object,
      default: () => ({}),
    },
  },
  components: {
    ResponsiveImg: () => import('~/modules/images/ResponsiveImg'),
  },
  computed: {
    classes() {
      return [
        this.blockAttrs.align ? `align${this.blockAttrs.align}` : 'default',
        this.blockAttrs.hasParallax ? `hasParallax` : null,
        this.blockAttrs.focalPoint ? 'focal-active' : '',
      ];
    },
    styles() {
      if (this.blockAttrs.useBg)
        return {
          // opacity: `${this.blockAttrs.dimRatio ? this.blockAttrs.dimRatio / 100 : initial}`,
          backgroundImage: `url(${this.blockAttrs.url})`,
          backgroundPosition: this.blockAttrs.focalPoint
            ? `${this.blockAttrs.focalPoint.x * 100}% ${this.blockAttrs.focalPoint.y * 100}%`
            : '',
        };
    },
    id() {
      return this.blockAttrs && this.blockAttrs.imageSourceMap
        ? parseInt(this.blockAttrs.imageSourceMap)
        : this.blockAttrs.id;
    },
  },
};
</script>
<!-- <style src="~/css/core/core-cover.css"></style> -->
