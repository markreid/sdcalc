/**
 * SD
 * Given ABV and volume, calculate standard drinks.
 */

import React from 'react';

import { calcSD } from '../util';
import { VOLUME } from '../constants';

import InputBox from './inputbox';

const COMMON_VOLUMES_MAP = {
  pot: '285',
  schooie: '425',
  pint: '570',
  tinnie: '375',
  'euro stubby': '330',
  longie: '750',
  'glass of wine': '150',
  'bottle of wine': '750',
};


class SD extends React.Component {

  constructor() {
    super();
    this.state = {
      sd: '',
      abv: '',
      volume: '',
    };
  }

  setValue = (name, value) => {
    const values = {
      ...this.state,
      [name]: value,
    };

    if (values.volume && values.abv) {
      values.sd = calcSD(Number(values.volume), Number(values.abv));
    }

    this.setState({
      ...values,
    });
  }

  resetActiveView = () => {
    this.props.setActiveView(null);
  }

  switchToVolume = () => {
    this.props.setActiveView(VOLUME);
  }

  render() {
    const { sd, abv, volume } = this.state;

    return (
      <div className="calc-volume">
        <h4 onClick={this.switchToVolume}>Calculate Standard Drinks</h4>

        <div className="calc-form">

          <InputBox
            label="ABV %"
            name="abv"
            value={abv}
            set={this.setValue}
          />

          <InputBox
            label="Volume (ml)"
            name="volume"
            value={volume}
            set={this.setValue}
            valuesMap={COMMON_VOLUMES_MAP}
          />

          <div className="input-box locked">
            <p className="label">Standard Drinks</p>
            <div className="input">{sd}</div>
          </div>

        </div>

      </div>
    );
  }

}

export default SD;
