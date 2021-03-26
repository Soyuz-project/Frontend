/* 
  router actions 
*/
import { S } from '~/plugins/soyuz-store-api';

let router = {};
export default function(context) {
  router = context.app.router;
}

export const soyuzRouter = {
  routerPush(atr) {
    router.push(atr);
    return atr;
  },
  routerQuery(atr) {
    const t = Object.assign({}, getUrlQuery(), atr);
    router.push({
      query: t,
    });
    return t;
  },
  routerDelQuery(atr) {
    const q = getUrlQuery()
    Object.values(atr).map((el) => {
      delete q[el];
    });
    router.push({
      query:q,
    });
  },
  
};

const getUrlQuery = () => {
  const p = new URLSearchParams(window.location.search);
  return Object.fromEntries(p); 
}

export const storeRouter = (q) => {
  /* TODO - error if first init dont have q. Then get it form context */ 
  Object.keys(q).length === 0 ? null : S.set({ source:'router', value: q })  
}