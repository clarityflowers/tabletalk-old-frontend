import React from 'react';
import cx from 'classnames';
import { GameTypes } from 'utils/enums.js';
import Game from 'api/game.js'
import './game-details.scss';

class GameDetails extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      off: true,
      loading: true,
      show: false,
      height: 100,
      game: {
        type: null,
        maxPlayers: 0,
        admin: false,
        players: []
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
    this.setTimeout(() => {
      this.enter(callback);
    }, 1500);
  }
  componentWillEnter(callback) {
    this.setTimeout(() => {
      this.enter(callback);
    }, 1500);
  }
  componentWillLeave(callback) {
    this.leave(callback);
  }
  componentDidUpdate(prevProps, prevState) {
    if (prevState.loading && !this.state.loading) {
      let {scrollHeight} = this.refs.content;
      if (scrollHeight != this.state.height) {
        this.setState({height: scrollHeight});
        setTimeout(() => {
          this.setState({show: true});
        }, 700);
      }
    }
  }
  update(game) {
    this.setState({
      game: game,
      loading: false
    });
  }
  load() {
    let gameId = this.props.params.game;
    let resolve = this.update.bind(this);
    let reject = (code, message) => {
      if (code == 401) {
        this.props.auth.signOut();
      }
    };
    Game.show(gameId, resolve, reject);
  }
  componentWillMount() {
    this.load();
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
        off: this.state.off
      }
    );
    let loadingClassName = cx(
      'loading',
      {
        off: this.state.show
      }
    )
    let style = {
      height: this.state.height
    }
    return (
      <div className={className} style={style}>
        <div className={loadingClassName}>Loading...</div>
        <div className='content' ref='content'>
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
      </div>
    )
  }
}

export default GameDetails;
