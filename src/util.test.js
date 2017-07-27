/**
 * util.test.js
 * unit tests for util.js
 */

import * as util from './util';

describe('getNextElement()', () => {
  it('fetches the next element in the array and loops', () => {
    const array = [1, 2, 3];
    const getNext = util.getNextElement(array);
    expect(getNext()).toBe(1);
    expect(getNext()).toBe(2);
    expect(getNext()).toBe(3);
    expect(getNext()).toBe(1);
  });

  it('accepts a firstIndex argument', () => {
    const array = [1, 2, 3];
    const getNext = util.getNextElement(array, 1);
    expect(getNext()).toBe(2);
  });
});

describe('noop()', () => {
  it('does nothing', () => {
    util.noop();
  });
});

describe('diffMS()', () => {
  it('returns the number of ms to a timestamp in the future', () => {
    const future = Date.now() + 1000;
    expect(util.diffMS(future)).toBeGreaterThan(0);
  });

  it('returns 0 for a timestamp already passed', () => {
    const past = Date.now() - 1000;
    expect(util.diffMS(past)).toBe(0);
  });
});

describe('totalSD()', () => {
  it('tallies the .sd values from objects in an array, ignoring undefined', () => {
    const drinks = [{
      sd: 1,
    }, {
      sd: 2,
    }, {
      sd: 3,
    }, {
      foo: 'bar', // sd undefined
    }];
    expect(util.totalSD(drinks)).toBe(6);
  });
})
