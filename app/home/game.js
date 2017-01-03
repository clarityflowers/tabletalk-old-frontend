'use strict';

import React from 'react';
import Link from 'utils/link.js';
import cx from 'classnames';
import { HoverWiggle } from 'utils/hover-animate.js';
import { GameTypes } from 'utils/enums.js';
import './game.scss';

let GameIcon = (props) => {
  let className = cx(
    'icon',
    props.gameClass,
    {
      off: props.position == 0,
      dot: props.position == 1,
      entering: props.entering,
      leaving: props.leaving,
      closed: props.gameClass == null,
      go: props.go
    }
  )
  let content = (
    <div className={className}>
      {props.children}
    </div>
  )
  if (!props.closed && !props.off && !props.dot) {
    content = (
      <Link route={props.route.push(props.gameId)}>
        {content}
      </Link>
    )
  }
  return content;
}

class GameBox extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      width: 0
    }
  }
  updateWidth() {
    let {scrollWidth, innerText} = this.refs.box;
    if (this.props.gameId == 'new' || this.props.gameId == '200') {
    }
    if (scrollWidth != this.state.width) {
      this.setState({width: scrollWidth});
    }
  }
  componentDidMount() {
    this.updateWidth();
    window.addEventListener('resize', this.updateWidth.bind(this));
  }
  componentWillUnmount() {
    window.removeEventListener('resize', this.updateWidth.bind(this));
  }
  componentDidUpdate(prevProps, prevState) {
    this.updateWidth();
  }
  render() {
    let style = {
      width: 0
    }
    if (this.props.position == 1) {
      style.width = this.state.width;
    }
    let className = cx(
      'box',
      {
        off: this.props.position == 0
      }
    )
    if (!this.props.transition) {
      style.transition = 'none';
    }
    let box = (
      <div className={className}
           ref='box'>
        {this.props.name}
      </div>
    );
    let content = null;
    if (this.props.gameId != 'new') {
      content = (
        <Link route={this.props.route.push(this.props.gameId)}>
          {box}
        </Link>
      );
    }
    else {
      content = (
        <span>{box}</span>
      )
    }
    return (
      <div className='box-container' style={style}>
        {content}
      </div>
    );
  }
}

let Plus = (props) => {
  let className = cx(
    'plus',
    {
      off: props.position == 0,
      dot: props.position == 1
    }
  )
  return(
    <div className={className}>
      <HoverWiggle off={props.position < 2}>
        <div className='dot-front' onClick={props.onClick}/>
        <div className='vertical'/>
        <div className='horizontal' onClick={props.onClick}/>
        <div className='shadow-fix' onClick={props.onClick}/>
        <div className='dot-shadow'/>
      </HoverWiggle>
    </div>
  )
}

let getGameClassName = (position) => {
  return cx(
    'game',
    {
      off: position == 0
    }
  );
}

const NEW_GAME_ANIMATION_STEPS = [1600, 10, 900, 10, 900, 0]



class NewGame extends React.Component {
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
    if (this.state.newGameStatus < NEW_GAME_ANIMATION_STEPS.length) {
      duration = NEW_GAME_ANIMATION_STEPS[this.state.newGameStatus];
    }
    if (duration) {
      this.setState({ newGameStatus: this.state.newGameStatus + 1 });
      this.setTimeout(this.newGameAnimation.bind(this), duration);
    }
  }
  componentWillReceiveProps(newProps) {
    if (this.props.isTarget != newProps.isTarget) {
      if (newProps.isTarget) {
        this.newGameAnimation();
      }
      else {
        this.cancelNewGame();
      }
    }
  }
  componentDidMount() {
    if (this.props.isTarget) {
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
    let duration = NEW_GAME_ANIMATION_STEPS[this.state.newGameStatus - 1];
    this.setState({ newGameStatus: this.state.newGameStatus - 1 });
    this.setTimeout(this.cancelNewGame.bind(this), duration);
  }
  render() {
    let plusPosition = Math.min(this.props.position, 2);
    if (this.props.position >= 2) {
      if (this.state.newGameStatus == 1) {
        plusPosition = Math.min(plusPosition, 1);
      }
    }
    let content = (
      <Link route={this.props.route.push('new')}>
        <Plus position={plusPosition}
              entering={this.props.entering}
              leaving={this.props.leaving}/>
      </Link>
    )
    if (this.state.newGameStatus >= 2) {
      let iconPosition = 1;
      let boxPosition = 0;
      if (this.props.position < 3) {
        iconPosition = this.props.position;
      }
      else
      {
        if (this.state.newGameStatus >= 3) {
          iconPosition = 2;
        }
        if (this.state.newGameStatus >= 4 && this.props.position >= 4) {
          boxPosition = 1;
        }
        let gameTypeSelector = null;
      }
      content = (
        <div>
          <GameIcon route={this.props.route}
                    position={iconPosition}
                    gameClass={this.props.gameClass}/>
          <GameBox route={this.props.route}
                   gameId='new'
                   position={boxPosition}
                   name='New Game'
                   transition={true}/>
        </div>
      )
    }
    return (
      <div className={getGameClassName(this.props.position)}>
        {content}
      </div>
    );
  }
}

let OldGame = (props) => {
  let iconPosition = Math.min(props.position, 3);
  let boxPosition = Math.max(props.position - 3, 0);
  return (
    <div className={getGameClassName(props.position)}>
      <GameIcon route={props.route}
                position={iconPosition}
                entering={props.entering}
                leaving={props.leaving}
                gameId={props.gameId}
                gameClass={props.gameClass}
                go={false}/>
      <GameBox route={props.route}
               name={props.name}
               position={boxPosition}
               gameId={props.gameId}
               transition={props.transition}/>
    </div>
  );
}

const GAME_ANIMATION_STEPS_ENTERING = [ 700, 700, 700, 700 ]

const GAME_ANIMATION_STEPS_EXITING =  [ 700, 700, 100, 100 ]

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
    if (this.state.position < GAME_ANIMATION_STEPS_ENTERING.length) {
      duration = GAME_ANIMATION_STEPS_ENTERING[this.state.position];
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
      duration = GAME_ANIMATION_STEPS_EXITING[this.state.position - 1];
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
    let content = null;
    let gameClass = null;
    if (this.props.type != null) {
      gameClass = GameTypes[this.props.type]
    }
    if (this.props.name == null) {
      let position = this.props.type == null ? this.state.position : 3;
      content = (
        <NewGame route={this.props.route}
                 position={position}
                 entering={this.state.entering}
                 leaving={this.state.leaving}
                 isTarget={this.props.isTarget}
                 gameClass={gameClass}/>
      )
    }
    else {
      content = (
        <OldGame route={this.props.route}
                 name={this.props.name}
                 position={this.state.position}
                 entering={this.state.entering}
                 leaving={this.state.leaving}
                 gameId={this.props.gameId}
                 isTarget={this.props.isTarget}
                 gameClass={gameClass}
                 transition={this.props.transition}/>
      )
    }
    return content;
  }
}

export default Game;
