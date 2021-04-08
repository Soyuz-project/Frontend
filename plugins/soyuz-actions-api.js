/*
  SOJUZ ACTIONS API 
  process list of events and methods (events aggregation)
*/
import { transformer } from '~/plugins/soyuz-walker';
import { S, store,first } from '~/plugins/soyuz-store-api';
import { soyuzRouter } from '~/plugins/soyuz-actions-router';
import { resolve_mutation, write } from '~/plugins/soyuz-resolver';

export const runActions = (attrs) => {

  const RegAct = {...soyuzRouter, ...S, run_event, resolve_mutation}
  attrs.output = [];
  attrs.actions.map((el)=>{
  	const k = Object.keys(el)[0];
    let v;
    switch (k) {
      case 'run_event':
        v = {slug:el[k], parent: attrs}
        break;
      case 'resolve_mutation':
        v = {...attrs, parent: attrs}
        break;
      default:
      v = transformer( el[k] , attrs)
    }
    /*
      Launch action
    */
   console.log('k,v,attrs', k, v, attrs)
    try {
      attrs.output.push(RegAct[k](v));
    } catch (err) {
      S.set({ source: 'message', value: {message: `key:${k}:${err}`, type:'error'}})
    }
  })

  return attrs.output
};

const run_event = (action) => {
   const event = first(write(action.slug))
   runActions({...event, parent: action.parent})
};

