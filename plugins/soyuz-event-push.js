const eventPUSH = (event) => {
  /* 
    MOCKUPMODE update store from localStorage if exist
  */
  if (MOCKUPMODE) {
    try {
      const res = runActions(event)
      S.push({source:event.source, value: Object.assign({},res[res.length-1][0]) } )
      return res
    } catch (error) {
        S.set({ source: 'message', value: {message: `event error:${err}`, type:'error'}})
    }
  }
};