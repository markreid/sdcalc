import React from 'react';
import moment from 'moment';

import { clearDrinks } from '../actions/drinks';
import { untilString, diffMS } from '../util';

import Drink from './drink';

export default (props) => {

  const { drinks, startTimestamp, finishTimestamp } = props;

  const sd = Math.ceil(props.sd * 10) / 10;
  const first = moment(startTimestamp).format('h:mm a');
  const feedTime = moment(finishTimestamp).format('h:mm a');
  const until = diffMS(finishTimestamp);
  const untilSentence = untilString(finishTimestamp);


  return (
    <div className="view drinks">
      <p className="sentence">You've had <span><b>{sd}</b> standard drinks</span> since <b>{first}</b>.</p>
      {until ? (
        <p className="sentence">You can feed at <span><b>{feedTime}</b></span>, in <span><b>{untilSentence}</b></span>.</p>
      ) : (
        <p className="sentence">It's now safe for you to breastfeed.</p>
      )}


      <h4>Your drinks:</h4>
      <div className="drinks-list">
        {drinks.map(drink => <Drink key={drink.timestamp} {...drink} />)}
      </div>

      <p>
        <button className="btn" onClick={clearDrinks}>Clear All</button>
      </p>
    </div>
  );
};
