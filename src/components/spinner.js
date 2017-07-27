import React from 'react';
import { defaultProps } from 'recompose';

import Icon from 'react-icons/lib/io/load-d';

const withDefaults = defaultProps({
  size: 24,
  color: null,
});

export default withDefaults((props) => (
  <div className="spinner"><Icon {...props} /></div>
));
