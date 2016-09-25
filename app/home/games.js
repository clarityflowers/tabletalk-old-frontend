'use strict'

import React from 'react';
import ReactTransitionGroup from 'react-addons-transition-group';
import cx from 'classnames';
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
    <div className={className}/>
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
    return (
      <div className='box-container' style={style}>
        <div className='box' ref='box'>
        {this.props.name}
        </div>
      </div>
    )
  }
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
      let duration = 500;
      if (this.state.entering) {
        if (this.state.position == 1) {
          duration = 700;
        }
        this.timeout = setTimeout(() => {
          this.timeout = null;
          if (this.state.position < 3) {
            this.setState({position: this.state.position + 1});
          }
          else if (this.enterCallback) {
            this.enterCallback();
            this.enterCallback = null;
          }
        }, duration);
      }
      else if (this.state.leaving) {
        if (this.state.position == 0) {
          duration = 700;
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
    let iconPosition = Math.min(this.state.position, 2);
    let boxPosition = Math.max(this.state.position - 2, 0);
    return (
      <div className='game'>
        <GameIcon position={iconPosition}
                  entering={this.state.entering}
                  leaving={this.state.leaving}/>
        <GameBox name={this.props.name}
                 position={boxPosition}/>
      </div>
    );
  }
}

class Games extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      activeGames: 0,
      entering: false,
      leaving: false
    };
    this.gamesDoneEntering = 0;
    this.gamesDoneLeaving = 0;
    this.callback = null;
    this.games = [
      {
        name: "Stranger Worlds",
        type: 0,
        id: 1
      },
      {
        name: "Apocalybs3 Worlb",
        type: 0,
        id: 3
      },
      {
        name: "MONSTE2HEA2TS",
        type: 0,
        id: 4
      },
      {
        name: "World of Adventure",
        type: 0,
        id: 2
      }
    ];
  }
  animateInGames(callback) {
    console.log('ANIMATE IN GAMES');
    this.setState({
      activeGames: this.state.activeGames + 1,
      entering: true
    });
    if (this.state.activeGames < this.games.length) {
      setTimeout(() => {this.animateInGames(callback)}, 300);
    }
    else {
      callback();
    }
  }
  animateOutGames() {
    console.log('ANIMATE OUT GAMES');
    this.setState({
      leaving: true
    });
    if (!this.state.entering) {
      this.setState({
        activeGames: this.state.activeGames - 1,
      });
      if (this.state.activeGames > 0) {
        setTimeout(() => {this.animateOutGames()}, 300);
      }
    }
  }
  onGameDoneEntering() {
    console.log('ON GAME DONE ENTERING');
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
    console.log('ON GAME DONE LEAVING');
    this.gamesDoneLeaving++;
    if (this.gamesDoneLeaving == this.games.length) {
      setTimeout(() => {this.callback()});
    }
  }
  componentWillEnter(callback) {
    console.log('COMPONENT WILL ENTER');
    if (this.games.length == 0) {
      callback();
    }
    else {
      this.gamesEnteringCount = this.games.length;
      this.animateInGames(callback);
    }
  }
  componentWillLeave(callback) {
    console.log('COMPONENT WILL LEAVE');
    this.callback = callback;
    if (this.games.length == 0) {
      callback();
    }
    else {
      this.animateOutGames();
    }
  }
  componentDidLeave() {
    console.log('COMPONENT DID LEAVE');
    this.props.doneAnimating();
  }
  render() {
    let games = [];
    for (let i=0; i < this.games.length && i < this.state.activeGames; i++) {
      games.push(
        <Game name={this.games[i].name}
              key={this.games[i].id}
              doneEntering={this.onGameDoneEntering.bind(this)}
              doneLeaving={this.onGameDoneLeaving.bind(this)}/>
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
