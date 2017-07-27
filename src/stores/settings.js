/**
 * stores/settings
 * flux reducer store for app settings
 */

import { ReduceStore } from 'flux/utils';

import dispatcher from '../dispatcher';

const INITIAL_STATE = {};

class SettingsStore extends ReduceStore {
  getInitialState() {
    return INITIAL_STATE;
  }

  reduce(state, action) {
    const { type, data } = action;

    switch (type) {
      case 'INIT_SETTINGS':
      case 'SAVE_SETTINGS':
        return {
          ...data,
        };

      default:
        return state;
    }
  }
}

export default new SettingsStore(dispatcher);
