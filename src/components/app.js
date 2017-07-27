import React, { Component } from 'react';
import reactFastClick from 'react-fastclick';
import SettingsIcon from 'react-icons/lib/io/gear-a';

import { isIosStandalone } from '../util';
import { SETTINGS } from '../stores/route';
import { navigate } from '../actions/route';

import Calculator from './calculator';
import Drinks from './drinks';
import DrinksEmpty from './drinks-empty';
import DrinksSummary from './drinks-summary';

// fix clicks on ios
if (isIosStandalone()) {
  reactFastClick();
}

const SIDEBAR_CLASS_MAP = new Map();
SIDEBAR_CLASS_MAP.set(-1, 'left');
SIDEBAR_CLASS_MAP.set(0, '',);
SIDEBAR_CLASS_MAP.set(1, 'right');


class App extends Component {

  constructor() {
    super();
    this.state = {
      sidebar: 0,
    };
  }

  sidebarRight = () => {
    const { sidebar } = this.state;
    this.setState({
      sidebar: sidebar === 1 ? 0 : 1,
    });
  }

  sidebarLeft = () => {
    const { sidebar } = this.state;
    this.setState({
      sidebar: sidebar === -1 ? 0 : -1,
    });
  }

  render() {

    const { drinks } = this.props;
    const { sidebar } = this.state;

    return (
      <div className="App">
        <header>
          <DrinksSummary onClick={this.sidebarRight} {...drinks} />
          <button onClick={() => navigate(SETTINGS)}><SettingsIcon size={24} /></button>
        </header>

        <div className={`sidebar-wrapper ${SIDEBAR_CLASS_MAP.get(sidebar)}`}>
          <div className="left"></div>

          <div className="content">
            <Calculator showDrinksView={this.sidebarRight} />
          </div>
          <div className="right">
            {drinks.drinks.length ? <Drinks {...drinks} /> : <DrinksEmpty showCalcView={this.sidebarRight} />}
          </div>
        </div>
      </div>
    );
  }
}

export default App;
