/*
  SOJUZ EVENTS API 
  part of methods to realize action point
*/
import { eventREAD } from '~/plugins/soyuz-event-read';
import { eventWRITE } from '~/plugins/soyuz-event-write';
import { S, store, first } from '~/plugins/soyuz-store-api';

export const MOCKUPMODE = true;
export const runEvent = (event) => {
  
  /* load event */
  const e = event.slug != 'router' ? 
    first(S.query({source:'events', query_variables: {slug: event.slug} })) :
    { 
      method:'READ',
      source:'pages',
      query_variables:{slug: store.soyuz_router.params.slug}
    }

  if( e?.method == 'READ'){
    return eventREAD(e)
  }
  if( e?.method == 'WRITE'){
    return eventWRITE(Object.assign({},  e, event ))
  }
  if( e?.method == 'PUSH'){
    return eventPUSH(e)
  }
};



