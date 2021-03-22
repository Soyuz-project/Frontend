/* 
  Soyuz walker 
*/
import { S } from '~/plugins/soyuz-store-api';
// https://github.com/silentmatt/expr-eval/tree/master#evaluatevariables-object
import { Parser } from 'expr-eval';

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
  try{
    let e = Array.isArray(p) ? p : p.split('.'),
    i;
    for (i = 0; i < e.length - 1; i++) o = o[e[i]];
    o[e[i]] = v;
  }catch(err){}
  return v;
};

/* 
  search and replace soyuz shorthand with configs
*/
export const transformer = (o, a) => {
  if (typeof o === 'string') return o

  const t = Object.assign({}, o);

  const w = (o) =>
  Object.entries(o).reduce((acc, [k, v]) => {
    if (v && typeof v === 'object') acc[k] = w(v);
    else acc[k] = replace(v,t);
    return acc;
  }, Array.isArray(o)?[]:{});
  
  /* 
    soyuz shorthands replacer 
  */


  return  w(o)
 
}

  const replace = (v, t) => {
   
    if(typeof v !== 'string' || v === ""){
      return v
    }

   
    v = v.replace(/{[^{}]+}/g, function(key, o){
      const s = key.replace(/[{}]+/g, "").split('.')
       
      if(s[0] == 'router'){
        s.shift();
        return S.get({source:'router'})?.[s[0]]?.[s[1]] || ""
      }
      if(s[0] == 'collection'){
        s.shift();
        return S.get({source:`${t.collection_source}.${t.collection_index}.${s[0]}`}) || ""
      }  
      if(s[0] == 'this'){
        s.shift();
        return `|${s[0]}`
      }  
      if(s[0] == 'math'){
        s.shift();
        let m = s.join('.')
        m.match(/[^[\]]+(?=\])/g)?.forEach(i => {
          const x = i.split('.')
          if(x[0]=='this'){
              x.shift();
              const av = g_p_v(a, x);
              m = m.replace(/\[.*?]/, parseInt(av) ? parseInt(av) : 1)
          }
        })
        const p = new Parser();
        return p.evaluate(m)
      } 
    });
    // replace to object
    if(v.charAt(0) == "|"){
      v = t[v.substring(1)]
    }
    
 
    return v;
  };


export const iterate  = (obj, t) => {
    for (var property in obj) {
        if (obj.hasOwnProperty(property)) {
            if (typeof obj[property] == "object") {
                iterate(obj[property],t);
            }
            else {
              
                obj[property] = replace(obj[property], t)
            }
        }
    }
    return obj
}