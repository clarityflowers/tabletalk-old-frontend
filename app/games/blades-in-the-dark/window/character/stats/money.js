'use strict'

import React from 'react';
import cx from 'classnames';

import { Checkbox, CheckboxArray } from './checkbox.js';

import './money.scss';

const StashRow = (props) => {
  const {
    value, offset, highlight,
    checkedProps, uncheckedProps
  } = props;
  const checked = value >= 10 + offset;
  let checkboxProps = checked ? checkedProps : uncheckedProps;
  let checkboxHighlight = (
    (checked && (value + highlight < 10 + offset)) ||
    (!checked && (value + highlight >= 10 + offset))
  );
  const properties = Object.assign({}, props);
  delete properties.value;
  delete properties.offset;
  delete properties.className;
  delete properties.checkedProps;
  delete properties.uncheckedProps;
  delete properties.highlight;
  return (
    <div className='row'>
      <CheckboxArray value={value}
                     offset={offset}
                     length={9}
                     className='start'
                     highlight={highlight}
                     checkedProps={checkedProps}
                     uncheckedProps={uncheckedProps}
                     isButton={false}
                     {...properties}/>
      <Checkbox value={10 + offset}
                checked={checked}
                className={'end'}
                highlight={checkboxHighlight}
                isButton={false}
                {...properties}
                {...checkboxProps}/>
    </div>
  );
}

StashRow.propTypes = {
  value: React.PropTypes.number.isRequired,
  offset: React.PropTypes.number.isRequired
}

StashRow.defaultProps = {
  disabled: false
}

const ACTIONS = {
  increment_coin:  { coin:  1, stash:  0 },
  decrement_coin:  { coin: -1, stash:  0 },
  increment_stash: { coin:  0, stash:  1 },
  decrement_stash: { coin:  0, stash: -1 },
  stash_to_coin:   { coin:  1, stash: -2 },
  coin_to_stash:   { coin: -1, stash:  1 }
}

class Money extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      hover: null
    };
  }
  mouseOver(hover) {
    return () => {
      if (!this.props.disabled) {
        this.setState({hover: hover});
      }
    }
  }
  handleMouseLeave(hover) {
    if (!this.props.disabled) {
      this.setState({hover: null});
    }
  }
  render() {
    const {
      coin, stash,
      increment, decrement, transferToStash, transferToCoin,
      disabled
    } = this.props;
    let stashRows = [];
    let coinHighlight = 0;
    let stashHighlight = 0;
    if (this.state.hover) {
      let action = ACTIONS[this.state.hover];
      if (action) {
        coinHighlight = action.coin;
        stashHighlight = action.stash;
      }
    }
    let coinProps = {
      length: 2,
      className: 'row coin',
      highlight: coinHighlight,
      disabled: disabled,
      checkedProps: {
        onClick: decrement,
        onMouseOver: this.mouseOver('decrement_coin'),
        onMouseLeave: this.handleMouseLeave.bind(this)
      },
      uncheckedProps: {
        onClick: increment,
        onMouseOver: this.mouseOver('increment_coin'),
        onMouseLeave: this.handleMouseLeave.bind(this)
      }
    };
    let stashProps = {
      highlight: stashHighlight
    }
    for (let i=0; i < 4; i++) {
      stashRows.push(
        <StashRow key={i}
                  value={stash}
                  offset={i * 10}
                  {...stashProps}/>
      );
    }
    return (
      <div className='money'>
        <div className='column coin'>
          <div className='row stash'>
            <button className='stash label'
                    disabled={disabled}
                    onClick={transferToStash}
                    onMouseOver={this.mouseOver("coin_to_stash")}
                    onMouseLeave={this.handleMouseLeave.bind(this)}>
              STASH
            </button>
          </div>
          <div className='row coin'>
            <button className='coin label'
                    disabled={disabled}
                    onClick={transferToCoin}
                    onMouseOver={this.mouseOver("stash_to_coin")}
                    onMouseLeave={this.handleMouseLeave.bind(this)}>
              COIN
            </button>
          </div>
          <CheckboxArray value={coin}
                         {...coinProps}/>
          <CheckboxArray value={coin} offset={2}
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
  increment: React.PropTypes.func.isRequired,
  decrement: React.PropTypes.func.isRequired,
  transferToStash: React.PropTypes.func.isRequired,
  transferToCoin: React.PropTypes.func.isRequired,
  disabled: React.PropTypes.bool
}

Money.defaultProps = {
  disabled: false
}

export default Money;
