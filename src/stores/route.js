/**
 * store-as-a-router
 * router is in-memory, doesn't use urls. i dunno why.
 */

import { ReduceStore } from 'flux/utils';

import dispatcher from '../dispatcher';

// route constants
export const SPLASH = 'SPLASH';
export const INTRO = 'INTRO';
export const READMORE = 'READMORE';
export const SETTINGS = 'SETTINGS';
export const APP = 'APP';


const INITIAL_STATE = {
  route: SPLASH,
};

class RouteStore extends ReduceStore {
  getInitialState() {
    return INITIAL_STATE;
  }
  reduce(state, action) {
    const { type, data } = action;

    switch (type) {
      case 'NAVIGATE':
        return {
          route: data,
        };

      default:
        return state;
    }
  }
}

export default new RouteStore(dispatcher);
