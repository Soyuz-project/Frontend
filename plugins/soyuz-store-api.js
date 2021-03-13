/*
  SOJUZ OBSERVABLE STORAGE
  original size: 227b / gzipped size: 170b
*/

import Vue from 'vue';
export const store = Vue.observable({});

/*
  API METHODS
*/
const _p = 'sojuz_';
/* sGet */
export const S = {
  get(attrs) {
    const storeKey = attrs.source.split('.')[0];
    let output = store[`${_p}${storeKey}`] ? g_p_v(store, `${_p}${attrs.source}`) : null;
    attrs.query_variables && Object.keys(attrs.query_variables)
      ? (output = query_filters(output, attrs.query_variables))
      : null;
    return output;
  },
  set(attrs) {
    return s_p_v(store, attrs.value, `${_p}${attrs.source}`);
  },
};
Vue.prototype.$store = store;

/* HELPERS */
/* get value from object by path */
export const g_p_v = (o, p) => {
  let e = Array.isArray(p) ? p : typeof p === 'string' ? p.split('.') : p,
    v,
    i;
  for (v = o, i = 0; v && i < e.length; ++i) {
    v = v[e[i]];
  }
  return v;
};

/* set value from object by path */
export const s_p_v = (o, v, p) => {
  let e = Array.isArray(p) ? p : p.split('.'),
    i;
  for (i = 0; i < e.length - 1; i++) o = o[e[i]];
  // Vue.set(o, e[i], v);
  o[e[i]] = v;
  return v;
  
};

/* filters */
export const query_filters = (d, f) => {
  if (f && Array.isArray(d)) {
    return d.filter(function(e) {
      return Object.keys(f).every(function(a) {
        return !!Object.values(f).find((elem) => elem == e[a]);
      });
    });
  }
  return d;
};
