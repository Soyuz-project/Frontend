/*
  SOJUZ OBSERVABLE STORAGE
*/

import Vue from 'vue';
import { g_p_v, s_p_v } from '~/plugins/soyuz-walker';
import { resolve_mutation } from '~/plugins/soyuz-resolver';
export const store = Vue.observable({});
export const tick = Vue.observable({
  value:0
});
/*
  API METHODS
*/
export const S = {
  get(a) {
    return store[p(a.source.split('.')[0])] ? g_p_v(store, p(a.source)) : null
  },
  set(a) {
    return s_p_v(store, a.value, p(a.source));
  },
  push(a){
  	const res = a.res ? a.res : S.get({source: a.source});
  	if (res) {
      if(a.unique){
        const duplicateIndex = res.findIndex((el) => el.slug === a.value.slug);
        if (duplicateIndex === -1) res.push(a.value);
        else res[duplicateIndex] = a.value;
      }else{
        res.push(a.value);
      }
  	} else {
  		store[p(a.source)] = [a.value];
  	}
    return a.value
  },
  get_collection(a){
    return store[p(a.source)] && a.query_variables ? 
      query_filters(store[p(a.source)], a.query_variables) : 
      store[p(a.source)]
  },
  push_collection(a) {
    const out = a.value?.map((el)=>{
      return S.push({source:a.source, value:el, unique:a.unique || null })
    })
    return out
  },
  set_blocks(a){
    return a.value?.map((el)=>{
      const target = first(S.get_collection({source:el.attrs.source, query_variables:{slug:el.attrs.source_slug}}))
      s_p_v(target, el, el.attrs.source_path, true)
      return target
    })
  },
  mutation(a){
    resolve_mutation(a)
  }

};

/*
  HELPERS
*/
export const query_filters = (d, f) => {
  const cn = s => a => Object.keys(s).every(k => 
    a[k] === s[k] ||
    Array.isArray(s[k]) && s[k].includes(a[k]) ||
    typeof s[k] === 'object' && +s[k].min <= a[k] &&  a[k] <= +s[k].max ||
    typeof s[k] === 'function' && s[k](a[k])
  )
  return d.filter(cn(f))

}

export const first = (a) => {
  return Array.isArray(a) ? a[0] : a
}

export const p = (s) => {
  return `soyuz_${s}`
}

/* DirtyHack to run reactivity with store */
export const setTick = () => tick.value++;

Vue.prototype.$store = store;
Vue.prototype.$tick = tick;

