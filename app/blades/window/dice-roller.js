'use strict'

import React from 'react';
import styled from 'styled-components';

import RollButton from './roll-button';
import Row from 'common/row';
import Colors from 'blades/common/colors';
import { fadeout } from 'utils/color-tools';

const background = fadeout(Colors.sun, 0.2);
const Container = styled.div`
  z-index: 30;
  position: absolute;
  left: .25em;
  top: .25em;
  background: ${background};
  border-radius: 2em;
  box-shadow: ${Colors.shadow};
  padding: 0 0 0 0;
`;
const Dice = styled(Row)`
  flex-wrap: wrap;
  align-items: center;
  align-content: center;
  justify-content: flex-start;
`

class DiceRoller extends React.Component {
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
