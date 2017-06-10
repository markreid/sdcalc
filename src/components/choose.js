import React from 'react';

import { SD, VOLUME } from '../constants';

export default (props) => {
  return (
    <div className="choose">
      <h1>I want to know...</h1>

      <button onClick={() => props.setActiveView(SD)}>
        How many <b>Standard Drinks</b>
      </button>

      <button onClick={() => props.setActiveView(VOLUME)}>
        How much <b>Volume</b>
      </button>
    </div>
  );
}
