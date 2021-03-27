import { S, store, first, query_filters, p } from '~/plugins/soyuz-store-api';
import { transformer } from '~/plugins/soyuz-walker';
import { soyuzRouter } from '~/plugins/soyuz-actions-router';
export const read = (event_slug) => {
	/*
		Local storage query
	*/
	const res = {
		event: {},
		template: [],
		collection:[{}]
	}
	res.event = first(local_get({source:'events', query_variables:{slug: event_slug}}))
	res.event.query_variables = transformer(res.event.query_variables, '')
	res.template = local_get(res.event)
	/*
		update store
	*/
	S.push_collection({source:'events', value:[res.event], unique:'slug'})
	S.push_collection({source:'pages', value:res.template, unique:'slug'})

	/*
		get collection
	*/
	if(res.event.collection){
		res.collection = []
		res.collection = res.event.collection.default_data;
		S.push_collection({source:res.event.collection.source, value:res.collection, unique:'slug'})
	}	
	

	return res
}

export const write = (event_slug) => {
	return local_get({source:'events', query_variables:{slug: event_slug}})
}
export const resolve_mutation = (attrs) => {
	
	attrs.actions.map((action,i)=>{ 
		const k = Object.keys(action)[0]
	  	if(k == 'push_collection'){
	  		if(attrs.output[i] && attrs.output[i].length){
	  			attrs.output[i].map((el)=>{
	  				
					// mutation to local starage
					
			  		local_push({value:el, source:action[k].source})
			  	})
	  		}
	  	}
	}) 
	soyuzRouter.routerQuery({'tick':Math.random(10)})
	// try {
	//      S.set({ source: 'message', value: {message:a.success, type:'success'}})
	//    } catch (error) {
	//      S.set({ source: 'message', value: {message:error, type:'error'}})
	//    }
}

/*
	Helpers
*/
export const local_get = (a) => {
  try {
    const res = JSON.parse(window.localStorage.getItem(p(a.source)))
    return res && a.query_variables ? query_filters(res, a.query_variables) : res
  } catch (error) {}
}
export const local_set = (a) => {
  try {
    window.localStorage.setItem(p(a.source), JSON.stringify(a.value));
    return a.value
  } catch (error) {}
}
export const local_push = (a) => {
	
	try {
		let res = JSON.parse(window.localStorage.getItem(p(a.source)))
		if(res){
			S.push({value:a.value, res:res , unique:'slug'})
		}else{
			res = [a.value]
		}
		window.localStorage.setItem(p(a.source), JSON.stringify(res));
	} catch (error) {}
}
