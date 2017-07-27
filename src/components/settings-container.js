import React from 'react';
import { Container } from 'flux/utils';

import settingsStore from '../stores/settings';
import { initSettings } from '../actions/settings';

import autoSpinner from './auto-spinner';
import Settings from './settings';

const SettingsSpinner = autoSpinner(Settings);

class SettingsContainer extends React.Component {
  static getStores() {
    return [settingsStore];
  }

  static calculateState() {
    return {
      settings: settingsStore.getState(),
    };
  }

  constructor() {
    super();
    this.state = {
      ready: false,
    };
  }

  render() {
    return <SettingsSpinner {...this.state} />;
  }

  componentWillMount() {
    initSettings()
    .then(() => this.setState({
      ready: true,
    }));
  }
}

export default Container.create(SettingsContainer);
