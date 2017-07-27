import React from 'react';
import moment from 'moment';

import { removeDrink, addDrink } from '../actions/drinks';

class Drink extends React.Component {

  constructor() {
    super();
    this.state = {
      showActions: false,
    };
  }

  toggleActions = () => {
    this.setState({
      showActions: !this.state.showActions,
    });
  }

  remove = () => {
    removeDrink(this.props.timestamp);
  }

  drinkAnother = () => {
    const { sd, abv, volume } = this.props;
    addDrink({
      sd,
      abv,
      volume,
    });
  }

  render() {
    const { sd, abv, volume, timestamp, completionPercentage } = this.props;
    const { showActions } = this.state;

    const gradient = `linear-gradient(to right, #93d0ff 0%,#93d0ff ${completionPercentage}%, var(--skyBlue) ${completionPercentage}%, var(--skyBlue) 100%)`

    return (
      <div className="drink" style={ {background: gradient} }>
        <div className="meta" onClick={this.toggleActions}>
          <div className="timestamp">
            {moment(timestamp).format('h:mm a')}
          </div>
          <div className="vol-abv">
            {!!volume && !!abv && (
              <p>
                <b>{volume}ml</b> x <b>{abv}%</b>
              </p>
            )}
          </div>
          <div className="sd">
            <b>{sd}</b>
          </div>
        </div>
        {showActions && (
          <div className="actions">
            { false && <button className="btn">Edit</button> }
            <button className="btn" onClick={this.drinkAnother}>Drink another</button>
            <button className="btn" onClick={this.remove}>Remove</button>
          </div>
        )}
      </div>
    );
  }

}

export default Drink;
