/* eslint-disable react/no-unknown-property */
/* eslint-disable react/react-in-jsx-scope */
import { sSet, sGet, sDel, g_p_v } from '~/plugins/sojuz-store-api';
import { sRoute, sData } from '~/plugins/sojuz-actions-api';
import { eClass, eData } from '~/plugins/editable';

/* define Actions White List */
const AWL = { ...sSet, ...sGet, ...sDel, ...sRoute, ...sData }

/* register action method */
const action = (e, bAttrs) => {
  const output = []
  /* Run actions */
  bAttrs.actions?.map((el) => {
    const key = Object.keys(el)[0];
   
    const parse = (v) => {
      const split = v.split('.');
      if (split[0] == "^blockAttrs"){
        split.shift();
        v = g_p_v(bAttrs, split.join('.'))
      }
      return v
    }
    const filter = (v) => {
      return v ?  v.substring(0, 1) == '^' ? parse(v) : v : v
    }
    const w = (o) =>
      Object.entries(o).reduce((acc, [k, v]) => {
        if (v && typeof v === 'object') acc[k] = w(v);
        else acc[k] = filter(g_p_v('0', v)) || filter(v);
        return acc;
      }, {});

    const value = { ...w(el[key]) }
    const res = AWL[key](value)
    output.push(res);
  })
  console.log('actions output', output, bAttrs)
  /* is Editable mode then edit clicked group*/
  eData(e, bAttrs);
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
    return (
      <div onClick={(e) => action(e, props.blockAttrs)} class={[props.blockAttrs.className, eClass(props.blockAttrs)]}>
        {slots}
      </div>
    );
  },
};
