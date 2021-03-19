/* eslint-disable react/no-unknown-property */
/* eslint-disable react/react-in-jsx-scope */
// import { bClass } from '~/helpers/block';
export default {
  functional: true,
  name: 'soyuzSvg',
  props: {
    blockAttrs: {
      type: Object,
      default: () => ({}),
    },
  },
  render(
    h,
    {
      props: { blockAttrs },
    }
  ) {
    const b = blockAttrs;
    return <svg
        class={b.className}
        stroke-width={b.strokeWeight || 0}
        fill={b.fill || '#000'}
        fill-opacity={b.fillOpacity || 1}
        viewBox={b.viewBox || '0 0 64 64'}
        width={b.size || 32}
        height={b.size || 32}
        stroke={b.stroke || 'currentcolor'}
        strokeOpacity={b.strokeOpacity || 1}
        shapeRendering={b.shapeRendering || 'geometricPrecision'}>
        <path d={b.path}/>
      </svg>
  },
};

/*
  TODO switch to render from sprite 
  <svg>
    <use xlinkHref={`${require(`sojuzProject/sprite.svg`)}#${blockAttrs.name.toLowerCase()}`} />
  </svg>
*/
