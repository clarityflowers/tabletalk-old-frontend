import React from 'react';
import cx from 'classnames';
import { GameTypes } from 'utils/enums.js';
import './game-details.scss';

class GameDetails extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      off: true,
      loading: true,
      game: {
        type: 0,
        maxPlayers: 5,
        admin: false,
        players: [
          {
            name: 'cerisa',
            admin: true,
            me: true
          },
          {
            name: 'dimosar',
            admin: false,
            me: false
          }
        ]
      }
    };
    this.timeout = null;
  }
  setTimeout(resolve, duration) {
    clearTimeout(this.timeout);
    this.timeout = setTimeout(resolve, duration);
  }
  enter(callback) {
    this.setState({
      off: false
    });
    this.setTimeout(() => {
      callback();
    }, 700);
  }
  leave(callback) {
    this.setState({
      off: true
    });
    this.setTimeout(() => {
      callback();
    }, 700);
  }
  componentWillAppear(callback) {
    console.log('component will appear');
    this.setTimeout(() => {
      this.enter(callback);
    }, 1500);
  }
  componentWillEnter(callback) {
    console.log('component will enter');
    this.setTimeout(() => {
      this.enter(callback);
    }, 1500);
  }
  componentWillLeave(callback) {
    console.log('component will leave');
    this.leave(callback);
  }
  render() {
    let game = this.state.game;
    let players = [];
    for (let i=0; i < game.players.length; i++) {
      let player = game.players[i];
      let icon = 'u';
      if (player.admin) {
        icon = '*';
      }
      let iconClass = cx(
        'icon',
        {
          me: player.me
        }
      )
      players.push(
        <li className='player' key={player.name}>
          <span className={iconClass}>{icon}</span>
          <span className='name'>
            {player.name}
          </span>
        </li>
      )
    }
    let playerCount = game.players.length + ' ';
    if (game.maxPlayers) {
      playerCount += 'of ' + game.maxPlayers + ' player';
      if (game.maxPlayers > 1) {
        playerCount += 's';
      }
    }
    else {
      playerCount += 'player';
      if (game.players.length > 1) {
        playerCount + 's';
      }
    }
    let className = cx(
      'game-details',
      {
        loading: this.state.loading,
        off: this.state.off
      }
    );
    return (
      <div className={className}>
        <div className='header'>
          <span className='enter'>Enter</span>
        </div>
        <div className='details'>
          <div className='type'>
            {GameTypes[game.type]}
          </div>
          <div className='players'>
            <h1>{playerCount}</h1>
            <ul>{players}</ul>
          </div>
        </div>
      </div>
    )
  }
}

export default GameDetails;
