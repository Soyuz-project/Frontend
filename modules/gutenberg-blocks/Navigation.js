/* eslint-disable react/no-unknown-property */
/* eslint-disable react/react-in-jsx-scope */
export default {
  name: 'Navigation',
  functional: true,
  props: {
    blockAttrs: {
      type: Object,
      default: () => ({}),
    },
  },
  render(h, { props, scopedSlots }) {
    const slots = scopedSlots.default();
    return slots.length ? (
      <nav class={props.blockAttrs.orientation}>
        <ul class={props.blockAttrs.className}>{slots}</ul>
      </nav>
    ) : null;
  },
};
