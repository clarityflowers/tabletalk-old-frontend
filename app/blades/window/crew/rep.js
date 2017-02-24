'use strict'

import React from 'react';
import styled from 'styled-components';

import Label from 'blades/window/styles/label';
import CommonArray from 'blades/window/styles/thin-tick-array';
import Bar from 'blades/window/styles/bar';
import StatusBar from './status-bar';

import Colors from 'blades/common/colors';
import connect from 'utils/connect';

const { sky, sun } = Colors;

const RepBar = styled(Bar)`
  margin-right: .16em;
`
const TurfBar = styled(Bar)`
  margin-left: .32em;
  &:after {
    z-index: 1;
    background: ${sky};
  }
`
const Array = styled(CommonArray)`
  button {
    &:last-child:not(:first-child) {
      margin-left: .2em;
    }
    &:first-child:not(:last-child) {
      margin-right: .2em;
    }
  }
  div.check {
    &:not(:first-child) {
      margin-left: .2em;
    }
    &:not(:last-child) {
      margin-right: .2em;
    }
  }
`
const TurfArray = styled(Array)`
  div.check {
    svg polygon {
      stroke: ${sky};
      fill: ${sky};
    }
    &:after {
      background: ${sky};
    }
    &:last-child {
      margin-right: .40em;
    }
  }
`
const TurfLabel = styled(Label)`
  z-index: 0;
  background: ${sky};
  color: ${sun};
`

class Rep extends React.PureComponent {
  constructor(props) {
    super(props);
    this.increment = this.increment.bind(this);
    this.decrement = this.decrement.bind(this);
  }
  increment() {
    const { rep, turf, dispatch } = this.props;
    const target = 12 - Math.min(turf, 6);
    if (rep < target) {
      dispatch('increment_rep');
    }
  }
  decrement() {
    const { rep, dispatch } = this.props;
    if (rep > 0) {
      dispatch('decrement_rep');
    }
  }
  render() {
    const { rep, turf, disabled } = this.props;
    return (
      <StatusBar>
        <RepBar>
          <Label onClick={this.increment} disabled={disabled}>
            REP
          </Label>
          <Array value={rep} length={12 - Math.min(turf, 6)} disabled={disabled}
                 increment={this.increment}
                 decrement={this.decrement}/>
        </RepBar>
        <TurfBar>
          <TurfArray value={turf} length={Math.min(turf, 6)} disabled/>
        </TurfBar>
        <TurfLabel disabled>
          TURF
        </TurfLabel>
      </StatusBar>
    )
  }
}

const { number, bool, func } = React.PropTypes;
Rep.propTypes = {
  rep: number.isRequired,
  turf: number.isRequired,
  disabled: bool.isRequired,
  dispatch: func.isRequired
};

export default connect(Rep);
