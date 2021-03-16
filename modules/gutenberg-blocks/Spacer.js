export default {
  name: 'Spacer',
  functional: true,
  props: {
    blockAttrs: {
      type: Object,
      default: () => ({}),
    },
  },
  render(h, { props, scopedSlots }) {
    return <div class={[props.blockAttrs.className]} />
  },
};
