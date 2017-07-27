import dispatcher from '../dispatcher';
import * as db from '../db';

export function initSettings() {
  return db.getSettings().then(data => dispatcher.dispatch({
    type: 'INIT_SETTINGS',
    data,
  }));
}

export function saveSettings(settings) {
  return db.saveSettings(settings).then(data => dispatcher.dispatch({
    type: 'SAVE_SETTINGS',
    data,
  }));
}
