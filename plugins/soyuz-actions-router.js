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
    const target = Object.assign({}, this.getUrlQuery(), attrs);
    router.push({
      query: target,
    });
    return target;
  },
  routerDelQuery(attrs) {
    const params = this.getUrlQuery()
    Object.values(attrs).map((el) => {
      delete params[el];
    });
    router.push({
      query:params,
    });
  },
  getUrlQuery(){
    const urlParams = new URLSearchParams(window.location.search);
    return Object.fromEntries(urlParams); 
  }
};

export const InitialStoreRouter = (urlQuery) => {
  /* TODO - error if first init dont have urlQuery. Then get it form context */ 
  Object.keys(urlQuery).length === 0 ? null : S.set({ source:'router', value: urlQuery })  
}