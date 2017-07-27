/**
 * EnterSD
 * Manually enter standard drinks.
 */

import React from 'react';

import { addDrink } from '../actions/drinks';

import InputBox from './inputbox';

class Volume extends React.Component {

  constructor() {
    super();
    this.state = {
      sd: '1',
    };
  }

  setValue = (name, value) => {
    const values = {
      ...this.state,
      [name]: value,
    };

    this.setState({
      ...values,
    });
  }

  addDrink = () => {
    const { sd  } = this.state;
    addDrink({
      sd,
    });
  }

  render() {
    const { sd } = this.state;

    return (
      <div className="view calc-volume">
        <div className="calc-form">
          <InputBox
            label="Standard Drinks"
            name="sd"
            value={sd}
            set={this.setValue}
          />

          {sd && <button className="btn" onClick={this.addDrink}>Drink this</button>}

        </div>

      </div>
    );
  }

}

export default Volume;
