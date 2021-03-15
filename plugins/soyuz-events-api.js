/*
  SOJUZ EVENTS API 
  part of methods to realize action point
*/
import { S, store } from '~/plugins/soyuz-store-api';
import { transformer } from '~/plugins/soyuz-walker';

const MOCKUPMODE = true;

export const runEvent = (event) => {
  return event.method == 'READ' ? eventREAD(event) : eventWRITE(event);
};
const eventREAD = (event) => {


  let output;
  /* 
    MOCKUPMODE update store from localStorage if exist
  */
  if (MOCKUPMODE) {
    try {

    /* 
      1. load data from localstorage by event-slug
    */
      const localData = JSON.parse(window.localStorage.getItem(`soyuz_${event.slug}`));
    /* 
      2. and save from observable store 
    */
      S.set({ source: event.slug, value: localData });
    /* 
      3. now prepare query_variables to filters responce data
    */
      const filters_qv = transformer(event.query_variables, '')
    /* 
      4. and get storage data and filter to responce
    */
      output = S.get({ source: event.slug, query_variables: filters_qv });


    /* 
      5. if output have COLLECTION condition then:
    */
    
    if( event.collection && output.length <= 1){
      
      const collection_template = [];
      const collection_data = event.collection.default_data;
      
      S.set({ source: event.collection.source, value: collection_data });
      
      // filter data
      if(event.collection.query_variables){
        collection_data = S.get({ source: event.collection.source, query_variables: event.collection.query_variables });
      }

      collection_data.map((el,i)=>{
        const template = Object.assign({}, output[0]);
        template.collection_source = event.collection.source;
        template.collection_index = i;
        collection_template.push(template)

      })
      output = collection_template;

      // output = [{"blocks":[{
      //   "blockName": "core/paragraph",
      //   "attrs": {
      //     "content": "I found collection"
      //   }
      // }]}]
    }

    } catch (error) {}
   

    return output;
  } else {
    // RUN RESOLVER
    // default GQL query
  }
};
const eventWRITE = (event) => {
  console.log('WRITE');
};

/* 
  HELPERS 
*/


