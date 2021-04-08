
/*
  soyuz-conditional-cogic
  for rendering components
*/
import { transformer } from '~/plugins/soyuz-walker';

const condition = (v1, v2, c) => {
	if (c === '==') {
		return v1 == v2;
	}
};

export const checkDisplay = (data, attrs) => {
	if(attrs.conditionalLogic?.length){
		let guardian = attrs.conditionalLogic.some((el)=>{
			const res = transformer(el,'');
			console.log(res)
			// // if defined key exist
	  	return res.value != res.key
		})
		console.log('t',guardian)
		if(guardian){
			return ''
		}
	}
	return data();

}





