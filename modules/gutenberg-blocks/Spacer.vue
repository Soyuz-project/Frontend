<script>
export default {
  name: 'Spacer',
  functional: true,
  props: {
    blockAttrs: {
      type: Object,
      default: () => ({}),
    },
  },
  render(
    h,
    {
      parent,
      props: { blockAttrs },
    }
  ) {
    return (blockAttrs.mobileOnly && !parent.$isMobile) || (blockAttrs.desktopOnly && parent.$isMobile) ? null : (
      // eslint-disable-next-line react/react-in-jsx-scope
      <div
        // eslint-disable-next-line react/no-unknown-property
        class={`corespacer ${blockAttrs.className} ${blockAttrs.gHeight}`}
        style={!blockAttrs.gHeight ? { height: `${blockAttrs.height || 15}px` } : {}}
      />
    );
  },
};
</script>
