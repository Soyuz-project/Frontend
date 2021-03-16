export default {
  name: 'Separator',
  functional: true,
  props: {
    blockAttrs: {
      type: Object,
      default: () => ({}),
    },
  },
  render(h, { props }) {
    return <hr class={[props.blockAttrs.className]} />
  },
};
