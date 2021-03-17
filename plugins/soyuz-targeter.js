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
	S.set({source:'click',value:{...attrs}})
	console.log('store', store)
}