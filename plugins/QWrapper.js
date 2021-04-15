import Vue from 'vue';
export default {
  props: {
    attrs: {
      type: Object,
      default: () => ({}),
    }
  },
  // eslint-disable-next-line react/display-name
  render(h) {
    return (<div>WWW</div>)

  }
};
Vue.component('Q', Q);