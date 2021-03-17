import { runActions } from '~/plugins/soyuz-actions-api';
import { S, store, setTick } from '~/plugins/soyuz-store-api';

export const action = (e, attrs) => {
  e.preventDefault();
  e.stopPropagation();
  getClick(e, attrs)
  attrs.actions ? runActions(attrs.actions) : null
};

export const getClick = (e,attrs) =>{
	setTick()
	const box = cumulativeOffset(e.target)
	S.set({source:'native_click',value:{...attrs, box}})
	console.log('store', store)
}

var cumulativeOffset = function(element) {
	var rect = element.getBoundingClientRect();
	var top = 0,left = 0;
	do {
		top += element.offsetTop || 0;
		left += element.offsetLeft || 0;
		element = element.offsetParent;
	} while (element);
	return {
		top: top,
		left: left,
		w: rect.width,
		h: rect.height,
	};
};