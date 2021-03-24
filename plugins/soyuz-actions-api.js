/*
  SOJUZ ACTIONS API 
  process list of events and methods (events aggregation)
*/
import { runEvent } from '~/plugins/soyuz-events-api';
import { transformer } from '~/plugins/soyuz-walker';
import { S, store } from '~/plugins/soyuz-store-api';
import { soyuzRouter } from '~/plugins/soyuz-actions-router';
/* 
  set store method on actions level works only localy
  to write set data use WRITE event
*/
export const runActions = (attrs) => {
  const RegAct = {...soyuzRouter, ...S, runEvent}
  attrs.output = [];
  attrs.actions.map((el)=>{
  	const k = Object.keys(el)[0];  
    const v = k == "runEvent" ?  
      {slug:el['runEvent'], parent:attrs} : 
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
  console.log('store ---->', store)
  return attrs.output
};

