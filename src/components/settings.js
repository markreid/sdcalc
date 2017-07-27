import React from 'react';

import { saveSettings } from '../actions/settings';
import { navigate } from '../actions/route';
import { APP } from '../stores/route';
import { resetApp } from '../db';

import InputBox from './inputbox';
import ButtonLoader from './button-loader';

class Settings extends React.Component {

  constructor(props) {
    super();
    const { settings } = props;
    this.state = {
      settings,
      saving: false,
    };
  }

  // update a value in the settings object
  setValue = (name, value) => {
    const values = {
      ...this.state.settings,
      [name]: value,
    };
    this.setState({
      settings: values,
    });
  }

  // save to db
  save = () => {
    const { settings } = this.state;
    this.setState({
      saving: true,
    });
    saveSettings(settings)
    .then(() => {
      navigate(APP);
    })
    .catch(err => console.error(err));
  }

  render() {
    const { weight } = this.state.settings;
    const { saving, saved } = this.state;

    return (
      <div className="view settings">
        <h1>Settings</h1>

        <div className="calc-form">

          <InputBox
            label="Your Weight (kg)"
            name="weight"
            value={String(weight)}
            set={this.setValue}
          />

          { !saved ?
            <p>
              <ButtonLoader onClick={this.save} loading={saving}>Save</ButtonLoader>
            </p>
            :
            <p className="success-notice">Settings have been saved.</p>
          }

          <p>
            <button onClick={resetApp}>Reset App</button>
          </p>
        </div>


      </div>
    );
  }
}

export default Settings;
