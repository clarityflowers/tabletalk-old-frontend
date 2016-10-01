'use strict'

import React from 'react';
import ReactTransitionGroup from 'react-addons-transition-group';
import { browserHistory } from 'react-router';
import { Link } from 'react-router';
import cx from 'classnames';
import GameApi from 'api/game.js'
import './games.scss';

let GameIcon = (props) => {
  let className = cx(
    'icon',
    {
      off: props.position == 0,
      dot: props.position == 1,
      entering: props.entering,
      leaving: props.leaving
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
      <div className='dot-front'/>
      <div className='vertical'/>
      <div className='horizontal'/>
      <div className='shadow-fix'/>
      <div className='dot-shadow'/>
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

let NewGame = (props) => {
  return (
    <div className={getGameClassName(props.swipe, props.position)}>
      <Plus position={props.position}
            entering={props.entering}
            leaving={props.leaving}/>
    </div>
  )
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
    console.log('GET GAMES');
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
        console.log(this.state.entering)
        activeGames = games.length + 1;
      }
      let target = this.state.target;
      if (this.props.target in gameHash) {
        target = this.props.target;
      }
      else
      {
        browserHistory.push('/');
      }
      let animation = this.state.animation;
      if (!this.state.loaded) {
        animation = 2;
      }
      this.setState({
        games: games,
        gameHash: gameHash,
        activeGames: activeGames,
        loaded: true,
        target: target,
        animation: animation
      })
      console.log('success');
      console.log(games);
    }
    let reject = (code, message) => {
      console.error('error ' + code);
      if (message) {
        console.log(message);
      }
      if (code == 401) {
        this.props.signOut();
      }
    }
    GameApi.index(resolve, reject);
  }
  componentDidMount() {
    this.getGames();
    this.refreshInterval = setInterval(this.getGames.bind(this), 5000);
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
    return target in this.state.gameHash;
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
      if (this.state.animation) {
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
