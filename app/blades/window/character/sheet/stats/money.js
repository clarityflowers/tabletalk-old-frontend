'use strict'

import React, { PureComponent } from 'react';
import rx from 'resplendence';

import StashRow from './stash-row';
import Wallet from './wallet';

import Row from 'common/row';
import Column from 'common/column';
import Button from 'common/button';
import connect from 'utils/connect';

rx`
@import "~blades/common/colors";
@import "~blades/common/fonts";
`

const Div = rx(Row)`--1
  justify-content: center;
  font-size: .8em;
  margin-bottom: 1em;
`
const Label = rx(Button)`--1
  $label-active-color: lighten($fire, 30%);
  $label-disabled-color: lighten($stone, 30%);

  font: $h1;
  font-size: 0.8em;
  text-shadow: $textShadow;
  &:disabled {
    color: $label-disabled-color;
  }
  &:not(:disabled) {
    &:focus {
      text-decoration: underline;
    }
    &:hover {
      color: $fire;
    }
    &:active {
      color: $label-active-color;
    }
  }
`
const CoinLabel = rx(Label)`--1
  color: $sand;
`
const StashLabel = rx(Label)`--1
  color: $sky;
  margin-right: -0.7em;
`
const Left = rx(Column)`--1
  padding-right: 0.7em;
`
const Right = rx(Column)`--1
  align-self: flex-end;
`

class Money extends React.PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      hover: null
    }
  }
  mouseOver(value) {
    return () => {
      this.setState({hover: value});
    }
  }
  handleMouseLeave() {
    this.setState({hover: null});
  }
  transferToStash() {
    const { coin, stash, dispatch } = this.props;
    const { hover } = this.state;
    if (hover == 'coin_to_stash' && (stash + 1 > 39 || coin - 1 < 1)) {
      this.setState({hover: null});
    }
    dispatch('transfer_to_stash');
  }
  transferToCoin() {
    const { coin, stash, dispatch } = this.props;
    const { hover } = this.state;
    if (hover == 'stash_to_coin' && (stash - 2 < 2 || coin + 1 > 3)) {
      this.setState({hover: null});
    }
    dispatch('transfer_to_coin');
  }
  render() {
    const { coin, stash, disabled } = this.props;
    const { hover } = this.state;
    let stashRows = [];
    let stashHighlight = 0;
    let coinHighlight = 0;
    if (hover == "coin_to_stash") {
      stashHighlight = 1;
      coinHighlight = -1;
    }
    if (hover == "stash_to_coin") {
      stashHighlight = -2;
      coinHighlight = 1;
    }
    for (let i=0; i < 4; i++) {
      stashRows.push(
        <StashRow key={i}
                  value={stash}
                  offset={i * 10}
                  highlight={stashHighlight}/>
      );
    }
    return (
      <Div>
        <Left>
          <StashLabel disabled={disabled || coin < 1 || stash > 39 }
                      onClick={this.transferToStash.bind(this)}
                      onMouseOver={this.mouseOver("coin_to_stash")}
                      onMouseLeave={this.handleMouseLeave.bind(this)}>
            STASH
          </StashLabel>
          <CoinLabel disabled={disabled || coin > 3 || stash < 2}
                     onClick={this.transferToCoin.bind(this)}
                     onMouseOver={this.mouseOver("stash_to_coin")}
                     onMouseLeave={this.handleMouseLeave.bind(this)}>
            COIN
          </CoinLabel>
          <Wallet value={coin}
                  disabled={disabled}
                  highlight={coinHighlight}/>
        </Left>
        <Right>
          {stashRows}
        </Right>
      </Div>
    );
  }
}

const { number, bool, func } = React.PropTypes;
Money.propTypes = {
  coin: number.isRequired,
  stash: number.isRequired,
  disabled: bool.isRequired,
  dispatch: func.isRequired

}

Money.defaultProps = {
  disabled: false
}

export default connect(Money);
