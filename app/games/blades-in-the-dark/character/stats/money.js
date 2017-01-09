'use strict'

import React from 'react';
import cx from 'classnames';

import { Checkbox, CheckboxArray } from './checkbox.js';

import './money.scss';

const StashRow = (props) => {
  const {
    value, increment,
    decrement, highlight,
    checkedProps, uncheckedProps
  } = props;
  const checked = value >= 10;
  const className = cx(
    'end', {
      'hover': (
        (checked && (value + highlight < 10)) ||
        (!checked && (value + highlight >= 10))
      ) ,
    }
  )
  const checkboxProps = checked ? checkedProps : uncheckedProps
  return (
    <div className='row'>
      <CheckboxArray value={value}
                     max={9}
                     className='start'
                     increment={increment}
                     decrement={decrement}
                     highlight={highlight}
                     checkedProps={checkedProps}
                     uncheckedProps={uncheckedProps}/>
      <Checkbox checked={checked}
                className={className}
                onClick={checked ? decrement : increment}
                {...checkboxProps}/>
    </div>
  );
}

StashRow.propTypes = {
  value: React.PropTypes.number.isRequired
}

const HOVER = {
  INCREMENT_COIN: 0,
  DECREMENT_COIN: 1,
  INCREMENT_STASH: 2,
  DECREMENT_STASH: 3,
  EXCHANGE_TO_COIN: 4,
  EXCHANGE_TO_STASH: 5
}

class Money extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      hover: null
    };
  }
  incrementCoin() {
    const { coin, update } = this.props;
    update({coin: coin + 1});
  }
  decrementCoin() {
    const { coin, update } = this.props;
    update({coin: coin - 1});
  }
  incrementStash() {
    const { stash, update } = this.props;
    update({stash: this.props.stash + 1});
  }
  decrementStash() {
    const { stash, update } = this.props;
    update({stash: stash - 1});
  }
  exchangeToStash() {
    const { coin, stash, update } = this.props;
    if (stash < 40 && coin >= 1) {
      update({
        coin: coin - 1,
        stash: stash + 1
      });
    }
  }
  exchangeToCoin() {
    const { coin, stash, update } = this.props;
    if (stash >= 2 && coin < 4) {
      update({
        coin: coin + 1,
        stash: stash - 2
      });
    }
  }
  hover(key, value) {
    this.setState({[key]: value});
  }
  handleMouseOver(key) {
    return () => { this.setState({hover: key}); };
  }
  handleMouseLeave(key) {
    return () => {
      if (this.state.hover == key) {
        this.setState({hover: null});
      }
    }
  }
  render() {
    const { coin, stash, update } = this.props;
    let stashRows = [];
    let coinHighlight = 0;
    let stashHighlight = 0;
    if (this.state.hover == HOVER.INCREMENT_COIN) {
      coinHighlight += 1;
    }
    else if (this.state.hover == HOVER.DECREMENT_COIN) {
      coinHighlight -= 1;
    }
    else if (this.state.hover == HOVER.INCREMENT_STASH) {
      stashHighlight += 1;
    }
    else if (this.state.hover == HOVER.DECREMENT_STASH) {
      stashHighlight -= 1;
    }
    else if (this.state.hover == HOVER.EXCHANGE_TO_COIN) {
      coinHighlight += 1;
      stashHighlight -= 2;
    }
    else if (this.state.hover == HOVER.EXCHANGE_TO_STASH) {
      coinHighlight -= 1;
      stashHighlight += 1;
    }
    let coinProps = {
      max: 2,
      increment: this.incrementCoin.bind(this),
      decrement: this.decrementCoin.bind(this),
      className: 'row coin',
      highlight: coinHighlight,
      checkedProps: {
        onMouseOver: this.handleMouseOver(HOVER.DECREMENT_COIN),
        onMouseLeave: this.handleMouseLeave(HOVER.DECREMENT_COIN)
      },
      uncheckedProps: {
        onMouseOver: this.handleMouseOver(HOVER.INCREMENT_COIN),
        onMouseLeave: this.handleMouseLeave(HOVER.INCREMENT_COIN)
      }
    };
    let stashProps = {
      increment: this.incrementStash.bind(this),
      decrement: this.decrementStash.bind(this),
      highlight: stashHighlight,
      checkedProps: {
        onMouseOver: this.handleMouseOver(HOVER.DECREMENT_STASH),
        onMouseLeave: this.handleMouseLeave(HOVER.DECREMENT_STASH)
      },
      uncheckedProps: {
        onMouseOver: this.handleMouseOver(HOVER.INCREMENT_STASH),
        onMouseLeave: this.handleMouseLeave(HOVER.INCREMENT_STASH)
      }
    }
    for (let i=0; i < 4; i++) {
      stashRows.push(
        <StashRow key={i}
                  value={stash - (i * 10)}
                  {...stashProps}/>
      );
    }
    return (
      <div className='money'>
        <div className='column coin'>
          <div className='row stash'>
            <button className='stash label'
                    onClick={this.exchangeToStash.bind(this)}
                    onMouseOver={this.handleMouseOver(HOVER.EXCHANGE_TO_STASH)}
                    onMouseLeave={this.handleMouseLeave(HOVER.EXCHANGE_TO_STASH)}>
              STASH
            </button>
          </div>
          <div className='row coin'>
            <button className='coin label'
                    onClick={this.exchangeToCoin.bind(this)}
                    onMouseOver={this.handleMouseOver(HOVER.EXCHANGE_TO_COIN)}
                    onMouseLeave={this.handleMouseLeave(HOVER.EXCHANGE_TO_COIN)}>
              COIN
            </button>
          </div>
          <CheckboxArray value={coin}
                         {...coinProps}/>
          <CheckboxArray value={coin - 2}
                         {...coinProps}/>
        </div>
        <div className='column stash'>
          {stashRows}
        </div>
      </div>
    );
  }
}

Money.propTypes = {
  coin: React.PropTypes.number.isRequired,
  stash: React.PropTypes.number.isRequired,
  update: React.PropTypes.func.isRequired
}

export default Money;
