import React from 'react';
import { Container } from 'flux/utils';

import { SPLASH, INTRO, SETTINGS, APP, READMORE } from '../stores/route';
import routeStore from '../stores/route';
import { initRouter } from '../actions/route';
import { initSettings } from '../actions/settings';

import AppContainer from './app-container';
import Splash from './splash';
import Intro from './intro';
import SettingsContainer from './settings-container';
import ReadMore from './read-more';


const routeMap = new Map();
routeMap.set(SPLASH, Splash);
routeMap.set(APP, AppContainer);
routeMap.set(INTRO, Intro);
routeMap.set(SETTINGS, SettingsContainer);
routeMap.set(READMORE, ReadMore);
routeMap.set(undefined, Intro);

class Router extends React.Component {

  static getStores() {
    return [routeStore];
  }

  static calculateState() {
    const { route } = routeStore.getState();
    return {
      route,
    };
  }

  componentWillMount() {
    initSettings();
    initRouter();
  }

  render() {
    const Component = routeMap.get(this.state.route);
    return (
      <div id="router">
        <Component />
      </div>
    );
  };
}

export default Container.create(Router);
