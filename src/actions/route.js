import dispatcher from '../dispatcher';

import { getSettings } from '../db';
import { APP, INTRO } from '../stores/route';

export function navigate(data) {
  return dispatcher.dispatch({
    type: 'NAVIGATE',
    data,
  });
}


// initialise the router by determining if the
// user needs to be shown the intro page or not.
export function initRouter() {
  getSettings().then(settings => {
    if (needsIntro(settings)) {
      return navigate(INTRO);
    }
    return navigate(APP);
  });
}

function needsIntro(settings) {
  return !settings.weight;
}
