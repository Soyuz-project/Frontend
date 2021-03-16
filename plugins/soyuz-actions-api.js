/*
  SOJUZ ACTIONS API 
  process list of events and methods (events aggregation)
*/
import { S, store } from '~/plugins/soyuz-store-api';
import { soyuzRouter } from '~/plugins/soyuz-actions-router';

/* 
  set store method on actions level works only localy
  to write set data use WRITE event
*/
const RegActions = {...soyuzRouter, ...S}
const actionsOutput = []

export const runAction = (blockAttrs) => {
  blockAttrs.actions.map((el)=>{
  	const key = Object.keys(el)[0];    
    const value = el[key]
    /*
      Launch action
    */
    try {
      const res = RegActions[key](value)
      actionsOutput.push(res);
    } catch (err) {
      console.log(`key:${key}`,err)
    }
  })
  console.log('actions finished', actionsOutput)
};

