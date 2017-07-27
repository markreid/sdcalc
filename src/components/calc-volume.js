/**
 * Volume
 * Given SD and ABV, calculate volume.
 * "How many mls of a 5% beer makes 1 standard drink"
 */

import React from 'react';

import { calcVolume } from '../util';
import { addDrink } from '../actions/drinks';

import InputBox from './inputbox';

class Volume extends React.Component {

  constructor() {
    super();
    this.state = {
      sd: '1',
      abv: '',
      volume: '',
    };
  }

  setValue = (name, value) => {
    const values = {
      ...this.state,
      [name]: value,
    };

    if (values.sd && values.abv) {
      values.volume = calcVolume(Number(values.sd), Number(values.abv));
    }

    this.setState({
      ...values,
    });
  }

  addDrink = () => {
    const { sd, abv, volume } = this.state;
    addDrink({
      sd,
      abv,
      volume,
    });
  }

  render() {
    const { sd, abv, volume } = this.state;

    return (
      <div className="view calc-volume">
        <div className="calc-form">

          <InputBox
            label="Standard Drinks"
            name="sd"
            value={sd}
            set={this.setValue}
          />

          <InputBox
            label="ABV %"
            name="abv"
            value={abv}
            set={this.setValue}
          />

          <div className="input-box locked">
            <p className="label">Volume (ml)</p>
            <div className="input">{volume}</div>
          </div>

          {sd && <button className="btn" onClick={this.addDrink}>Drink this</button>}

        </div>

      </div>
    );
  }

}

export default Volume;
