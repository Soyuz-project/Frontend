/* 
  Soyuz walker 
*/
import { S } from '~/plugins/soyuz-store-api';
import { Parser } from 'expr-eval';

/* 
  get value from object by path 
*/
export const g_p_v = (o, p) => {
  let e = Array.isArray(p) ? p : typeof p === 'string' ? p.split('.') : p,v,i;
  for (v = o, i = 0; v && i < e.length; ++i) {
    v = v[e[i]];
  }
  return v;
};

/* 
  set value from object by path 
*/
export const s_p_v = (o, v, p, insertLastArray) => {
  try{
    let e = Array.isArray(p) ? p : p.split('.'),
    i;
    for (i = 0; i < e.length - 1; i++) o = o[e[i]];

    // if (insertLastArray) {
    //   // o[e[i]] 
    //   o[e[i]].splice(2, 0, "Lene");
    // } else {
    o[ e[i]] = v;

    // }
  }catch(err){}
  return v;
};

/* 
  search and replace soyuz shorthand with configs
*/

export const transformer  = (o, _t) => {
  const t = Object.assign({}, _t);
  for (var prop in o) {
    if (o.hasOwnProperty(prop)) {
      if (typeof o[prop] == "object") {
        transformer(o[prop], t);
      }
      else {
        o[prop] = replace(o[prop], t)
      }
    }
  }
  return o
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
      return `|${s.join('.')}`
    }   
    if(s[0] == 'math'){
      s.shift();
      let m = s.join('.')
      m.match(/[^[\]]+(?=\])/g)?.forEach(i => {
        const x = i.split('.')
        if(x[0]=='this'){
            x.shift();
            const av = g_p_v(t, x);
            m = m.replace(/\[.*?]/, parseInt(av) ? parseInt(av) : 1)
        }
      })
      const p = new Parser();
      return p.evaluate(m)
    } 
    // return key
  });
  // replace to object
  if(v.charAt(0) == "|"){
    v = g_p_v(t, v.substring(1))
  }
  return v;
};
