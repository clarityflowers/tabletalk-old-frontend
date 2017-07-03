import React from 'react';
import rx from 'resplendence'

import { CoinArray } from 'blades/window/common/coin';

import connect from 'utils/connect';

rx`
@import "~blades/common/colors";
@import "~blades/common/fonts";
`

const Container = rx('div')`
  display: flex;
  flex-flow: row nowrap;
  &.off {
    opacity: 0.3;
  }
  margin: 0.2em 0;
`
const Label = rx('div')`
  font: $body;
  font-size: .8em;
  margin-right: .2em;
`
const Checks = rx(CoinArray)`--1
  .check {
    &.checked {
      background-color: $sun;
      &.highlight {
        background-color: $fire;
      }
    }
    &:not(.checked) {
      background-color: darken($stone, 5%);
    }
  }
  button:not(:disabled) {
    &:hover {
      .check.checked:last-child {
        background-color: $fire;
      }
      .check:not(.checked):first-child {
        background-color: darken($fire, 20%);
      }
    }
    &:active {
      .check.checked:last-child {
        background-color: darken($fire, 20%);
      }
      .check:not(.checked):first-child {
        background-color: $fire;
      }
    }
  }
`

class Bandolier extends React.PureComponent {
  constructor(props) {
    super(props);
    this.increment = this.increment.bind(this);
    this.decrement = this.decrement.bind(this);
  }
  increment() {
    const { id, dispatch } = this.props;
    dispatch('increment_bandolier', id);
  }
  decrement() {
    const { id, dispatch } = this.props;
    dispatch('decrement_bandolier', id);
  }
  render() {
    const { on, used, id, disabled } = this.props;
    const off = disabled || !on;
    return (
      <Container rx={{off}}>
        <Label>Bandolier</Label>
        <Checks value={used} length={3} disabled={off} increment={this.increment} decrement={this.decrement}/>
      </Container>
    )
  }
}

const { bool, number, string, func } = React.PropTypes;
Bandolier.propTypes = {
    on: bool.isRequired,
    used: number.isRequired,
    id: string.isRequired,
    disabled: bool.isRequired,
    dispatch: func.isRequired
}

export default connect(Bandolier);
