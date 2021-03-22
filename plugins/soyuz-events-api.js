/*
  SOJUZ EVENTS API 
  part of methods to realize action point
*/
import { S, store } from '~/plugins/soyuz-store-api';
import { transformer } from '~/plugins/soyuz-walker';
import { runActions } from '~/plugins/soyuz-actions-api';

const MOCKUPMODE = true;

export const runEvent = (event) => {
  if( event.method == 'READ'){
    return eventREAD(event)
  }
  if( event.method == 'WRITE'){
    return eventWRITE(event)
  }
  if( event.method == 'PUSH'){
    return eventPUSH(event)
  }
};

const eventREAD = (event) => {

  let out;
  /* 
    MOCKUPMODE update store from localStorage if exist
  */
  if (MOCKUPMODE) {
    try {

    /* 1. load data from localstorage */
      const localData = JSON.parse(window.localStorage.getItem(`soyuz_${event.source}`));
    
    /* 2. and save to observable store (localStorage isnt data model for events)  */
      S.set({ source: event.source, value: localData });
    
    /* 3. get storage data and filter it to responce */
      out = S.get({ source: event.source, query_variables: transformer(event.query_variables) });
     
     // console.log('eventREAD w collection',event.slug, store )
    
    /* 4. if output have COLLECTION condition then: */
      if( out.length && event.collection && out.length <= 1){

        const col_tpl = [];
        let col;
        if(event.collection.default_data){
          col = event.collection.default_data;
          S.set({ source: event.collection.source, value: col });
        }else{
          col = S.get({ source: event.collection.source });
        }
        
        // filter data
        if(event.collection.query_variables){
          col = S.get({ source: event.collection.source, query_variables: event.collection.query_variables });
        }

        col.map((el,i)=>{
          const tpl = Object.assign({}, out[0]);
          tpl.collection_source = event.collection.source;
          tpl.collection_index = i;
          col_tpl.push(tpl)

        })
        out = col_tpl;
        // output = [{"blocks":[{
        //   "blockName": "core/paragraph",
        //   "attrs": {
        //     "content": "I found collection"
        //   }
        // }]}]
      }
    } catch (error) {}
    return out;
  } else {
    // RUN RESOLVER
    // default GQL query
  }
};

const eventWRITE = (event) => {
  /* 
    MOCKUPMODE update store from localStorage if exist
  */
  if (MOCKUPMODE) {
    try {
      console.log('write event', event.actions)
      runActions(event.actions)
    } catch (error) {}
  }
};

const eventPUSH = (event) => {
  /* 
    MOCKUPMODE update store from localStorage if exist
  */
  if (MOCKUPMODE) {
    try {
      const res = runActions(event.actions)
      S.push({source:event.source, value: Object.assign({},res[res.length-1][0]) } )
      return res
    } catch (error) {
       console.log('event error:', error)
    }
  }
};

/* 
  HELPERS 
*/

/*  prepare event to run by slug */
    
export const event = (eventSlug) =>{
  // console.log('go go event', S.get({ source: 'events', query_variables: {slug: eventSlug} })[0])
  return runEvent(S.get({ source: 'events', query_variables: {slug: eventSlug} })[0])
}

