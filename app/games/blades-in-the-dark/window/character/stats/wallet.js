'use strict'

import React from 'react';
import styled from 'styled-components';

import { Coin } from './coin';
import Button from 'common/button';
import props from 'utils/props';
import Colors from 'games/blades-in-the-dark/common/colors';
import { darken, lighten } from 'utils/color-tools';

const Container = styled.div`
  position: relative;
  width: 1.8em;
  height: 1.8em;
  flex: 0 0 auto;
`
const activeBackground = lighten(Colors.fire, 0.3);
const ZButton = styled(props(Button, 'top'))`
  position: absolute;
  z-index: ${props => props.top ? 2 : 1};
  &:focus .check:last-child {
    outline: 1px solid ${Colors.fire};
  }
`
const Square = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: flex-end;
  align-content: space-between;
`;
const Checked = styled(ZButton)`
  top: 0;
  left: 0;
  &:hover .check:last-child {
    background-color: ${Colors.fire};
  }
  &:active .check:last-child {
    background: ${activeBackground};
  }
`;
const uncheckedBackground = darken(Colors.sand, 0.4);
const Unchecked = styled(ZButton)`
  bottom: 0;
  right: 0;
  &:hover .check:last-child {
    background-color: ${uncheckedBackground};
  }
  &:active .check:last-child {
    background: ${activeBackground};
  }
`;
const CheckedSquare = styled(Square)`
  flex-flow: row wrap;
  align-items: flex-start;
`;
const UncheckedSquare = styled(Square)`
  flex-flow: row-reverse wrap-reverse;
`;

const Wallet = (props) => {
  const { value, disabled, increment, decrement, highlight } = props;
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
      <Checked onClick={decrement} top={value <= 1}>
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
      <Unchecked onClick={increment} top={value >= 3}>
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
  )
}

Wallet.propTypes = {
  value: React.PropTypes.number.isRequired,
  disabled: React.PropTypes.bool.isRequired,
  increment: React.PropTypes.func.isRequired,
  decrement: React.PropTypes.func.isRequired,
  highlight: React.PropTypes.number.isRequired
}

export default Wallet;
