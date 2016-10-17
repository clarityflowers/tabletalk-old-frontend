'use strict'

import React from 'react';
import { bonusString } from 'games/world-of-adventure/utils.js';
import OptionsMenu from 'options/options-menu.js';
import { HoverWiggle } from 'utils/hover-animate.js';
import './window.scss';

class RollButton extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
  }
  handleClick() {
    this.props.onChat(`/roll ${bonusString(this.props.bonus)}`)
  }
  render () {
    return (
      <HoverWiggle>
        <button className='roll' onClick={this.handleClick.bind(this)}>
          Roll {bonusString(this.props.bonus)}
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
        <RollButton bonus={-1} onChat={this.props.onChat}/>
        <RollButton bonus={0} onChat={this.props.onChat}/>
        <RollButton bonus={1} onChat={this.props.onChat}/>
        <RollButton bonus={2} onChat={this.props.onChat}/>
        <RollButton bonus={3} onChat={this.props.onChat}/>
        <RollButton bonus={4} onChat={this.props.onChat}/>
      </div>
    )
  }
}

export default Window;
