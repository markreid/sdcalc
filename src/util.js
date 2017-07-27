/**
 * utils
 *
 * see: http://www.alcohol.gov.au/internet/alcohol/publishing.nsf/content/standard
 */

import { ETHANOL } from './constants';


// calculate volume from Australian SD & ABV
export function calcVolume(sd, abv) {
  const result = abv * ETHANOL / sd;
  return Math.round(1 / result * 100) * 10;
}

// calculate Australian SD from volume & ABV
export function calcSD(volume, abv) {
  const litres = volume / 100;
  const result = litres * abv * ETHANOL;
  return Math.round(result * 10) / 100;
}

// detect 'standalone' web app mode in ios so we can alter
// click behaviour. Thanks a lot, Apple.
// https://stackoverflow.com/questions/39951945/ios-standalone-app-300ms-click-delay
export function isIosStandalone() {
  const isIos = /iPad|iPhone|iPod/.test(navigator.userAgent) && !window.MSStream;
  const isStandalone = window.navigator.standalone;
  return isIos && isStandalone;
}

// tally the SDs in a drinks array
export function totalSD(drinks) {
  return drinks.reduce((acc, drink) => {
    return acc += (drink.sd || 0);
  }, 0);
}


// Adapted from Ho et al (2001).
// Assumes an average height of 162.5cm
// Formula calculates for Canadian SD (13.6g), so we convert to Australian (10g) first.
export function calcMetaboliseTime(sd, kg) {
  const auSD = sd / 1.36; // Ho calculates for Canadian SD (13.6g)
  const minutes = auSD * (-69.685 * Math.log(kg) + 428.34);
  return minutes;
}

// milliseconds until a future timestamp,
// 0 if it's now or in the past.
export function diffMS(timestamp) {
  const now = new Date().valueOf();
  return Math.max(timestamp - now, 0);
}

export function untilNumbers(timestamp, readyString = 'Done.') {
  const diff = diffMS(timestamp);
  if (diff === 0) return readyString;

  const diffMinutes = Math.round(diff / 1000 / 60);
  const hours = Math.floor(diffMinutes / 60);
  const minutes = ('0' + diffMinutes % 60).slice(-2);

  return `${hours}:${minutes} remaining`;
}

// returns a human-readable "x hours, y minutes" from now
// until a future timestamp
export function untilString(timestamp, readyString = 'Done.') {
  const diff = diffMS(timestamp);
  if (diff === 0) return readyString;

  const diffMinutes = Math.round(diff / 1000 / 60);
  const hours = Math.floor(diffMinutes / 60);
  const minutes = diffMinutes % 60;
  const sentence = [];
  if (hours) sentence.push(`${hours} hour${hours === 1 ? '' : 's'}`);
  if (minutes) sentence.push(`${minutes} minute${minutes === 1 ? '' : 's'}`);
  return sentence.join(', ');
}

// add a delay to a promise chain
export function wait(delay = 1500) {
  return (value) => {
    return new Promise((resolve) => {
      setTimeout(() => resolve(value), delay);
    });
  };
}

// no-op
export const noop = () => {};


/**
 * create a bound function that returns the next element in an array,
 * looping to the start when you hit the final element.
 * @param  {Array} arr
 * @param  {Number} firstIndex  first element index to return
 * @return {Function}
 */
export function getNextElement(arr, firstIndex = 0) {
  let index = firstIndex - 1;
  return () => {
    index = index + 1;
    if (index >= arr.length) index = 0;
    return arr[index];
  }
}
