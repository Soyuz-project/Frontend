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
  get(a) {
    /* 
      sanit key to check is exist 
    */
    const storeKey = a.source.split('.')[0];
    /* 
      and get value as output variable 
    */
    let output = store[p(storeKey)] ? g_p_v(store, p(a.source)) : null;
    /* 
      now can process output data by event filters
      ...
    */

    /* 
      and if see query_variables then finaly filter responce 
    */

    if (a.query_variables && Object.keys(a.query_variables) && store[p(storeKey)]) {

      const result = query_filters(output, a.query_variables)
      output = a.withPath ? result.map(el => [el[0], `${storeKey}.${el[1]}`]) : result.map(el => el[0]);
    }

    return output
  },
  set(a) {
    return s_p_v(store, a.value, p(a.source));
  },
  push(a) {
    const k = store[p(a.source)], v = a.value;
    if(a.query_variables && Object.keys(a.query_variables) && store[p(a.source)]){
      let r = S.get({source:a.source, query_variables: a.query_variables, withPath: true})
      if(r?.length){
        // r[0] = v
        S.set({ value: v, source: r[0][1] })
      }else{
        k.push(v)
      }
    return v
    }else{
      return k ? k.push(v) : store[p(a.source)] = [v];
    }
  },
  push_collection(a) {
     S.get({source:a.value}).map((el)=>{
      S.push({source:a.source, value:el})
     })
  },
  save(a){
    try {
      a.store.map((el)=>{
        window.localStorage.setItem(`soyuz_${el}`, JSON.stringify(S.get({source:el})));
      })
      S.set({ source: 'message', value: {message:a.success, type:'success'}})
    } catch (error) {
      S.set({ source: 'message', value: {message:error, type:'error'}})
    }
  }

};
export const query_filters = (d, f) => {
  const cn = s => (a, index) => {
    const condition = Object.keys(s).every((k) => 
       a[k] === s[k] ||
      Array.isArray(s[k]) && s[k].includes(a[k]) ||
      typeof s[k] === 'object' && +s[k].min <= a[k] &&  a[k] <= +s[k].max ||
      typeof s[k] === 'function' && s[k](a[k])
  )
  return (condition) ? [[a, index]] : []
  }
  return d.flatMap(cn(f))
}
const p = (s) => {
  return `${_p}${s}`
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