'use strict'

import React from 'react';
import styled from 'styled-components';

import Label from 'blades/window/styles/label';
import Array from 'blades/window/styles/thin-tick-array';
import Bar from 'blades/window/styles/bar';

import Colors from 'blades/common/colors';
import connect from 'utils/connect';

const { sky, sun } = Colors;

const Container = styled.div`
  display: flex;
  flex-flow: row nowrap;
  align-items: flex-start;
`
const RepBar = styled(Bar)`
  margin-right: .16em;
`
const TurfBar = styled(Bar)`
  margin-left: .16em;
  &:after {
    z-index: 1;
    background: ${sky};
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
      dispatch('increment_turf');
    }
  }
  decrement() {
    const { rep, turf, dispatch } = this.props;
    if (rep > 0) {
      dispatch('decrement_turf');
    }
  }
  render() {
    const { rep, turf, disabled } = this.props;
    return (
      <Container>
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
      </Container>
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
