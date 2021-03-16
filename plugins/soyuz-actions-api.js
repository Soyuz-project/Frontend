/*
  SOJUZ ACTIONS API 
  process list of events and methods (events aggregation)
*/
import { S, store } from '~/plugins/soyuz-store-api';
import { soyuzRouter } from '~/plugins/soyuz-actions-router';

const RegActions = {...soyuzRouter}
const actionsOutput = []

export const runAction = (blockAttrs) => {
  /*
    TODO after transformation array change to object
  */
  // console.log(blockAttrs, typeof blockAttrs)
  blockAttrs.actions.map((el)=>{
  	const key = Object.keys(el)[0];    
    const value = el[key]
    const res = RegActions[key](value)
    actionsOutput.push(res);
  })
};

