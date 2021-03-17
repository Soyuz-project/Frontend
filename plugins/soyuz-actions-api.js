/*
  SOJUZ ACTIONS API 
  process list of events and methods (events aggregation)
*/
import { S, store } from '~/plugins/soyuz-store-api';
import { event } from '~/plugins/soyuz-events-api';
import { soyuzRouter } from '~/plugins/soyuz-actions-router';

/* 
  set store method on actions level works only localy
  to write set data use WRITE event
*/
export const runActions = (actions) => {
  const RegActions = {...soyuzRouter, ...S, event}
  
  const actionsOutput = []
  actions.map((el)=>{

  	const key = Object.keys(el)[0];    
    const value = el[key]
    /*
      Launch action
    */
    try {
      const res = RegActions[key](value)
      actionsOutput.push(res);
    } catch (err) {
      /* 
        TODO add errors maitenance
      */
      console.log(`key:${key}`,err)
    }
  })
  return actionsOutput
};

