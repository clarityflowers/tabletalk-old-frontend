'use strict'

import React from 'react';
import styled from 'styled-components';

import Bar from 'blades/window/styles/bar';
import Label from 'blades/window/styles/label';
import Array from 'blades/window/styles/thin-tick-array';

import connect from 'utils/connect';

const StressBar = styled(Bar)`
  flex: 1 1 auto;
  z-index: 5;
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
