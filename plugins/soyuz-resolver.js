import { S, store, first, query_filters, p } from '~/plugins/soyuz-store-api';
import { transformer } from '~/plugins/soyuz-walker';
import { soyuzRouter } from '~/plugins/soyuz-actions-router';
import { refreshBlockPaths } from '~/plugins/soyuz-targeter';


export const read = (event_slug, optimistic = false) => {

	/*
		Local storage query
	*/
	const res = {
		event: {},
		template: [],
		collection:[{}]
	}

	res.event = first(local_get({source: 'events', query_variables:{slug: event_slug}}))

	// if readevent dont have query
	if(!res.event?.query_variables){
		return res
	} 

	res.event.query_variables = transformer(res.event.query_variables, '')

	// TODO this is not ready (now render template only from store)
	// exerption1: optimistic is forced true when editable mode is true
	if(optimistic){
		res.template = S.get_collection( {source:res.event.source, query_variables:res.event.query_variables})
		// if optimistic have empty result try load data 
		if(!res.template.length){
			res.template = local_get(res.event)
		}
		refreshBlockPaths(res.template);
	}else{
		res.template = local_get(res.event)
	}
	
	/*
		update store
	*/
	S.push_collection({source:'events', value:[res.event], unique:'slug'})
	S.push_collection({source:res.event.source, value:res.template, unique:'slug'})

	/*
		get collection
	*/
	if(res.event.collection){
		res.collection = []
		const from_server = local_get({source:res.event.collection.source})
		if(from_server){
			res.collection = from_server;
		}else{
			res.event.collection.default_data ? res.collection = res.event.collection.default_data: null
		}
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
	  	if(k == 'push_collection' ){
	  		if(attrs.output[i] && attrs.output[i].length){
	  			attrs.output[i].map((el)=>{
					// mutation to local starage
			  		local_push({value:el, source:action[k].source})
			  	})
	  		}
	  	} else if (k =='set_blocks') {
	  		if(attrs.output[i] && attrs.output[i].length){
	  			attrs.output[i].map((el)=>{
	  				
					// mutation to local starage
			  		local_push({value:el, source:'pages'})
			  	})
	  		}
	  	}
	}) 
	/*
		refresh frontend
	*/
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
			// res props send data to push, source find data in store
			S.push({value:a.value, res:res , unique:'slug'})
		}else{
			res = [a.value]
		}
		window.localStorage.setItem(p(a.source), JSON.stringify(res));
	} catch (error) {}
}
