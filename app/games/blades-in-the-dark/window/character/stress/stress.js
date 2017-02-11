'use strict'

import React from 'react';
import styled from 'styled-components';

import Bar from './bar';
import Label from './label';

import TickArray from './tick-array.js';

import Colors from 'games/blades-in-the-dark/common/colors';
import Fonts from 'games/blades-in-the-dark/common/fonts';
import { lighten, darken } from 'utils/color-tools';
import connect from 'utils/connect';

const { fire, sun, shadow, stone } = Colors;
const light = lighten(fire, 0.3);
const dark = darken(fire, 0.2);

const Array = styled(TickArray)`
  z-index: 3;
  div.check {
    margin-right: .33em;
    &:after {
      content: "";
      position: absolute;
      left: -.15em;
      top: 0;
      width: .16em;
      height: .33em;
      background: ${sun};
    }
  }
  button:not(:disabled) {
    &:focus .check {
      &.checked:last-child svg polygon {
        fill: ${light};
      }
      &:not(.checked):first-child svg polygon {
        stroke: ${light};
      }
    }
    &:hover .check {
      &.checked:last-child svg polygon {
        fill: ${fire};
        stroke: ${fire};
      }
      &:not(.checked):first-child svg polygon {
        fill: ${fire};
      }
    }
    &:active .check {
      &.checked:last-child svg polygon {
        fill: ${light};
      }
      &:not(.checked):first-child svg polygon {
        fill: ${light};
      }
    }
  }
`

const StressBar = styled(Bar)`
  flex: 1 1 auto;
`


class Stress extends React.PureComponent {
  constructor(props) {
    super(props);
    this.increment = this.increment.bind(this);
    this.decrement = this.decrement.bind(this);
  }
  increment() {
    const { stress, dispatch } = this.props;
    if (stress < 9) {
      dispatch('increment_stress');
    }
  }
  decrement() {
    const { stress, dispatch } = this.props;
    if (stress > 0) {
      dispatch('decrement_stress');
    }
  }
  render() {
    const { disabled, stress } = this.props;

    return (
      <StressBar>
        <Label disabled={disabled || stress == 9} onClick={this.increment}>
          STRESS
        </Label>
        <Array value={stress} length={9} disabled={disabled}
               increment={this.increment} decrement={this.decrement}/>
      </StressBar>
    );
  }
}

const { number, bool, func } = React.PropTypes;
Stress.propTypes = {
  stress: number.isRequired,
  disabled: bool.isRequired,
  dispatch: func.isRequired
}

export default connect(Stress);
