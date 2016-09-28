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
    let className = cx(
      'box',
      {
        off: this.props.position == 0
      }
    )
    return (
      <div className='box-container' style={style}>
        <div className={className} ref='box'>
        {this.props.name}
        </div>
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

let NewGame = (props) => {
  return (
    <div className='game'>
      <Plus position={props.position}
            entering={props.entering}
            leaving={props.leaving}/>
    </div>
  )
}

let OldGame = (props) => {
  let iconPosition = Math.min(props.position, 2);
  let boxPosition = Math.max(props.position - 2, 0);
  return (
    <div className='game'>
      <GameIcon position={iconPosition}
                entering={props.entering}
                leaving={props.leaving}/>
      <GameBox name={props.name}
               position={boxPosition}/>
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
    let content = null;
    if (this.props.newGame) {
      content = (
        <NewGame position={this.state.position}
                 entering={this.state.entering}
                 leaving={this.state.leaving}/>
      )
    }
    else {
      content = (
        <OldGame name={this.props.name}
                 position={this.state.position}
                 entering={this.state.entering}
                 leaving={this.state.leaving}/>
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
    let activeGames = this.state.activeGames + 1;
    this.setState({
      activeGames: activeGames,
      entering: true
    });
    if (activeGames < this.games.length + 1) {
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
    if (this.gamesDoneLeaving == this.games.length + 1) {
      setTimeout(() => {this.callback()});
    }
  }
  componentWillEnter(callback) {
    this.gamesEnteringCount = this.games.length + 1;
    this.animateInGames(callback);
  }
  componentWillLeave(callback) {
    this.callback = callback;
    this.animateOutGames();
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
              doneEntering={this.onGameDoneEntering.bind(this)}
              doneLeaving={this.onGameDoneLeaving.bind(this)}/>
      );
    }
    if (this.state.activeGames == this.games.length + 1) {
      games.push(
        <Game newGame
              key='new'
              doneEntering={this.onGameDoneEntering.bind(this)}
              doneLeaving={this.onGameDoneLeaving.bind(this)}/>
      );
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
