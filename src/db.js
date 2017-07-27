import localForage from 'localforage';
window.localForage = localForage;

const DEFAULT_SETTINGS = {
  weight: '',
};


/**
 * Fetch drinks array from storage
 * @return {Promise.Array}
 */
export function getDrinks() {
  return localForage.getItem('drinks')
  .then(drinks => {
    return drinks || [];
  });
}

/**
 * Add a drink to storage.
 * Returns drinks array.
 * @param {Number} sd
 * @return {Promise.Array}  drinks array
 */
export function addDrink(drink) {
  return getDrinks()
  .then(dbDrinks => {
    const sd = Number(drink.sd) || null;
    const abv = Number(drink.abv) || null;
    const volume = Number(drink.volume) || null;
    const drinks = [...dbDrinks, {
      timestamp: new Date().valueOf(),
      sd,
      abv,
      volume,
    }];
    return localForage.setItem('drinks', drinks);
  });
};


/**
 * Remove a single drink by timestamp
 * @param  {Number} timestamp
 * @return {Promise}
 */
export function removeDrink(timestamp) {
  return getDrinks()
  .then(drinks => drinks.filter(drink => drink.timestamp !== timestamp))
  .then(drinks => localForage.setItem('drinks', drinks));
}


/**
 * Remove all drinks
 * @return {Promise}
 */
export function clearDrinks() {
  return localForage.setItem('drinks', []);
}


/**
 * Fetch the settings. Use defaults for anything
 * that hasn't been set yet.
 * @return {Promise.Object}
 */
export function getSettings() {
  return localForage.getItem('settings')
  .then(settings => {
    return {
      ...DEFAULT_SETTINGS,
      ...settings,
    };
  });
}

/**
 * Update the settings
 * @param  {Object} settings
 * @return {Promise.Object}
 */
export function saveSettings(settings) {
  // VALIDATE
  return localForage.setItem('settings', settings);
}

// reset the db
export function resetApp() {
  return localForage.clear().then(() => window.location = window.location);
}
