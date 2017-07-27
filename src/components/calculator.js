/**
 * Calculator component.
 * Wrap the three calculator modes into a single view and let
 * the user switch between them.
 *
 */

import React from 'react';
import SwitchIcon from 'react-icons/lib/io/loop';

import { getNextElement } from '../util';

import CalcVolume from './calc-volume';
import CalcStandardDrinks from './calc-standard-drinks';
import EnterStandardDrinks from './enter-standard-drinks';



const CHILD_VIEWS = [{
  title: 'Enter Standard Drinks',
  view: EnterStandardDrinks,
}, {
  title: 'Calculate Standard Drinks',
  view: CalcStandardDrinks,
}, {
  title: 'Calculate Volume',
  view: CalcVolume,
}];

const getNextView = getNextElement(CHILD_VIEWS);


class Calculator extends React.Component {
  constructor() {
    super();
    this.state = {
      activeView: getNextView(),
    };
  }

  nextActiveView = () => {
    this.setState({
      activeView: getNextView(),
    });
  }

  render() {
    const { activeView } = this.state;
    const View = activeView.view;

    return (
      <div className="view calculator">
        <header className="view--title">
          <h4 className="calculator--title">{ activeView.title }</h4>
          <button className="calculator--btn-switch" onClick={this.nextActiveView}>Change mode <SwitchIcon /></button>
        </header>
        <View />
      </div>
    );
  }
}

export default Calculator;
