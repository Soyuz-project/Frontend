/* eslint-disable react/react-in-jsx-scope */
export default {
  name: 'Content',
  // functional: true,
  props: {
    blockAttrs: {
      type: Object,
      default: () => ({}),
    },
  },
  // to switch into functional add:
  render(h) {
    const Comp = this.blockAttrs.tagName || 'p';
    return (
      <Comp
        // onClick={(e) => eData(e, this.blockAttrs)}
        class={[this.blockAttrs?.className]}
        domPropsInnerHTML={this.blockAttrs?.content}></Comp>
    );
  },
};
