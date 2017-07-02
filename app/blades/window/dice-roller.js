'use strict'

import React from 'react';
import rx from 'resplendence';

import RollButton from './roll-button';
import Row from 'common/row';

rx`
@import "~blades/common/colors";
`

const Container = rx('div')`
  z-index: 30;
  position: absolute;
  left: .25em;
  top: .25em;
  background: fade-out($sun, 0.2);
  border-radius: 2em;
  box-shadow: $shadow;
  padding: 0 0 0 0;
`;
const Dice = rx(Row)`--1
  flex-wrap: wrap;
  align-items: center;
  align-content: center;
  justify-content: flex-start;
`

class DiceRoller extends React.PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      on: false
    }
  }
  toggle() {
    this.setState({on: !this.state.on});
  }
  handleClick(level) {
    this.props.onChat(`/roll ${level}`);
    this.setState({on: false});
  }
  render() {
    const props = {
      onClick: this.handleClick.bind(this),
      off: !this.state.on
    }
    return (
      <Container>
        <Dice>
          <RollButton level={0} {...props}/>
          <RollButton level={1} {...props}/>
          <RollButton level={2} {...props}/>
          <RollButton level={3} {...props}/>
          <RollButton level={4} {...props}/>
          <RollButton level={5} {...props}/>
          <RollButton level={6} {...props}/>
          <RollButton level={7} {...props}/>
          <RollButton toggle onClick={this.toggle.bind(this)}/>
        </Dice>
      </Container>
    )
  }
}

export default DiceRoller;
