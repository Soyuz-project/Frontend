import { S, store, first, query_filters, p } from '~/plugins/soyuz-store-api';
import { transformer } from '~/plugins/soyuz-walker';
export const read = (event_slug) => {
	/*
		Local storage query
	*/
	const res = {
		event: {},
		template: [],
		collection:[]
	}
	res.event = first(local_get({source:'events', query_variables:{slug: event_slug}}))
	res.event.query_variables = transformer(res.event.query_variables, '')
	res.template = local_get(res.event)
		
	/*
		update store
	*/
	store.soyuz_events ? null : store['soyuz_events'] = {}
	store.soyuz_events[event_slug] = res.event
	S.push_collection({source:'pages', value:res.template})

	return res.event
}

export const write = (event_slug) => {
	return store.soyuz_events[event_slug] = first(local_get({source:'events', query_variables:{slug: event_slug}}))
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
