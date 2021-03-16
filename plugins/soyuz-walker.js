/* 
  Soyuz walker 
*/
import { S, store } from '~/plugins/soyuz-store-api';

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
export const transformer = (o, d, b = null) =>
  Object.entries(o).reduce((acc, [k, v]) => {
    if (v && typeof v === 'object') acc[k] = transformer(v, d, b);
    else acc[k] = replace(k, g_p_v(d, v), b) || replace(k, v, b);
    return acc;
  }, {});

/* 
  soyuz shorthands replacer 
*/
export const replace = (k, v, b) => {
  
  if(typeof v !== 'string' || v === ""){
    return v
  }
  v = v.replace(/{[^{}]+}/g, function(key){
    const s = key.replace(/[{}]+/g, "").split('.')
     
    if(s[0] == 'router'){
      s.shift();
      return store['soyuz_router']?.[s[0]]?.[s[1]] || ""
    }
    if(s[0] == 'collection'){
      s.shift();
      return S.get({source:`${b.collection_source}.${b.collection_index}.${s[0]}`}) || ""
    }   
  });

  return v;
};