import React from 'react';

import { navigate } from '../actions/route';
import { SETTINGS, READMORE } from '../stores/route';

export default (props) => (
  <div className="intro view">
    <h1>Calculon</h1>

    <p>Calculon keeps track of how many drinks you've had and when it's safe for you to breastfeed.</p>

    <p>Calculon uses <b>Australian Standard Drinks</b> and its calculations are based on studies by Ho et al (2001) and Giglia & Binns (2006).</p>
    <p>For more information, <b><a onClick={() => navigate(READMORE)}>see here.</a></b></p>


    <p><button className="btn" onClick={() => navigate(SETTINGS)}>Let's get started</button></p>
  </div>
);
