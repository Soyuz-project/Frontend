import { runActions } from '~/plugins/soyuz-actions-api';

export const action = (e, attrs) => {
  e.preventDefault();
  e.stopPropagation();
  getClick(e, attrs)
  attrs.actions ? runActions(attrs.actions) : null
};
export const getClick = (e,attrs) =>{
	console.log(e, attrs);
}