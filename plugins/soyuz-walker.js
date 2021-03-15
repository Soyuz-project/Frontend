/* 
  Soyuz walker 
*/
import { store } from '~/plugins/soyuz-store-api';



/* 
  get value from object by path 
*/
export const g_p_v = (o, p) => {
  let e = Array.isArray(p) ? p : typeof p === 'string' ? p.split('.') : p,
    v,
    i;
  for (v = o, i = 0; v && i < e.length; ++i) {
    v = v[e[i]];
  }
  return v;
};

/* 
  set value from object by path 
*/
export const s_p_v = (o, v, p) => {
  let e = Array.isArray(p) ? p : p.split('.'),
    i;
  for (i = 0; i < e.length - 1; i++) o = o[e[i]];
  // Vue.set(o, e[i], v);
  o[e[i]] = v;
  return v;
  
};

/* 
  search and replace soyuz shorthand with configs
*/
export const transformer = (o, d) =>
  Object.entries(o).reduce((acc, [k, v]) => {
    if (v && typeof v === 'object') acc[k] = transformer(v, d);
    else acc[k] = replace(k, g_p_v(d, v)) || replace(k, v);
    return acc;
  }, {});

/* 
  soyuz shorthands replacer 
*/
export const replace = (k, v) => {

  if(typeof v !== 'string'){
    return v
  }

  const split = v.split('.');
  // if (split[0] == "^blockAttrs") {
  //   split.shift();
  //   v = g_p_v(targetAttrs, split.join('.'))
  // }
  // if (split[0] == "^action") {
  //   split.shift();
  //   v = g_p_v(actionsOutput, split.join('.'))
  // }
  // if (split[0] == "^store") {
  //   split.shift();
  //   v = S.getDeep({ nq: split[0], path: split[1] })
  // }


  // !!!!! TODO NOW !!!!  Remove replacer to TOP 

  if (split[0] == '^router') {
    split.shift();
    return store['soyuz_router']?.[split[0]]?.[split[1]];
  }
  return v;
};