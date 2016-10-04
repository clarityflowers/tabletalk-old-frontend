import React from 'react';
import cx from 'classnames';
import { GameTypes } from 'utils/enums.js';
import Game from 'api/game.js'
import './game-details.scss';
import { HoverBuzz } from 'utils/hover-animate.js';

class GameDetails extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      off: true,
      loading: true,
      show: this.props.params.game == 'new',
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
  handleGameTypeClick(index) {
    this.props.onNewGameType(index);
  }
  render() {
    let game = this.state.game;
    let style = {};
    let content = null;
    if (this.props.params.game == 'new') {
      let gameTypes = [];
      for (let i=0; i < GameTypes.length; i++) {
        gameTypes.push(
          <HoverBuzz key={i}>
            <button className={`game-type ${GameTypes[i].className}`}
                    onClick={this.handleGameTypeClick.bind(this, i)}>
              {GameTypes[i].name}
            </button>
          </HoverBuzz>
        )
      }
      content = (
        <div className='content' ref='content'>
          <div className='header'>
            Choose a game
          </div>
          <div className='game-type-list'>
            {gameTypes}
          </div>
        </div>
      )
    }
    else {
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
      style = {
        height: this.state.height
      }
      let loadingClassName = cx(
        'loading',
        {
          off: this.state.show
        }
      )
      content = (
        <div>
          <div className={loadingClassName}>Loading...</div>
          <div className='content' ref='content'>
            <div className='header'>
              <span className='enter'>Enter</span>
            </div>
            <div className='details'>
              <div className='type'>
                {game.type ? GameTypes[game.type].name : ''}
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
    let className = cx(
      'game-details',
      {
        off: this.state.off
      }
    );
    return (
      <div className={className} style={style}>
        {content}
      </div>
    );
  }
}

export default GameDetails;
