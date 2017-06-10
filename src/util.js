/**
 * utils
 *
 * see: http://www.alcohol.gov.au/internet/alcohol/publishing.nsf/content/standard
 */

import { ETHANOL } from './constants';


// calculate volume from SD & ABV
export function calcVolume(sd, abv) {
  const result = abv * ETHANOL / sd;
  return Math.round(1 / result * 100) * 10;
}

// calculate SD from volume & ABV
export function calcSD(volume, abv) {
  const litres = volume / 100;
  const result = litres * abv * ETHANOL;
  return Math.round(result * 10) / 100;
}

// calculate ABV from SD and volume
// not sure what the use-case for this would be...
export function calcABV(sd, volume) {
  const result = volume * sd * ETHANOL;
  return result;
}

// detect 'standalone' web app mode in ios so we can alter
// click behaviour. Thanks a lot, Apple.
// https://stackoverflow.com/questions/39951945/ios-standalone-app-300ms-click-delay
export function isIosStandalone() {
  const isIos = /iPad|iPhone|iPod/.test(navigator.userAgent) && !window.MSStream;
  const isStandalone = window.navigator.standalone;
  return isIos && isStandalone;
}
