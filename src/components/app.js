import React, { Component } from 'react';
import reactFastClick from 'react-fastclick';

import { SD, VOLUME } from '../constants';
import { isIosStandalone } from '../util';

import Volume from './volume';
import StandardDrinks from './sd';
import Choose from './choose';


const viewMap = new Map();
viewMap.set(SD, StandardDrinks);
viewMap.set(VOLUME, Volume);
viewMap.set(null, Choose);


if (isIosStandalone()) {
  reactFastClick();
}

class App extends Component {

  constructor() {
    super();
    this.state = {
      activeView: SD,
    };
  }

  setActiveView = (activeView) => {
    this.setState({
      activeView,
    });
  }

  render() {

    const ActiveViewComponent = viewMap.get(this.state.activeView);

    return (
      <div className="App">
        <ActiveViewComponent setActiveView={this.setActiveView} />
      </div>
    );
  }
}

export default App;
