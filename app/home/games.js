'use strict'

import React from 'react';
import ReactTransitionGroup from 'react-addons-transition-group';
import cx from 'classnames';
import './games.scss';

let GameIcon = (props) => {
  return (
    <div className='game-icon'/>
  );
}

let GameBox = (props) => {
  return (
    <div className='game-box'>
      {props.name}
    </div>
  )
}

class Game extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      entering: false,
      leaving: false,
      animating: false
    }
  }
  componentWillEnter(callback) {
    this.setState({entering: true});
    setTimeout(() => {
      this.setState({animating: true});
      setTimeout(callback, 1000);
    }, 1);
  }
  componentDidEnter() {
    this.setState({
      animating: false,
      entering: false
    })
  }
  componentWillLeave(callback) {
    this.setState({leaving: true});
    setTimeout(() => {
      this.setState({animating: true});
      setTimeout(callback, 1000);
    }, 1);
  }
  componentDidLeave() {
    this.props.doneAnimating();
  }
  render() {
    let className = cx({
      leaving: this.props.leaving,
      entering: this.props.entering,
      animating: this.props.animating
    });
    return (
      <div className='game'>
      <GameIcon/>
      <GameBox name={this.props.name}/>
      </div>
    );
  }
}

class Games extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      activeGames: 0,
    };
    this.closedGames = 0;
    this.callback = null;
    this.games = [
      {
        name: "Stranger Worlds",
        type: 0,
        id: 1
      },
      {
        name: "World of Adventure",
        type: 0,
        id: 2
      }
    ];
  }
  animateInGames(callback) {
    this.setState({
      activeGames: this.state.activeGames + 1
    });
    if (this.state.activeGames < this.games.length) {
      setTimeout(() => {this.animateInGames(callback)}, 1000);
    }
    else {
      callback();
    }
  }
  animateOutGames() {
    this.setState({
      activeGames: this.state.activeGames - 1
    });
    if (this.state.activeGames > 0) {
      setTimeout(() => {this.animateOutGames()}, 1000);
    }
  }
  onGameDoneLeaving() {
    this.closedGames++;
    if (this.closedGames == this.games.length) {
      setTimeout(() => {this.callback()});
    }
  }
  componentWillEnter(callback) {
    if (this.games.length == 0) {
      callback();
    }
    else {
      this.animateInGames(callback);
    }
  }
  componentWillLeave(callback) {
    this.callback = callback;
    if (this.games.length == 0) {
      callback();
    }
    else {
      this.animateOutGames();
    }
  }
  componentDidLeave() {
    this.props.doneAnimating();
  }
  render() {
    let games = [];
    for (let i=0; i < this.games.length && i < this.state.activeGames; i++) {
      games.push(
        <Game name={this.games[i].name}
              key={this.games[i].id}
              doneAnimating={this.onGameDoneLeaving.bind(this)}/>
      )
    }
    return (
      <div id='games'>
        <ReactTransitionGroup>
          {games}
        </ReactTransitionGroup>
      </div>
    );
  }
}

export default Games;
