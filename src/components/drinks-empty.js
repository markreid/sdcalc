import React from 'react';

export default (props) => (
  <div className="view drinks empty">
    <p>You haven't had any drinks.</p>
    <p>
      <button className="btn" onClick={props.showCalcView}>Add one</button>
    </p>
  </div>
);
