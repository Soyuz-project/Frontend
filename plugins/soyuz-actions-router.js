/* 
  router actions 
*/
import { S } from '~/plugins/soyuz-store-api';

let router = {};
export default function(context) {
  router = context.app.router;
}

export const soyuzRouter = {
  routerPush(attrs) {
    router.push(attrs);
    return attrs;
  },
  routerQuery(attrs) {
    const t = Object.assign({}, this.getUrlQuery(), attrs);
    router.push({
      query: t,
    });
    return t;
  },
  routerDelQuery(attrs) {
    const q = this.getUrlQuery()
    Object.values(attrs).map((el) => {
      delete q[el];
    });
    router.push({
      query:q,
    });
  },
  getUrlQuery(){
    const p = new URLSearchParams(window.location.search);
    return Object.fromEntries(p); 
  }
};

export const storeRouter = (q) => {
  /* TODO - error if first init dont have q. Then get it form context */ 
  Object.keys(q).length === 0 ? null : S.set({ source:'router', value: q })  
}