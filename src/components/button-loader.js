import React from 'react';
import { defaultProps } from 'recompose';

import { noop } from '../util';
import Spinner from './spinner';



const withDefaults = defaultProps({
  className: 'btn',
  onClick: () => {},
  loading: false,
});

export default withDefaults((props) => {
  const { loading, children, className, onClick } = props;
  return (
    <button className={`button-loader ${className} ${loading ? 'loading' : ''}`} onClick={loading ? noop : onClick} disabled={loading}>
      <div className="wrapper">
        <Spinner />
        <span className="button-loader-children">
          {children}
        </span>
      </div>
    </button>
  );
});
