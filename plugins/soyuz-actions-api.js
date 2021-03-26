/*
  SOJUZ ACTIONS API 
  process list of events and methods (events aggregation)
*/
import { transformer } from '~/plugins/soyuz-walker';
import { S, store } from '~/plugins/soyuz-store-api';
import { soyuzRouter } from '~/plugins/soyuz-actions-router';
import { write } from '~/plugins/soyuz-resolver';

export const runActions = (attrs) => {
  const RegAct = {...soyuzRouter, ...S, runEvent}
  attrs.output = [];
  attrs.actions.map((el)=>{
  	const k = Object.keys(el)[0];  
    const v = k == "runEvent" ?  
      {slug:el['runEvent'], parent: attrs} : 
      transformer( el[k] , attrs)
    /*
      Launch action
    */
    try {
      attrs.output.push(RegAct[k](v));
    } catch (err) {
      S.set({ source: 'message', value: {message: `key:${k}:${err}`, type:'error'}})
    }
  })
  console.log(store)
  return attrs.output
};

const runEvent = (action) => {
   const event = write(action.slug)
   runActions({...event, parent: action.parent})
};

