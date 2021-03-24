
import { MOCKUPMODE } from '~/plugins/soyuz-events-api'
import { S, store } from '~/plugins/soyuz-store-api';
import { transformer } from '~/plugins/soyuz-walker';
export const eventREAD = (event) => {


  /* 
    MOCKUPMODE update store from localStorage if exist
  */
  if (MOCKUPMODE) {
    
     /* load pages: */
     /* dirty hack to destruct event ref :( */
      const cloneEvent = JSON.parse(JSON.stringify(event))
      cloneEvent.queryVariables = transformer(cloneEvent.query_variables,'')
      const res = S.query({source:cloneEvent.source, query_variables: cloneEvent.query_variables});
     

    /* if output have COLLECTION condition then: */
      
      // if( res && res.length && event.collection && res.length <= 1){

      //   const col_tpl = [];
      //   let col;
      //   if(event.collection.default_data){
      //     col = event.collection.default_data;
      //     S.set({ source: event.collection.source, value: col });
      //   }else{
      //     col = S.get({ source: event.collection.source });
      //   }
        
      //   // filter data
      //   if(event.collection.query_variables){
      //     col = S.get({ source: event.collection.source, query_variables: event.collection.query_variables });
      //   }

      //   col.map((el,i)=>{
      //     const tpl = Object.assign({}, res[0]);
      //     tpl.collection_source = event.collection.source;
      //     tpl.collection_index = i;
      //     col_tpl.push(tpl)

      //   })
      //   res = col_tpl;
        
       
      // }
      // console.log(store)
    return res;
  } else {
    // RUN RESOLVER
    // default GQL query
  }
};