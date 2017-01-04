'use strict'

import React from 'react';
import cx from 'classnames';
import { HoverWiggle } from 'utils/hover-animate.js';
import './dice-roller.scss';

class RollButton extends React.Component {
  constructor(props) {
    super(props);
  }
  handleClick() {
    if (!this.props.off) {
      this.props.onClick(this.props.level);
    }
  }
  render () {
    let containerClassName = cx(
      'container',
      {
        off: this.props.off,
        roll: !this.props.toggle
      }
    )
    let buttonClassName = 'roll';
    let text = this.props.level;
    if (this.props.toggle) {
      buttonClassName = 'toggle';
      text = '6';
    }
    return (
      <div className={containerClassName}>
        <HoverWiggle off={this.props.off}>
          <button className={buttonClassName} onClick={this.handleClick.bind(this)}>
            {text}
          </button>
        </HoverWiggle>
      </div>
    )
  }
}

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
    let props = {
      onClick: this.handleClick.bind(this),
      off: !this.state.on
    }
    let className = cx(
      'dice-roller',
      {
        off: !this.state.on
      }
    )
    return (
      <div className={className}>
        <div className='dice'>
          <RollButton level={0} {...props}/>
          <RollButton level={1} {...props}/>
          <RollButton level={2} {...props}/>
          <RollButton level={3} {...props}/>
          <RollButton level={4} {...props}/>
          <RollButton level={5} {...props}/>
          <RollButton level={6} {...props}/>
          <RollButton level={7} {...props}/>
          <RollButton toggle onClick={this.toggle.bind(this)}/>
        </div>
      </div>
    )
  }
}

export default DiceRoller;
