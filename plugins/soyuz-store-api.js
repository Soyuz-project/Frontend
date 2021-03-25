/*
  SOJUZ OBSERVABLE STORAGE
*/

import Vue from 'vue';
import { g_p_v, s_p_v, iterate } from '~/plugins/soyuz-walker';
export const store = Vue.observable({});
export const tick = Vue.observable({
  value:0
});
/*
  API METHODS
*/
const _p = 'soyuz_';
export const S = {
  get(a) {
    return store[p(a.source.split('.')[0])] ? g_p_v(store, p(a.source)) : null
  },
  set(a) {
    return s_p_v(store, a.value, p(a.source));
  },
  push(a){
  	const res = S.get({source: a.source});
  	if (res) {
  		const duplicateIndex = res.findIndex((el) => el.slug === a.value.slug);
  		if (duplicateIndex === -1) res.push(a.value);
  		else res[duplicateIndex] = a.value;
  	} else {
  		store[p(a.source)] = [a.value];
  	}
    return a.value
  },
  push_collection(a) {
    const out = a.value?.map((el)=>{
      return S.push({source:a.source, value:el})
    })
    return out
  },
  set_blocks(a){
    return a.value?.forEach((el)=>{
      const res = S.get({source: el.attrs.source});
      const index = res?.findIndex((e) => e.slug === el.attrs.source_slug);
      s_p_v(res[index], el, el.attrs.source_path)
    })
  },
  query(a){
    const res = local_get({source:a.source, query_variables:a.query_variables});
    const out = S.push_collection({source:a.source, value:res})
    return out;
  },
  mutation(a){
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

/*
  HELPERS
*/
export const query_filters = (d, f) => {
  return d.filter(function(el) {
    for (var k in f) {
      if (el[k] === undefined || el[k] != f[k])
        return false;
    }
    return true;
  });
}

export const first = (a) => {
  return Array.isArray(a) ? a[0] : a
}

export const local_set = (a) => {
  try {
    window.localStorage.setItem(p(a.source), JSON.stringify(a.value));
    return a.value
  } catch (error) {}
}

export const local_get = (a) => {
  try {
    let res = JSON.parse(window.localStorage.getItem(p(a.source)))

    if (res && a.query_variables) {
      res = query_filters(res, a.query_variables)
    }
    return res
  } catch (error) {}
}

const p = (s) => {
  return `${_p}${s}`
}

/* DirtyHack to run reactivity with store */
export const setTick = () => tick.value++;

Vue.prototype.$store = store;
Vue.prototype.$tick = tick;

