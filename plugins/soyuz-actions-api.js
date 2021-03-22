/*
  SOJUZ ACTIONS API 
  process list of events and methods (events aggregation)
*/
import { S, store } from '~/plugins/soyuz-store-api';
import { event } from '~/plugins/soyuz-events-api';
import { soyuzRouter } from '~/plugins/soyuz-actions-router';
import { transformer } from '~/plugins/soyuz-walker';
/* 
  set store method on actions level works only localy
  to write set data use WRITE event
*/
export const runActions = (actions) => {
  const RegAct = {...soyuzRouter, ...S, event}
  const ActOut = []
  actions.map((el)=>{

  	const k = Object.keys(el)[0];  
    // TODO actions transform
    const v = transformer(el[k], ActOut)

    /*
      Launch action
    */
    try {

      const res = RegAct[k](v)
      ActOut.push(res);
    } catch (err) {
      /* 
        TODO add errors maitenance
      */
      console.log(`key:${k}`,err)
    }
  })
  return ActOut
};

