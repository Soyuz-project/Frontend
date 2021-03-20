/* eslint-disable react/react-in-jsx-scope */
export default {
  name: 'ResponsiveImg',
  props: {
    blockAttrs: {
      type: Object,
      default: () => ({}),
    },
  },
  data() {
    return {
      src: '',
      full: this.blockAttrs.full || false,
    };
  },
  computed: {
    id() {
      return this.blockAttrs?.id || this.attrs?.id;
    },
  },
  render(h) {
    return (
      <figure>
        <img src={this.src}></img>
      </figure>
    );
  },
};
