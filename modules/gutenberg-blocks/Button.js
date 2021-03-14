/* register action method */
import { S, store } from '~/plugins/soyuz-store-api';
const action = (e, attrs) => {
  // sRun(bAttrs, AWL);
  /* is Editable mode then edit clicked group*/
  // eData(e, bAttrs);
  console.log(attrs, store)
};
export default {
  functional: true,
  props: {
    blockAttrs: {
      type: Object,
      default: () => ({}),
    },
  },
  render(h, { props }) {
    return  (
      <div onClick={(e) => action(e, props)} class={[props.blockAttrs.className]}>
      	<span>button</span>
      </div>
    );
  },
};