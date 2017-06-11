/**
 * KeyPad
 */

import React from 'react';

const KeypadButton = (props) => (
  <div className="keypad-button"
    onClick={() => props.onClick(props.value)}
  >
    {props.value}
  </div>
)

const numberKeys = '123456789'.split('');


class KeyPad extends React.Component {

  componentWillMount() {
    window.addEventListener('keyup', this.keyHandler);
  }

  componentWillUnmount() {
    window.removeEventListener('keyup', this.keyHandler);
  }

  constructor() {
    super();
    this.state = {
      value: '',
    };
  }

  setValue = (value) => this.props.set(value)

  keyHandler = (evt) => {
    switch (evt.key) {
      case '.':
        return this.point();

      case 'Backspace':
        return this.backspace();

      case '0':
        return this.zero();

      case 'Enter':
        return this.props.done();

      default:
        break;
    }

    if ('123456789'.includes(evt.key)) {
      return this.append(evt.key);
    }
  }

  backspace = () => {
    const { value } = this.props;
    this.setValue(value.slice(0, -1));
  }

  append = (val) => {
    const { value } = this.props;
    this.setValue(`${value}${val}`);
  }

  zero = () => {
    const { value } = this.props;
    this.setValue((value === '0') ? value : `${value}0`);
  }

  point = () => {
    const { value } = this.props;
    if (value === '') {
      this.setValue('0.');
    } else {
      this.setValue(value.includes('.') ? value : `${value}.`);
    }
  }

  render() {
    return (
      <div className="keypad">
        {numberKeys.map(key => (
          <KeypadButton key={key} value={key} onClick={this.append} />
        ))}
        <KeypadButton key="0" value="0" onClick={this.zero} />
        <KeypadButton key="." value="." onClick={this.point} />
        <KeypadButton key="x" value="x" onClick={this.backspace} />
        <div className="keypad-button" onClick={this.props.done}>OK</div>
      </div>
    );
  }
}

export default KeyPad;
