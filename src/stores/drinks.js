/**
 * stores/drinks
 * flux reducer store for the drink tracker
 */

import { ReduceStore } from 'flux/utils';

import settingsStore from './settings';

import dispatcher from '../dispatcher';
import { totalSD, calcMetaboliseTime } from '../util';


export function calcMetadata(drinks) {
  const sd = totalSD(drinks);
  const numDrinks = drinks.length;
  const startTimestamp = numDrinks ? drinks[0].timestamp : null;
  const finishTimestamp = numDrinks ? drinks[numDrinks - 1].finishMetabolising : null;
  return {
    sd,
    startTimestamp,
    finishTimestamp,
  };
}

export function processDrinks(drinks) {
  let weight = 0;
  try {
    weight = settingsStore.getState().weight;
  } catch (error) {
    if (error instanceof TypeError) {
      throw new Error('Unable to fetch weight from settings');
    }
    throw error;
  }

  let previousFinishMetabolising = 0;

  return drinks.map((drink, i) => {
    // how many minutes will it take to metabolise this drink
    const minutesToMetabolise = calcMetaboliseTime(drink.sd, weight);
    // we'll start metabolising either when the last one finished, or when we started this
    // whatever happens LAST.
    const startMetabolising = Math.max(previousFinishMetabolising, drink.timestamp);
    // therefore we'll finish metabolising it...
    const finishMetabolising = startMetabolising + (minutesToMetabolise * 1000 * 60);
    // which means we've *been* metabolising it for...
    const minutesMetabolised = Math.max(0, (new Date().valueOf() - startMetabolising) / 1000 / 60);
    const completionPercentage = Math.min(100, (minutesMetabolised / minutesToMetabolise) * 100);

    previousFinishMetabolising = finishMetabolising;

    return Object.assign({}, drink, {
      completionPercentage: completionPercentage,
      finishMetabolising,
    });
  });
}


const INITIAL_STATE = {
  drinks: [],
  sd: 0,
  startTimestamp: null,
  finishTimestamp: null,
};

class DrinkStore extends ReduceStore {
  getInitialState() {
    return INITIAL_STATE;
  }

  reduce(state, action) {
    const { type, data } = action;

    switch (type) {

      case 'INIT_DRINKS':
      case 'ADD_DRINK':
      case 'REMOVE_DRINK': {
        const drinks = processDrinks(data);
        const { sd, startTimestamp, finishTimestamp } = calcMetadata(drinks);
        return {
          drinks,
          sd,
          startTimestamp,
          finishTimestamp,
        };
      }

      case 'REFRESH_DRINKS': {
        const drinks = processDrinks(state.drinks);
        const { sd, startTimestamp, finishTimestamp } = calcMetadata(drinks);
        return {
          drinks,
          sd,
          startTimestamp,
          finishTimestamp,
        };

      }

      case 'CLEAR_DRINKS':
        return INITIAL_STATE;

      default:
        return state;
    }
  }
}

export default new DrinkStore(dispatcher);
