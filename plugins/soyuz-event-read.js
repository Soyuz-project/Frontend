
import { MOCKUPMODE } from '~/plugins/soyuz-events-api'
import { S, store } from '~/plugins/soyuz-store-api';

export const eventREAD = (event) => {

  /* 
    MOCKUPMODE update store from localStorage if exist
  */
  if (MOCKUPMODE) {
    
    /* load pages: */
      let page = S.query({source:event.source, query_variables: event.query_variables});

    /* if output have COLLECTION condition then: */  
      if( page && page.length && event.collection && page.length <= 1){
        
        const collection = {tpl:[],collectionData:[]}
        if(event.collection.default_data){
          collection.collectionData = S.set({ source: event.collection.source, value: event.collection.default_data });
        }else{
          collection.collectionData = S.query({source:event.collection.source, query_variables: event.collection.query_variables});
        }
        page[0].collection_source = event.collection.source;
        collection.collectionData.map((el,i)=>{
          collection.tpl.push({...JSON.parse(JSON.stringify(page[0])), collection_index:i })
        })        
        page = collection.tpl;   

      }
              
    return page;

  } else {
    // RUN RESOLVER
    // default GQL query
  }
};