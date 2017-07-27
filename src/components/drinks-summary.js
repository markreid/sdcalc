import React from 'react';
import moment from 'moment';

import { untilNumbers } from '../util';

export default (props) => {
  const { finishTimestamp } = props;
  const time = moment(finishTimestamp).format('h:mm a');
  return (
    <div className="drinks-summary">
      <button onClick={props.onClick}>
        {!!finishTimestamp && (
          <p>{untilNumbers(finishTimestamp)} ({time})</p>
        )}
      </button>
    </div>
  );
}
