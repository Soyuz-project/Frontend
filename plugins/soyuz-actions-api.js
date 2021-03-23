/*
  SOJUZ ACTIONS API 
  process list of events and methods (events aggregation)
*/
import { S, store } from '~/plugins/soyuz-store-api';
import { event } from '~/plugins/soyuz-events-api';
import { soyuzRouter } from '~/plugins/soyuz-actions-router';
import { iterate } from '~/plugins/soyuz-walker';
/* 
  set store method on actions level works only localy
  to write set data use WRITE event
*/
export const runActions = (attrs) => {
  const RegAct = {...soyuzRouter, ...S, event}
  const ActOut = []
  attrs.actions.map((el)=>{

  	const k = Object.keys(el)[0];  
    const v = k == "event" ? Object.assign( iterate( el , attrs), attrs ) : iterate( el[k] , attrs)
    
    /*
      Launch action
    */
    try {
      const res = RegAct[k](v)
      ActOut.push(res);
      console.log(store)
    } catch (err) {
      S.set({ source: 'message', value: {message: `key:${k}:${err}`, type:'error'}})
    }
  })
  return ActOut
};

