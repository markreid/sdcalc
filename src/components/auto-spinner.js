/**
 * AutoSpinner
 * HOC that displays a spinner until props.ready is true
 */

import { branch, renderComponent } from 'recompose';

import Splash from './splash';

const autoSpinner = isReady => branch(
  isReady,
  renderComponent(Splash),
  self => self
);

export default autoSpinner(props => !props.ready);
