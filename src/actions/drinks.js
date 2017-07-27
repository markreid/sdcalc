/**
 * actions/drinks
 */

import dispatcher from '../dispatcher';
import * as db from '../db';

export function addDrink(drink) {
  return db.addDrink(drink).then(data => dispatcher.dispatch({
    type: 'ADD_DRINK',
    data,
  }));
}

export function initDrinks() {
  return db.getDrinks().then(data => dispatcher.dispatch({
    type: 'INIT_DRINKS',
    data,
  }));
}

export function clearDrinks() {
  return db.clearDrinks().then(data => dispatcher.dispatch({
    type: 'CLEAR_DRINKS',
  }));
}

export function removeDrink(timestamp) {
  return db.removeDrink(timestamp).then(data => dispatcher.dispatch({
    type: 'REMOVE_DRINK',
    data,
  }));
}

export function refreshDrinks() {
  return dispatcher.dispatch({
    type: 'REFRESH_DRINKS',
  });
}
