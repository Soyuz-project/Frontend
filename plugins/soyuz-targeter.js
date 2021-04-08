/*
  SOJUZ TARGETER
*/
import { runActions } from '~/plugins/soyuz-actions-api';
import { S, store, setTick } from '~/plugins/soyuz-store-api';
import { soyuzRouter } from '~/plugins/soyuz-actions-router';

export const action = (e, attrs) => {
	if(attrs.targetable && store.soyuz_targeter){
		e.preventDefault();
  		e.stopPropagation();
		getClick(e, attrs)
		/*
		refresh frontend
		*/
		soyuzRouter.routerQuery({'tick':Math.random(10)})
	}else{
		if(attrs.actions){
  			attrs.actions ? runActions(attrs) : null
  			e.stopPropagation();
		}
		setTick()
	}
	

};


/* capture every click */
export const getClick = (e, attrs) =>{
	const box = calcOffset(e.target)
	S.set({source:'native_click',value:{...attrs, box}})
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
	S.push_collection({source:'pages', value:[p], unique:'slug'})
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
  return 'blocks.'+p
    .flatMap((el) => {
      return [el, 'innerBlocks'];
    })
    .slice(0, -1);
};