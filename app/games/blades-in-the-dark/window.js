'use strict'

import React from 'react';
import OptionsMenu from 'options/options-menu.js';
import { HoverWiggle } from 'utils/hover-animate.js';
import './window.scss';

class RollButton extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
  }
  handleClick() {
    this.props.onChat(`/roll ${this.props.level}`)
  }
  render () {
    return (
      <HoverWiggle>
        <button className='roll' onClick={this.handleClick.bind(this)}>
          {this.props.level}
        </button>
      </HoverWiggle>
    )
  }
}

class Window extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
  }
  render() {
    return (
      <div id='window'>
        <OptionsMenu on={this.props.options} auth={this.props.auth}/>
        <RollButton level={0} onChat={this.props.onChat}/>
        <RollButton level={1} onChat={this.props.onChat}/>
        <RollButton level={2} onChat={this.props.onChat}/>
        <RollButton level={3} onChat={this.props.onChat}/>
        <RollButton level={4} onChat={this.props.onChat}/>
        <RollButton level={5} onChat={this.props.onChat}/>
        <RollButton level={6} onChat={this.props.onChat}/>
        <RollButton level={7} onChat={this.props.onChat}/>
      </div>
    )
  }
}

export default Window;
