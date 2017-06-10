import React from 'react';

import KeyPad from './keypad';

class InputBox extends React.Component {

  constructor() {
    super();
    this.state = {
      keypadVisible: false,
    };
  }

  toggleKeypad = () => {
    this.setState({
      keypadVisible: !this.state.keypadVisible,
    });
  }

  set = (value) => {
    this.props.set(this.props.name, value);
  }

  render() {

    const { label, value } = this.props;
    const { keypadVisible } = this.state;

    const focusClass = keypadVisible ? 'focus' : '';

    return (
      <div className={`input-box ${focusClass}`}>
        <p
          className="label"
          onClick={this.toggleKeypad}
        >{label}</p>
        <div
          className={`input ${focusClass}`}
          onClick={this.toggleKeypad}
        >{value}</div>
        {keypadVisible && (
          <KeyPad set={this.set} value={value} done={this.toggleKeypad} />
        )}
      </div>
    );
  }
}

export default InputBox;
