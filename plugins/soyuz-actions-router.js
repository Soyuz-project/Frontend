/* 
  router actions 
*/
let router = {};
export default function(context) {
  router = context.app.router;
  console.log('router access', router)
}

export const soyuzRouter = {
  routerPush(attrs) {
    router.push(attrs);
  },
  routerQuery(attrs) {
    router.push({
      query: Object.assign({}, this.getUrlQuery(), attrs),
    });
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
  routerRefreshEdit(attrs = {}) {
    refreshBlockPaths();
    // const stamp = Math.floor(Math.random() * 10000);
    // router.replace({
    //   force: true,
    //   query: query,
    // });
  },
  getUrlQuery(){
    const urlParams = new URLSearchParams(window.location.search);
    return Object.fromEntries(urlParams); 
  }
};