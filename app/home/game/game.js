'use strict';

import React from 'react';

import New from './new';
import Existing from './existing';

import { GameTypes } from 'utils/enums.js';

const ANIMATION_STEPS_ENTERING = [ 700, 700, 700, 700 ]

const ANIMATION_STEPS_EXITING =  [ 700, 700, 100, 100 ]

class Game extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      entering: false,
      leaving: false,
      position: this.props.transition ? 0 : 4
    }
    this.timeout = null;
    this.enterCallback = null;
    this.leaveCallback = null;
    this.ready = true;
  }
  setTimeout(resolve, duration) {
    clearTimeout(this.timeout);
    this.timeout = setTimeout(resolve, duration);
  }
  gameEnter() {
    let duration = 0;
    if (this.state.position < ANIMATION_STEPS_ENTERING.length) {
      duration = ANIMATION_STEPS_ENTERING[this.state.position];
    }
    if (duration) {
      this.setState({
        position: this.state.position + 1,
        entering: true
      });
      this.setTimeout(this.gameEnter.bind(this), duration);
    }
    else {
      this.setState({
        entering: false
      })
      if (this.enterCallback) {
        this.enterCallback();
      }
    }
  }
  gameExit() {
    let duration = 0;
    if (this.state.position > 0) {
      duration = ANIMATION_STEPS_EXITING[this.state.position - 1];
    }
    if (duration) {
      this.setState({
        position: this.state.position - 1,
        leaving: true
      });
      this.setTimeout(this.gameExit.bind(this), duration);
    }
    else if (this.leaveCallback){
      this.leaveCallback();
    }
  }
  componentWillUnmount() {
    clearTimeout(this.timeout);
  }
  componentWillEnter(callback) {
    this.enterCallback = callback;
    if (this.props.transition) {
      this.setTimeout(this.gameEnter.bind(this), 100);
    }
    else {
      this.setState({position: 4});
      callback();
    }
  }
  componentDidEnter() {
    this.setState({
      entering: false
    })
  }
  componentWillLeave(callback) {
    this.leaveCallback = callback;
    if (this.props.transition) {
      this.gameExit();
    }
    else {
      callback();
    }
  }
  componentDidLeave() {
    this.props.doneLeaving();
  }
  render() {
    const { type, route, selected, name, gameId, transition } = this.props;
    const { position, entering, leaving } = this.state;
    let content = null;
    if (this.props.name == null) {
      let position = this.props.type == null ? this.state.position : 3;
      content = (
        <New route={route}
             position={position}
             entering={entering}
             leaving={leaving}
             selected={selected}
             type={type}/>
      )
    }
    else {
      content = (
        <Existing route={route}
                 name={name}
                 position={position}
                 entering={entering}
                 leaving={leaving}
                 gameId={gameId}
                 selected={selected}
                 type={type}
                 transition={transition}/>
      )
    }
    return content;
  }
}

export default Game;
