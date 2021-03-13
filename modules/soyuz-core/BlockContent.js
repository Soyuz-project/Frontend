/* eslint-disable react/react-in-jsx-scope */
// import { parser } from '~/plugins/sojuz-renderer';
/* editable methods */
// import { eData } from '~/plugins/sojuz-editable';
// import { sClass } from '~/plugins/sojuz-renderer';

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
