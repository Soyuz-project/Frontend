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
// spv({arr: [1,2,3,4]},1, 'arr.3', true)
export const s_p_v = (o, v, p, insertLastArray) => {
  try {
    let e = Array.isArray(p) ? p : p.split("."),
      i;
    for (i = 0; i < e.length - 1; i++) o = o[e[i]];
debugger
    if (Array.isArray(o) || (i === e.length - 1 && !isNaN(e[i]))) {
      if (insertLastArray && i < e.length) o.splice(e[i], 0, v);
      else o[e[i - 1]].push(v);
    } else {
      o[e[i]] = v;
    }
  } catch (err) {}
  return v;
};

/* 
  search and replace soyuz shorthand with configs
*/
export const transformer = (obj, attrs) => {
  return Object.entries(obj).reduce((acc, [k, v]) => {
    if (v && typeof v === 'object') acc[k] = transformer(v, attrs);
    else acc[k] = replace(v, attrs);
    return acc;
  }, Array.isArray(obj)?[]:{});
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
      return `|t${s.join('.')}`
    } 
    if(s[0] == 'store'){
      s.shift();
      return `|s${s.join('.')}`
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
    if(v.charAt(1) == "t"){
      v = g_p_v(t, v.substring(2))
    }else
    if(v.charAt(1) == "s"){
      v = S.get({source: v.substring(2)})
    }
  }
  return v;
};
