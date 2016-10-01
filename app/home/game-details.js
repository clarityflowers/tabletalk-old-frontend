import React from 'react';
import cx from 'classnames';
import { GameTypes } from 'utils/enums.js';
import './game-details.scss';

class GameDetails extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      game: {
        type: 0,
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
        ],
        maxPlayers: 5,
        admin: false
      }
    }
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
        <li className='player'>
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
    return (
      <div className='game-details'>
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
