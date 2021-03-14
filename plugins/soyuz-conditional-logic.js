
/*
  soyuz-conditional-cogic
  for rendering components
*/
import { w } from '~/plugins/soyuz-walker';

const condition = (v1, v2, c) => {
	if (c === '==') {
		return v1 == v2;
	}
};

export const checkDisplay = (data, attrs) => {
	if(attrs.conditionalLogic && attrs.conditionalLogic.length){
		let guardian = true
		attrs.conditionalLogic.map((el)=>{
			const res = w(el,'');

			// if defined key exist
			if(res.value && res.key){
				console.log('ok')
				guardian = false
			}
		})
		if(guardian){
			return ''
		}
	}
	return data;
}





