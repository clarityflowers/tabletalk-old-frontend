'use strict'

import React from 'react';
import rx from 'resplendence';

import { Coin } from 'blades/window/common/coin';

import Button from 'common/button';
import connect from 'utils/connect';

rx`
@import "~blades/common/colors";
@import "~blades/common/fonts";

$active-background: lighten($fire, 30%);
`

const Container = rx('div')`
  position: relative;
  width: 1.8em;
  height: 1.8em;
  flex: 0 0 auto;
`
const ZButton = rx(Button)`--1
  position: absolute;
  z-index: 1;
  &:focus .check:last-child {
    outline: 1px solid $fire;
  }
  &.top {
    z-index: 2;
  }
`
const Square = rx('div')`
  display: flex;
  justify-content: space-between;
  align-items: flex-end;
  align-content: space-between;
`;
const Checked = rx(ZButton)`--1
  top: 0;
  left: 0;
  &:hover .check:last-child {
    background-color: $fire;
  }
  &:active .check:last-child {
    background: $active-background;
  }
`;
const Unchecked = rx(ZButton)`--1
  bottom: 0;
  right: 0;
  &:hover .check:last-child {
    background-color: darken($sand, 40%);
  }
  &:active .check:last-child {
    background: $active-background;
  }
`;
const CheckedSquare = rx(Square)`
  flex-flow: row wrap;
  align-items: flex-start;
`;
const UncheckedSquare = rx(Square)`
  flex-flow: row-reverse wrap-reverse;
`;

class Wallet extends React.Component {
  constructor(props) {
    super(props);
    this.increment = this.increment.bind(this);
    this.decrement = this.decrement.bind(this);
  }
  increment() {
    this.props.dispatch('increment_coin');
  }
  decrement() {
    this.props.dispatch('decrement_coin');
  }
  render () {
    const { value, disabled, highlight } = this.props;
    let checked = null;
    let unchecked = null;
    if (value > 0) {
      let coins = [];
      for (let i=0; i < value; i++) {
        coins.push(
          <Coin key={i} checked highlight={i >= value + highlight} isButton={false}/>
        );
      }
      checked = (
        <Checked onClick={this.decrement} rx={{top: value <= 1}}>
          <CheckedSquare>
            {coins}
          </CheckedSquare>
        </Checked>
      );
    }
    if (value < 4) {
      let coins = [];
      for (let i=3; i >= value; i--) {
        coins.push(
          <Coin key={i} highlight={i < value + highlight} isButton={false}/>
        )
      }
      unchecked = (
        <Unchecked onClick={this.increment} rx={{top: value >= 3}}>
          <UncheckedSquare>
            {coins}
          </UncheckedSquare>
        </Unchecked>
      )
    }
    return (
      <Container>
        {checked}
        {unchecked}
      </Container>
    );
  }
}

const { number, bool, func } = React.PropTypes;
Wallet.propTypes = {
  value: number.isRequired,
  disabled: bool.isRequired,
  highlight: number.isRequired,
  dispatch: func.isRequired
}

export default connect(Wallet);
