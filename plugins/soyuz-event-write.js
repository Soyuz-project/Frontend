import { MOCKUPMODE } from '~/plugins/soyuz-events-api'
import { runActions } from '~/plugins/soyuz-actions-api'
export const eventWRITE = (event) => {
  /* 
    MOCKUPMODE update store from localStorage if exist
  */
  if (MOCKUPMODE) {
  	runActions(event)
  }
};