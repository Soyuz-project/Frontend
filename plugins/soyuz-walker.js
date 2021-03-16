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
export const transformer = (o) => {
  const t = Object.assign({},o);
  
  const w = (o) =>
  Object.entries(o).reduce((acc, [k, v]) => {
    if (v && typeof v === 'object') acc[k] = w(v);
    else acc[k] = replace(k, v);
    return acc;
  }, Array.isArray(o)?[]:{});
  
  /* 
    soyuz shorthands replacer 
  */
  const replace = (k, v) => {
    
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

        return S.get({source:`${t.collection_source}.${t.collection_index}.${s[0]}`}) || ""
      }   
    });

    return v;
  };
  return  w(o)
 
}


