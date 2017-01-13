'use strict'

import React from 'react';
import cx from 'classnames';

import { Checkbox, CheckboxArray } from './checkbox.js';

import './money.scss';

const StashRow = (props) => {
  const {
    value, offset, highlight,
    checkedProps, uncheckedProps,
    disabled
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
                     {...properties}/>
      <Checkbox value={10 + offset}
                checked={checked}
                className={'end'}
                highlight={checkboxHighlight}
                {...properties}
                {...checkboxProps}/>
    </div>
  );
}

StashRow.propTypes = {
  value: React.PropTypes.number.isRequired,
  offset: React.PropTypes.number.isRequired,
  disabled: React.PropTypes.bool
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
  toAction(who, value) {
    let action = null;
    if (value == null) {
      action = null;
    }
    else if (who == 'stash' || who == 'coin') {
      let direction = null;
      if (this.props[who] >= value) {
        direction = 'decrement';
      }
      else {
        direction = 'increment';
      }
      action = `${direction}_${who}`;
    }
    else {
      action = who;
    }
    return action;
  };
  click(click) {
    return (value) => {
      const actionName = this.toAction(click, value);
      const action = ACTIONS[actionName];
      if (action) {
        const upd8 = {};
        if (action.coin != 0) {
          upd8.coin = this.props.coin + action.coin
        }
        if (action.stash != 0 ) {
          upd8.stash = this.props.stash + action.stash
        }
        this.props.update(upd8);
      }
    }
  }
  hover(hover) {
    return (value) => {
      const action = this.toAction(hover, value);
      this.setState({hover: action});
    }
  }
  render() {
    const { coin, stash, update, disabled } = this.props;
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
      onHover: this.hover("coin"),
      onClick: this.click("coin"),
      disabled: disabled
    };
    let stashProps = {
      highlight: stashHighlight,
      onHover: this.hover("stash"),
      onClick: this.click("stash"),
      disabled: disabled
    }
    for (let i=0; i < 4; i++) {
      stashRows.push(
        <StashRow key={i}
                  value={stash}
                  offset={i * 10}
                  onClick={() => {}}
                  disabled={disabled}
                  {...stashProps}/>
      );
    }
    return (
      <div className='money'>
        <div className='column coin'>
          <div className='row stash'>
            <button className='stash label'
                    disabled={disabled}
                    onClick={this.click("coin_to_stash")}
                    onMouseOver={this.hover("coin_to_stash")}
                    onMouseLeave={this.hover(null)}>
              STASH
            </button>
          </div>
          <div className='row coin'>
            <button className='coin label'
                    disabled={disabled}
                    onClick={this.click("stash_to_coin")}
                    onMouseOver={this.hover("stash_to_coin")}
                    onMouseLeave={this.hover(null)}>
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
  update: React.PropTypes.func.isRequired,
  disabled: React.PropTypes.bool
}

Money.defaultProps = {
  disabled: false
}

export default Money;
