/* register action method */
import { S, store } from '~/plugins/soyuz-store-api';
import { runAction } from '~/plugins/soyuz-actions-api';
const action = (e, blockAttrs) => {
  runAction(blockAttrs)
};
export default {
  functional: true,
  props: {
    blockAttrs: {
      type: Object,
      default: () => ({}),
    },
  },
  render(h, { props: {blockAttrs} }) {
    return  (
      <input onUpdate={(e) => action(e, blockAttrs)} class={[blockAttrs.className]} value="">
    );
  },
};