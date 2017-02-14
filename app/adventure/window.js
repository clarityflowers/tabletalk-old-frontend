'use strict'

import React from 'react';
import styled from 'styled-components';

import RollButton from './roll-button';
import OptionsMenu from 'options/options-menu';

const Container = styled.div`
  flex: 1 1 0;
  position: relative;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  font-size: 20px;
`

class Window extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
  }
  render() {
    return (
      <Container>
        <OptionsMenu route={this.props.route} on={this.props.options} auth={this.props.auth}/>
        <RollButton bonus={-1} onChat={this.props.onChat}/>
        <RollButton bonus={0} onChat={this.props.onChat}/>
        <RollButton bonus={1} onChat={this.props.onChat}/>
        <RollButton bonus={2} onChat={this.props.onChat}/>
        <RollButton bonus={3} onChat={this.props.onChat}/>
        <RollButton bonus={4} onChat={this.props.onChat}/>
      </Container>
    )
  }
}

export default Window;
