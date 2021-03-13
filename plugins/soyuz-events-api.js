/*
  SOJUZ EVENTS API
*/
import { S, store } from '~/plugins/soyuz-store-api';

const MOCKUPMODE = true;

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
    output = S.get({ source: event.slug, query_variables: event.query_variables });

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


