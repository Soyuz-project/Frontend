
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
	if(attrs.conditionalLogic && attrs.conditionalLogic.length){
		let guardian = true
		attrs.conditionalLogic.map((el)=>{
			const res = transformer(el,'');
			console.log(res)
			// // if defined key exist
			if(res.value && res.key){
				guardian = false
			}
			// guardian != res.value && res.key
		})
		if(guardian){
			return ''
		}
	}
	return data;
}





