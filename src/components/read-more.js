import React from 'react';

import { navigate } from '../actions/route';
import { INTRO } from '../stores/route';

export default (props) => (
  <div className="view readmore">
    <h1>References</h1>
    <ul className="references">
      <li>GIGLIA, R. and BINNS, C. (2006), Alcohol and lactation: A systematic review. Nutrition & Dietetics, 63: 103–116. doi:10.1111/j.1747-0080.2006.00056.x</li>
      <li>Ho E, Collantes A, Kapur B, Moretti M, Koren G. Alcohol and breast feeding: calculation of time to zero level in milk. Biol Neonate 2001; 80: 219–22.</li>
      <li>
        <a
          rel="noopener noreferrer"
          target="_blank"
          href="https://www.breastfeeding.asn.au/sites/default/files/imce/ABA_Alchohol_BF%20for%20website.pdf"
        >https://www.breastfeeding.asn.au/sites/default/files/imce/ABA_Alchohol_BF%20for%20website.pdf</a></li>
    </ul>
    <p>
      <button className="btn" onClick={() => navigate(INTRO)}>Back</button>
    </p>
  </div>
);
