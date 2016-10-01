'use strict'

import React from 'react';
import ReactTransitionGroup from 'react-addons-transition-group';
import { browserHistory } from 'react-router';
import { Link } from 'react-router';
import cx from 'classnames';
import GameApi from 'api/game.js'
import { HoverWiggle } from 'utils/hover-animate.js';
import './games.scss';

let GameIcon = (props) => {
  let className = cx(
    'icon',
    {
      off: props.position == 0,
      dot: props.position == 1,
      entering: props.entering,
      leaving: props.leaving,
      closed: props.closed
    }
  )
  return (
    <Link to={{pathname: '/', query: {game: props.gameId}}}>
      <div className={className}/>
    </Link>
  );
}

class GameBox extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      width: 0
    }
  }
  componentDidUpdate(prevProps, prevState) {
    let {scrollWidth, innerText} = this.refs.box;
    if (scrollWidth != this.state.width) {
      this.setState({width: scrollWidth});
    }
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
    return (
      <div className='box-container' style={style}>
        <Link to={{pathname: '/', query: {game: this.props.gameId}}}>
          <div className={className}
               ref='box'>
            {this.props.name}
          </div>
        </Link>
      </div>
    )
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

let getGameClassName = (swipe, position) => {
  return cx(
    'game',
    {
      swipe: swipe != 0,
      left: swipe < 0,
      right: swipe > 0,
      off: swipe <= -2 || swipe >= 2 || position == 0
    }
  );
}

const NEW_GAME_ANIMATION_STEPS = [
  700,
  10,
  700,
  10,
  700,
  0
]

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
    console.log('NEW GAME ANIMATION: ' + this.state.newGameStatus);
    let duration = NEW_GAME_ANIMATION_STEPS[this.state.newGameStatus];
    console.log('duration=' + duration);
    if (duration) {
      this.setState({ newGameStatus: this.state.newGameStatus + 1 });
      this.setTimeout(this.newGameAnimation.bind(this), duration);
    }
  }
  plus() {
    this.newGameAnimation();
  }
  componentWillUnmount() {
    clearTimeout(this.timeout);
  }
  cancelNewGame() {
    console.log('CANCEL NEW GAME: ' + this.state.newGameStatus);
    if (this.state.newGameStatus == 0) {
      return;
    }
    let duration = NEW_GAME_ANIMATION_STEPS[this.state.newGameStatus - 1];
    console.log('duration=' + duration);
    this.setState({ newGameStatus: this.state.newGameStatus - 1 });
    this.setTimeout(this.cancelNewGame.bind(this), duration);
  }
  render() {
    let plusPosition = this.props.position;
    let plusOnClick = null;
    if (this.state.newGameStatus == 0) {
      plusOnClick = this.plus.bind(this);
    }
    if (this.state.newGameStatus == 1) {
      plusPosition = 1
    }
    let content = (
      <Plus position={plusPosition}
            entering={this.props.entering}
            leaving={this.props.leaving}
            onClick={plusOnClick}/>
    );
    if (this.state.newGameStatus >= 2) {
      let iconPosition = 1;
      if (this.state.newGameStatus >= 3) {
        iconPosition = 2;
      }
      let cancel = null;
      if (this.state.newGameStatus >= 4) {
        let cancelClassName = cx(
          'cancel',
          'home-button',
          {
            off: this.state.newGameStatus == 4
          }
        )
        cancel = (
          <div className={cancelClassName}
               onClick={this.cancelNewGame.bind(this)}>
            x
          </div>
        )
      }
      let gameTypeSelector = null;
      content = (
        <div>
          <GameIcon position={iconPosition} closed/>
          {cancel}
        </div>
      )
    }
    return (
      <div className={getGameClassName(this.props.swipe, this.props.position)}>
        {content}
      </div>
    );
  }
}

let OldGame = (props) => {
  let iconPosition = Math.min(props.position, 3);
  let boxPosition = Math.max(props.position - 3, 0);
  return (
    <div className={getGameClassName(props.swipe, props.position)}>
      <GameIcon position={iconPosition}
                entering={props.entering}
                leaving={props.leaving}
                gameId={props.gameId}/>
      <GameBox name={props.name}
               position={boxPosition}
               gameId={props.gameId}/>
    </div>
  );
}

class Game extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      entering: false,
      leaving: false,
      position: 0
    }
    this.timeout = null;
    this.enterCallback = null;
    this.leaveCallback = null;
    this.ready = true;
  }
  componentDidUpdate(prevProps, prevState) {
    if (!this.timeout) {
      let duration = 300;
      if (this.state.entering) {
        if (this.state.position == 2 || this.state.position == 1) {
          duration = 300;
        }
        this.timeout = setTimeout(() => {
          this.timeout = null;
          if (this.state.position < 4) {
            this.setState({position: this.state.position + 1});
          }
          else if (this.enterCallback) {
            this.enterCallback();
            this.enterCallback = null;
          }
        }, duration);
      }
      else if (this.state.leaving) {
        if (this.state.position >= 1) {
          duration = 500;
        }
        this.timeout = setTimeout(() => {
          this.timeout = null;
          if (this.state.position > 0) {
              this.setState({position: this.state.position - 1});
          }
          else if (this.leaveCallback) {
            this.leaveCallback();
          }
        }, 500);
      }
    }
  }
  componentWillUnmount() {
    clearTimeout(this.timeout);
  }
  componentWillEnter(callback) {
    this.enterCallback = callback;
    this.setState({entering: true});
  }
  componentDidEnter() {
    this.setState({
      entering: false
    })
    this.props.doneEntering();
  }
  componentWillLeave(callback) {
    this.leaveCallback = callback;
    this.setState({
      leaving: true
    });
  }
  componentDidLeave() {
    this.props.doneLeaving();
  }
  render() {
    let content = null;
    if (this.props.newGame) {
      content = (
        <NewGame position={this.state.position}
                 entering={this.state.entering}
                 leaving={this.state.leaving}
                 swipe={this.props.swipe}/>
      )
    }
    else {
      content = (
        <OldGame name={this.props.name}
                 position={this.state.position}
                 entering={this.state.entering}
                 leaving={this.state.leaving}
                 gameId={this.props.gameId}
                 swipe={this.props.swipe}/>
      )
    }
    return content;
  }
}

class Games extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      activeGames: 0,
      loaded: false,
      entering: false,
      leaving: false,
      animation: 0,
      games: [],
      gameHash: {}
    };
    this.gamesDoneEntering = 0;
    this.gamesDoneLeaving = 0;
    this.callback = null;
    this.timeout = null;
    this.refreshInterval = null;
  }
  getGames() {
    let gameHash = {}
    let resolve = (data) => {
      let games = [];
      for (let i=0; i < data.length; i++) {
        let newGame = {
          name: data[i].name,
          id: data[i].id,
          type: data[i].type
        };
        let index = this.state.gameHash[newGame.id];
        if (index) {
          let game = this.state.games[index];
          if (game) {
            newGame.active = true;
          }
        }
        games.push(newGame);
        gameHash[newGame.id] = i;
      }
      let activeGames = 0;
      if (!this.state.entering && !this.state.leaving && this.state.loaded) {
        activeGames = games.length + 1;
      }
      let target = this.state.target;
      let animation = this.state.animation;
      if (this.props.target in gameHash) {
        target = this.props.target;
        if (!this.state.loaded) {
          animation = 2;
        }
      }
      else
      {
        browserHistory.push('/');
      }
      this.setState({
        games: games,
        gameHash: gameHash,
        activeGames: activeGames,
        loaded: true,
        target: target,
        animation: animation
      })
    }
    let reject = (code, message) => {
      let error = 'ereror + code';
      if (message) {
        error += ': ' + message
      }
      console.error(error);
      if (code == 401) {
        this.props.signOut();
      }
    }
    GameApi.index(resolve, reject);
  }
  componentDidMount() {
    this.getGames();
  }
  componentWillUnmount() {
    clearInterval(this.refreshInterval);
  }
  animateInGames(callback) {
    let activeGames = this.state.activeGames;
    if (this.state.loaded) {
      activeGames = this.state.activeGames + 1;
      this.setState({
        activeGames: activeGames,
        entering: true
      });
    }
    if (activeGames < this.state.games.length + 1) {
      setTimeout(() => {this.animateInGames(callback)}, 200);
    }
    else {
      callback();
    }
  }
  animateOutGames() {
    this.setState({
      leaving: true
    });
    if (!this.state.entering) {
      this.setState({
        activeGames: this.state.activeGames - 1,
      });
      if (this.state.activeGames > 0) {
        setTimeout(() => {this.animateOutGames()}, 100);
      }
    }
  }
  onGameDoneEntering() {
    this.gamesDoneEntering++;
    if (this.gamesDoneEntering == this.gamesEnteringCount) {
      this.setState({
        entering: false
      })
      if (this.state.leaving) {
        this.animateOutGames();
      }
    }
  }
  onGameDoneLeaving() {
    this.gamesDoneLeaving++;
    if (this.gamesDoneLeaving == this.state.games.length + 1) {
      setTimeout(() => {if (this.callback) {this.callback()}});
    }
  }
  componentWillEnter(callback) {
    this.gamesEnteringCount = this.state.games.length + 1;
    this.animateInGames(callback);
  }
  componentWillLeave(callback) {
    clearInterval(this.refreshInterval);
    this.callback = callback;
    this.animateOutGames();
  }
  componentDidLeave() {
    this.props.doneAnimating();
  }
  hasTarget(target) {
    return target != undefined && target in this.state.gameHash;
  }
  componentWillMount() {
    if (this.hasTarget(this.props.target)) {
      this.setState({
        animation: 2,
        target: this.props.target
      });
    }
  }
  componentWillReceiveProps(newProps) {
    let hasTarget = this.hasTarget(newProps.target);
    let hadTarget = this.hasTarget(this.props.target);
    if (hasTarget != hadTarget) {
      let target = null;
      let animation = 1;
      if (hasTarget) {
        target = newProps.target;
      }
      else {
        target = this.props.target;
      }
      this.setState({
        animation: 1,
        target: target,
      });
    }
  }
  componentDidUpdate(prevProps, prevState) {
    if (this.state.animation != prevState.animation ||
        this.props.target != prevProps.target) {
      if (this.state.animation == 1) {
        if (this.hasTarget(this.props.target)) {
          clearTimeout(this.timeout);
          this.timeout = setTimeout(() => {
            this.setState({animation: 2});
          }, 500)
        }
        else {
          let duration = 500;
          clearTimeout(this.props.target);
          this.timeout = setTimeout(() => {
            this.setState({animation: 0});
          }, duration);
        }
      }
    }

  }
  render() {
    let games = [];
    let alternate = 1;
    if (this.state.animation == 2) {
      alternate = 2;
    }
    let length = Math.min(this.state.activeGames, this.state.games.length);
    for (let i=0; i < length; i++) {
      let game = this.state.games[i];
      let isTarget = this.props.target == game.id;
      let wasTarget = this.state.target == game.id;
      let swipe = 0;
      if (this.hasTarget(this.props.target) && !wasTarget) {
        swipe = alternate;
        alternate *= -1;
      }
      games.push(
        <Game name={game.name}
              key={game.id}
              gameId={game.id}
              doneEntering={this.onGameDoneEntering.bind(this)}
              doneLeaving={this.onGameDoneLeaving.bind(this)}
              isTarget={isTarget}
              swipe={swipe}>
        </Game>
      );
    }
    if (this.state.activeGames == this.state.games.length + 1) {
      let swipe = 0;
      if (this.hasTarget(this.props.target)) {
        swipe = alternate;
      }
      games.push(
        <Game newGame
              key='new'
              doneEntering={this.onGameDoneEntering.bind(this)}
              doneLeaving={this.onGameDoneLeaving.bind(this)}
              swipe={swipe}/>
      );
    }
    let backClass = cx(
      'back',
      'home-button',
      {
        off: !this.hasTarget(this.props.target) ||
              this.state.entering ||
              this.state.leaving ||
              this.state.activeGames == 0
      }
    )
    return (
      <div id='games'>
        <Link to='/' className={backClass}>&lt;</Link>
        <ReactTransitionGroup>
          {games}
        </ReactTransitionGroup>
      </div>
    );
  }
}

export default Games;
