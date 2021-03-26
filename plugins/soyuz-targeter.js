/*
  SOJUZ TARGETER
*/
import { runActions } from '~/plugins/soyuz-actions-api';
import { S, store, setTick } from '~/plugins/soyuz-store-api';

export const action = (e, attrs) => {
	if(attrs.actions){
		e.preventDefault();
  		e.stopPropagation();
  		// getClick(e, attrs)
  		
  		attrs.actions ? runActions(attrs) : null
	}
};

/* capture every click */
export const getClick = (e,attrs) =>{
	setTick()
	refreshBlockPaths(attrs);
	const box = calcOffset(e.target)
	S.set({source:'native_click',value:{...attrs, box}})
	console.log('store', store)
}

/* don't run it too often */
const calcOffset = (el) => {
	const rect = el.getBoundingClientRect();
	let top = 0, left = 0;
	do {
		top += el.offsetTop || 0;
		left += el.offsetLeft || 0;
		el = el.offsetParent;
	} while (el);
	return { top: top, left: left, w: rect.width, h: rect.height };
};

/* refreshBlockPaths block path properties */
export const refreshBlockPaths = (attrs) => {
	const p = S.get({source:'pages',query_variables:{slug:attrs.source_slug}})[0]
	p.blocks = p.blocks.map((b, i) => genBlockPath(b, [i]))
	S.push({source:'pages',query_variables:{slug:attrs.source_slug}, value:p})
};

/* generate block path properties */
export const genBlockPath = (block, __blockPath = []) => {
  return {
    ...block,
    attrs: { ...block?.attrs, __blockPath },
    ...(block.innerBlocks && { innerBlocks: block.innerBlocks.map((b, i) => genBlockPath(b, [...__blockPath, i])) })
  }
};

/* sync path to gutenberg model */
export const fixPath = (p) => {
  return p
    .flatMap((el) => {
      return [el, 'innerBlocks'];
    })
    .slice(0, -1);
};