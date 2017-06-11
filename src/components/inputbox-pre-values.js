import React from 'react';

export default class InputBoxPreValues extends React.Component {

  constructor() {
    super();
    this.state = {
      show: false,
    }
  }

  toggle = () => {
    this.setState({
      show: !this.state.show,
    });
  }

  // pass it up to the parent
  select = (evt) => {
    this.props.set(evt.target.value);
    this.setState({
      show: false,
    });
  }

  render() {
    const { show } = this.state;
    const { valuesMap } = this.props;

    const focusClass = show ? 'focus' : '';

    return (
      <div className={`input-box-pre-values ${focusClass}`}>
        <button
          className="btn-choose"
          onClick={this.toggle}
        >Standard sizes &raquo;</button>

        {show && (
          <div className="list">
            {Object.keys(valuesMap).map(label => {
              const value = valuesMap[label];

              return (
                <button
                  className="list-item"
                  key={label}
                  onClick={this.select}
                  value={value}
                >
                  {label} ({value}ml)
                </button>
              );
            })}
          </div>
        )}
      </div>
    );
  }
}
