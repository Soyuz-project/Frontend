/* eslint-disable react/no-unknown-property */
/* eslint-disable react/react-in-jsx-scope */

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

    const slots = scopedSlots ? scopedSlots?.default() : [];
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
