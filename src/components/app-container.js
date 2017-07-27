/**
 * App Container.
 */

import React from 'react';
import { Container } from 'flux/utils';

import drinksStore from '../stores/drinks';
import { initDrinks, refreshDrinks } from '../actions/drinks';

import App from './app';

const REFRESH_TIMER_SECONDS = 30;

class AppContainer extends React.Component {
  static getStores() {
    return [drinksStore];
  }

  static calculateState() {
    return {
      drinks: drinksStore.getState(),
    };
  }

  constructor() {
    super();
    this.state = {
      ready: false,
    };
  }

  componentDidMount() {
    Promise.all([
      initDrinks(),
    ])
    .then(() => {
      this.setState({
        ready: true,
      });
    });

    setInterval(refreshDrinks, REFRESH_TIMER_SECONDS * 1000);
  }

  render() {
    return <App {...this.state} />
  }
}

export default Container.create(AppContainer);
