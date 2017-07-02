'use strict';

import React from 'react';
import styled from 'styled-components';
import Link from './link.js';
import cx from 'classnames';

import Label from './label';
import Icon from './icon';
import Plus from './plus';

const ANIMATION_STEPS = [1600, 10, 900, 10, 900, 0]

class New extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      newGameStatus: 0
    }
    this.timeout = null;
  }
  setTimeout(resolve, duration) {
    clearTimeout(this.timeout);
    this.timeout = setTimeout(resolve, duration);
  }
  newGameAnimation() {
    let duration = 0;
    if (this.state.newGameStatus < ANIMATION_STEPS.length) {
      duration = ANIMATION_STEPS[this.state.newGameStatus];
    }
    if (duration) {
      this.setState({ newGameStatus: this.state.newGameStatus + 1 });
      this.setTimeout(this.newGameAnimation.bind(this), duration);
    }
  }
  componentWillReceiveProps(newProps) {
    if (this.props.selected != newProps.selected) {
      if (newProps.selected) {
        this.newGameAnimation();
      }
      else {
        this.cancelNewGame();
      }
    }
  }
  componentDidMount() {
    if (this.props.selected) {
      this.newGameAnimation();
    }
  }
  componentWillUnmount() {
    clearTimeout(this.timeout);
  }
  cancelNewGame() {
    if (this.state.newGameStatus == 0) {
      return;
    }
    let duration = ANIMATION_STEPS[this.state.newGameStatus - 1];
    this.setState({ newGameStatus: this.state.newGameStatus - 1 });
    this.setTimeout(this.cancelNewGame.bind(this), duration);
  }
  render() {
    const { position, entering, leaving, route, type, selected } = this.props;
    const { newGameStatus } = this.state;
    let plusPosition = Math.min(position, 2);
    if (position >= 2) {
      if (newGameStatus == 1) {
        plusPosition = Math.min(plusPosition, 1);
      }
    }
    let content = (
      <Plus position={plusPosition}
            entering={entering}
            leaving={leaving}/>
    )
    if (newGameStatus >= 2) {
      let iconPosition = 1;
      let boxPosition = 0;
      if (position < 3) {
        iconPosition = position;
      }
      else
      {
        if (newGameStatus >= 3) {
          iconPosition = 2;
        }
        if (newGameStatus >= 4 && position >= 4) {
          boxPosition = 1;
        }
        let gameTypeSelector = null;
      }
      content = (
        <div>
          <Icon position={iconPosition}
                type={type}/>
          <Label position={boxPosition}
                 name='New Game'
                 transition={true}/>
        </div>
      )
    }
    return (
      <Link route={this.props.route.push('new')} 
            rx={{off: this.props.position == 0, disabled: selected}}>
        {content}
      </Link>
    );
  }
}

const { number, bool, object } = React.PropTypes;
New.PropTypes = {
  position: number.isRequired,
  entering: bool.isRequired,
  leaving: bool.isRequired,
  route: object.isRequired,
  type: number.isRequired,
  selected: bool.isRequired
}

export default New;
