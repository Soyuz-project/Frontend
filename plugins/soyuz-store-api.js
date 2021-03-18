/*
  SOJUZ OBSERVABLE STORAGE
*/

import Vue from 'vue';
import { g_p_v, s_p_v } from '~/plugins/soyuz-walker';
export const store = Vue.observable({});
export const tick = Vue.observable({
  value:0
});
/*
  API METHODS
*/
const _p = 'soyuz_';
/* sGet */
export const S = {
  /* 
    {
      source: soreName.key.as.path
      query_variables: { 
        foo1: 'bar',                                   
        foo2: ['bar21', 'bar22'],                       
        range: {min: 1, max: 2},
        transmission: v => v.toLowerCase() === 'automatic' // to test                                  
      },
    }
  */
  get(attrs) {
    /* 
      sanit key to check is exist 
    */
    const storeKey = attrs.source.split('.')[0];
    /* 
      and get value as output variable 
    */
    let output = store[`${_p}${storeKey}`] ? g_p_v(store, `${_p}${attrs.source}`) : null;
    /* 
      now can process output data by event filters
      ...
    */

    /* 
      and if see query_variables then finaly filter responce 
    */
    attrs.query_variables && Object.keys(attrs.query_variables)
      ? (output = query_filters(output, attrs.query_variables))
      : null;
    /* 
      ;)
    */
    return output;
  },
  set(attrs) {
    return s_p_v(store, attrs.value, `${_p}${attrs.source}`);
  },
  push(attrs) {
    const r = store[`${_p}${attrs.source}`];
    const value = attrs.value;
    if(attrs.query_variables && Object.keys(attrs.query_variables)){
      let res = S.get({source:attrs.source, query_variables: attrs.query_variables})
      res = value;
      return res
    }
    return r ? r.push(value) : store[`${_p}${attrs.source}`] = [value];
  }
};
export const query_filters = (d, f) => {
  const cn = s => a => Object.keys(s).every(k => 
    a[k] === s[k] ||
    Array.isArray(s[k]) && s[k].includes(a[k]) ||
    typeof s[k] === 'object' && +s[k].min <= a[k] &&  a[k] <= +s[k].max ||
    typeof s[k] === 'function' && s[k](a[k])
  )
  return d.filter(cn(f))

}

/* DirtyHack to run reactivity with store */
export const setTick = () => tick.value++;

Vue.prototype.$store = store;
Vue.prototype.$tick = tick;

/* OLD Responce filter (js filter collection by many pairs keys and values) */
// export const query_filters = (d, f) => {
//   if (f && Array.isArray(d)) {
//     return d.filter(function(e) {
//       return Object.keys(f).every(function(a) {
//         return !!Object.values(f).find((elem) => elem == e[a]);
//       });
//     });
//   }
//   return d;
// };