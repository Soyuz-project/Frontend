/*
  SOJUZ EVENTS API
  original size: 227b / gzipped size: 170b
*/
import { S, g_p_v, store } from '~/plugins/soyuz-store-api';

const MOCKUPMODE = true;
let route = {};

export default function(context) {
  route = { query: context.query, params: context.params };
}
export const runEvent = (event) => {
  return event.method == 'READ' ? eventREAD(event) : eventWRITE(event);
};
const eventREAD = (event) => {
  let output;
  /* MOCKUPMODE update store from localStorage if exist*/
  if (MOCKUPMODE) {
    try {
      const localData = JSON.parse(window.localStorage.getItem(`sojuz_${event.slug}`));
      S.set({ source: event.slug, value: localData });
    } catch (error) {}
    output = S.get({ source: event.slug, query_variables: w(event.query_variables, '') });

    return output;
  } else {
    // RUN RESOLVER
    // default GQL query
  }
};
const eventWRITE = (event) => {
  console.log('WRITE');
};

/* 
  HELPERS 
*/

/* walker */
export const w = (o, d) =>
  Object.entries(o).reduce((acc, [k, v]) => {
    if (v && typeof v === 'object') acc[k] = w(v, d);
    else acc[k] = replace(k, g_p_v(d, v)) || replace(k, v);
    return acc;
  }, {});

/* replacer */
export const replace = (k, v) => {
  const split = v.split('.');
  // if (split[0] == "^blockAttrs") {
  //   split.shift();
  //   v = g_p_v(targetAttrs, split.join('.'))
  // }
  // if (split[0] == "^action") {
  //   split.shift();
  //   v = g_p_v(actionsOutput, split.join('.'))
  // }
  // if (split[0] == "^store") {
  //   split.shift();
  //   v = S.getDeep({ nq: split[0], path: split[1] })
  // }
  if (split[0] == '^router') {
    split.shift();
    return route[split[0]][split[1]];
  }
  return v;
};
