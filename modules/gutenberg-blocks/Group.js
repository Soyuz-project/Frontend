/* eslint-disable react/no-unknown-property */
/* eslint-disable react/react-in-jsx-scope */
// import { modules } from '~/nuxt.modules.js';
// import { sRun, sRoute, sData } from '~/plugins/soyuz-actions-api';
// import { eData } from '~/plugins/sojuz-editable';
// import { sClass } from '~/plugins/sojuz-renderer';
// import { S } from '~/plugins/sojuz-store-api';

/* define Actions White List */
// const AWL = { ...S, ...sRoute, ...sData };

/* register action method */
const action = (e, bAttrs) => {
  // sRun(bAttrs, AWL);
  /* is Editable mode then edit clicked group*/
  // eData(e, bAttrs);
};

export default {
  functional: true,
  props: {
    blockAttrs: {
      type: Object,
      default: () => ({}),
    },
  },
  render(h, { props, scopedSlots }) {
    const slots = scopedSlots.default();
    const compName = props.blockAttrs.componentName;
    const Block = compName ? modules[compName] : null;
    return compName || !slots?.length ? (
      <Block blockAttrs={props.blockAttrs}> {slots}</Block>
    ) : (
      <div onClick={(e) => action(e, props.blockAttrs)} class={[props.blockAttrs.className]}>
        {slots}
      </div>
    );
  
  },
};
