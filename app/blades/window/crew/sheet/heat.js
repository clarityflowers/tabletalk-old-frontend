'use strict'

import React from 'react';
import rx from 'resplendence';

import Label from 'blades/window/styles/label-button';
import Bar from 'blades/window/styles/bar';
import HeatArray from 'blades/window/styles/thin-tick-array';
import ThickArray from 'blades/window/styles/thick-tick-array';
import StatusBar from './status-bar';

import Colors from 'blades/common/colors';
import connect from 'utils/connect';

const { shadow } = Colors;

const HeatBar = rx(Bar)`--1
  padding-right: .5em;
`
const Wanted = rx('div')`
  position: relative;
`
const WantedLabel = rx(Label)`--1
  box-shadow: none;
  position: relative;
  z-index: 2;
  min-width: 7em;
`
const Shadow = rx(Label)`--1
  width: 100%;
  height: 100%;
  position: absolute;
  z-index: 0;
`
const WantedArray = rx(ThickArray)`--2
  position: absolute;
  top: 0;
  right: 0;
  width: 100%;
  max-width: 3.5em;
  justify-content: space-between;
  z-index: 1;
`

class Heat extends React.PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      hover: false
    }
    this.increment = this.increment.bind(this);
    this.decrement = this.decrement.bind(this);
    this.handleMouseOver = this.handleMouseOver.bind(this);
    this.handleMouseLeave = this.handleMouseLeave.bind(this);
    this.serveTime = this.serveTime.bind(this);
  }
  increment() {
    const { heat, dispatch } = this.props;
    if (heat < 9) {
      dispatch('increment_heat');
    }
  }
  decrement() {
    const { heat, dispatch } = this.props;
    if (heat > 0) {
      dispatch('decrement_heat');
    }
  }
  handleMouseOver() {
    this.setState({hover: true});
  }
  handleMouseLeave() {
    this.setState({hover: false});
  }
  serveTime() {
    const { dispatch } = this.props;
    dispatch('serve_time');
  }
  render() {
    const { heat, wantedLevel, disabled } = this.props;
    const { hover } = this.state;
    return (
      <StatusBar>
        <HeatBar>
          <Label onClick={this.increment} disabled={disabled}>
            HEAT
          </Label>
          <HeatArray value={heat} length={9} disabled={disabled}
                 highlight={hover ? -heat : 0}
                 increment={this.increment}
                 decrement={this.decrement}/>
        </HeatBar>
        <Wanted>
          <Shadow/>
          <WantedLabel onClick={this.serveTime} disabled={disabled || wantedLevel == 0}
                       onMouseOver={this.handleMouseOver}
                       onMouseLeave={this.handleMouseLeave}>
            WANTED LEVEL
          </WantedLabel>
          <WantedArray value={wantedLevel} length={4} isButton={false}/>
        </Wanted>
      </StatusBar>
    )
  }
}

const { number, bool, func } = React.PropTypes;
Heat.PropTypes = {
  heat: number.isRequired,
  wantedLevel: number.isRequired,
  disabled: bool.isRequired,
  dispatch: func.isRequired
}

export default connect(Heat);
