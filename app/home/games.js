'use strict'

import React from 'react';
import ReactTransitionGroup from 'react-addons-transition-group';
import { browserHistory } from 'react-router';
import { Link } from 'react-router';
import cx from 'classnames';
import GameApi from 'api/game.js';
import { HoverWiggle } from 'utils/hover-animate.js';
import Game from './game.js';
import './games.scss';

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
      gameHash: {},
      queue: [],
      creatingNewGame: false,
    };
    this.gamesDoneEntering = 0;
    this.gamesDoneLeaving = 0;
    this.enterCallback = null;
    this.leaveCallback = null;
    this.timeout = null;
    this.refreshInterval = null;
  }
  /* ---------- lifecycle ----------------------------------------------------*/
  componentDidMount() {
    if (this.props.params.game) {
      this.preview('967a2eae-acf9-4d5f-adcd-edf53f73b2dd');
    }
    else if (this.props.auth.online) {
      this.startPolling();
    }
  }
  componentWillReceiveProps(newProps) {
    if (
      this.props.params.game == 'new' &&
      newProps.params.game &&
      newProps.params.game != 'new'
    ) {
      this.load();
    }
    let hasTarget = newProps.params.game == 'new' || this.hasGame(newProps.params.game);
    let hadTarget = this.props.params.game == 'new' || this.hasTarget();
    if (!this.props.params.game && newProps.params.game && !hasTarget) {
      this.preview(newProps.params.game);
    }
    if (hasTarget != hadTarget) {
      let games = this.state.games;
      if (hasTarget) {
        let target = newProps.params.game;
        for (let i=games.length - 1; i >= 0; i--) {
          let game = games[i];
          if (game.id != target) {
            this.queue(game.id);
          }
        }
      }
      else {
        if (newProps.auth.online) {
          if (this.refreshInterval == null) {
            this.startPolling();
          }
          let target = this.props.params.game;
          for (let i=0; i < games.length; i++) {
            let game = games[i];
            if (!game.isVisible) {
              this.queue(game.id);
            }
          }
          this.setState((state) => {
            let games = state.games.slice(0);
            let game = games[state.gameHash['new']];
            if (game) {
              game.name = null;
              game.type = null;
              games[state.gameHash['new']] = game;
            }
            return ({games: games});
          })
        }
        else {
          this.setState({
            games: [],
            gameHash: {},
            queue: []
          })
        }
      }
    }
    if (this.props.auth.online != newProps.auth.online) {
      if (newProps.auth.online) {
        if (newProps.params.game) {
          this.preview(newProps.params.game);
        }
        else {
          this.startPolling();
          if (this.state.creatingNewGame) {
            let game = this.state.games[this.state.gameHash['new']];
            this.createGame({
              name: game.name,
              type: game.type,
              player: game.players[0].name
            })
          }
        }
      }
      else {
        this.stopPolling();
        if (newProps.params.game) {
          setTimeout(() => {
            this.props.doneAnimating();
          }, 700);
        }
        else {
          this.gamesDoneLeaving = 0;
          for (let i=this.state.games.length - 1; i >= 0; i--) {
            if (
              this.state.games[i].id != this.props.params.game &&
              this.state.games[i].isVisible
            ) {
              this.queue(this.state.games[i].id);
            }
          }
        }
      }
    }
  }
  componentDidUpdate(prevProps, prevState) {
    if (this.state.animation != prevState.animation ||
        this.props.params.game != prevProps.params.game) {
      if (this.state.animation == 1) {
        if (this.hasTarget(this.props.params.game)) {
          clearTimeout(this.timeout);
          this.timeout = setTimeout(() => {
            this.setState({animation: 2});
          }, 500)
        }
        else {
          let duration = 500;
          clearTimeout(this.props.params.game);
          this.timeout = setTimeout(() => {
            this.setState({animation: 0});
          }, duration);
        }
      }
    }
    if (this.state.queue.length && !prevState.queue.length) {
      this.processQueue();
    }
    let prevNewGame = prevState.games[prevState.games.length -1];
    let newGame = this.state.games[this.state.games.length -1]
    if (
      prevProps.params.game == 'new' && this.props.params.game == 'new' &&
      prevNewGame && newGame &&
      prevNewGame.id == 'new' && newGame.id != 'new'
    ) {
      browserHistory.replace(`/games/${newGame.id}`);
      setTimeout(() => {
        this.setState({creatingNewGame: false})
      }, 1000);
    }
  }
  componentWillLeave(callback) {
    clearInterval(this.refreshInterval);
    this.leaveCallback = callback;
    this.gamesDoneLeaving = 0;
    for (let i=this.state.games.length - 1; i >= 0; i--) {
      if (this.state.games[i].isVisible) {
        this.queue(this.state.games[i].id);
      }
    }
    this.setState({leaving: true});
  }
  componentDidLeave() {
    this.props.doneAnimating();
  }
  componentWillUnmount() {
    this.stopPolling();
  }
  /* ---------- queue --------------------------------------------------------*/
  queue(id) {
    this.setState((state) => {
      let queue = state.queue.slice(0);
      queue.push(id);
      return {queue: queue};
    });
  }
  dequeue() {
    let queue = this.state.queue.slice(0);
    if (!queue.length) {
      return null;
    }
    let result = queue.shift();
    this.setState((state) => ({
      queue: state.queue.slice(1)
    }));
    return result;
  }
  processQueue() {
    let id = this.dequeue();
    if (id != null) {
      let i = this.state.gameHash[id];
      let games = this.state.games;
      games[i].isVisible = !games[i].isVisible;
      this.setState({
        games: games
      });
      setTimeout(this.processQueue.bind(this), 100);
    }
  }
  /* ---------- preview ------------------------------------------------------*/
  updateFromPreview(data) {
    let game = data;
    let index = this.state.gameHash['preview'];
    console.log('UPDATE FROM PREVIEW');
    console.log(index);
    console.log(this.state.games[index]);
    console.log(game.id);
    if (
      index != undefined &&
      this.state.games[index] &&
      this.state.games[index].id == game.id
    ) {
      console.log(this.state.games[index].id)
      console.log('preview already present');
      game.isVisible = this.state.games[index].isVisible;
    }
    else {
      game.isVisible = false;
    }
    let games = [game];
    let gameHash = {
      [games[0].id]: 0,
      preview: 0
    }
    this.setState({games: games, gameHash: gameHash});
    if (!game.isVisible) {
      this.queue(games[0].id);
    }
  }
  preview(id) {
    if (!('preview' in this.state.gameHash)) {
      console.log('clearing games');
      this.setState({
        games: [],
        gameHash: {}
      })
    }
    console.log('PREVIEW ' + id);
    this.stopPolling();
    GameApi.show({game: id}, this.updateFromPreview.bind(this), null);
  }

  /* ---------- loading ------------------------------------------------------*/
  update(data) {
    let games = [];
    let gameHash = {};
    let queue = this.state.queue.slice(0);
    let hasTarget = false;
    let oldNew = null;
    if (this.hasGame('new')) {
      oldNew = this.getGame('new');
    }
    data.push({
      name: oldNew ? oldNew.name : null,
      id: 'new',
      type: oldNew ? oldNew.type : null,
      maxPlayers: null,
      me: 0,
      players: oldNew ? oldNew.players : []
    })
    for (let i=0; i < data.length; i++) {
      let newGame = {
        name: data[i].name,
        id: data[i].id,
        type: data[i].type,
        maxPlayers: data[i].maxPlayers,
        players: data[i].players,
        me: data[i].me,
        isVisible: false
      };
      if (newGame.id == this.props.params.game) {
        hasTarget = true;
      }
      let game = this.getGame(newGame.id);
      if (game && game.id == newGame.id) {
        newGame.isVisible = game.isVisible;
      }
      else {
        if (this.props.params.game) {
          if (newGame.id == this.props.params.game) {
            queue.push(newGame.id);
          }
        }
        else {
          queue.push(newGame.id);
        }
      }
      gameHash[newGame.id] = i;
      games.push(newGame);
    }
    this.setState({
      games: games,
      gameHash: gameHash,
      loaded: true
    });
    while (queue.length) {
      this.queue(queue.shift());
    }
    if (this.props.params.game && !hasTarget) {
      browserHistory.push('/games');
      for (let i=0; i < games.length; i++) {
        this.queue(games[i].id);
      }
    }
  }
  load() {
    let gameHash = {}
    let reject = (code, message) => {
      let error = 'error' + code;
      if (message) {
        error += ': ' + message
      }
      if (code == 401) {
        this.props.auth.signOut();
      }
      console.error(error);
    }
    GameApi.index(this.update.bind(this), reject);
  }
  startPolling() {
    this.load();
    clearInterval(this.refreshInterval);
    this.refreshInterval = setInterval(this.load.bind(this), 20000);
  }
  stopPolling() {
    clearInterval(this.refreshInterval);
    this.refreshInterval = null;
  }
  setGame(game, id) {
    if (!id) {
      id = game.id;
    }
    let games = this.state.games.slice(0);
    let gameHash = Object.assign({}, this.state.gameHash);
    games[gameHash[id]] = game;
    gameHash[game.id] = gameHash[id];
    this.setState({
      games: games,
      gameHash: gameHash
    })
  }
  createGame({name, type, player}) {
    let game = {
      type: type,
      name: name,
      player: player
    };
    let resolve = (data) => {
      let game = data;
      game.isVisible = true;
      this.setGame(game, 'new');
    };
    let reject = ({code, message}) => {
      if (code == 401) {
        this.props.auth.signOut();
      }
    }
    GameApi.create(game, resolve, reject);
  }
  joinGame(player) {
    let resolve = (data) => {
      let game = data
      game.isVisible = true;
      this.setGame(game);
    }
    let reject = ({code, message}) => {
      if (code == 401) {
        this.props.auth.signOut();
        setTimeout(() => {
          let games = this.state.games.slice(0);
          let index = this.state.gameHash[this.props.params.game]
          let game = Object.assign({}, games[index]);
          let players = game.players.slice(0);
          players.pop();
          game.players = players;
          games[index] = game;
          this.setState({games: games});
        }, 1000)
      }
    }
    GameApi.join({player: player}, resolve, reject);
  }
  /* ---------- utilities ----------------------------------------------------*/
  getGame(id) {
    let game = null;
    if (this.hasGame(id)) {
      game = this.state.games[this.state.gameHash[id]];
    }
    return game;
  }
  hasGame(id) {
    return (
      id != undefined &&
      id in this.state.gameHash
    );
  }
  hasTarget() {
    let target = this.props.params.game;
    return this.hasGame(target);
  }
  game(i) {
    let game = this.state.games[i];
    return (
      <Game name={game.name}
            key={game.id}
            gameId={game.id}
            doneLeaving={this.onGameDoneLeaving.bind(this)}
            isTarget={this.props.params.game == game.id}
            type={game.type}
            transition={!this.state.creatingNewGame}>
      </Game>
    )
  }
  /* ---------- handlers -----------------------------------------------------*/
  onGameDoneLeaving() {
    this.gamesDoneLeaving++;
    let finalValue = this.hasTarget() ? 1 : this.state.games.length
    if (this.state.leaving && this.gamesDoneLeaving == finalValue) {
      setTimeout(() => {if (this.leaveCallback) {this.leaveCallback()}}, 0);
    }
  }
  handleUpdateGameDetails({
    type = null,
    name = null,
    player = null,
    join = null,
    id = null
  }
  ) {
    this.setState((state) => {
      if (id == null) {
        id = 'new;'
      }
      let games = state.games.slice(0);
      let gameHash = Object.assign({}, state.gameHash);
      let game = Object.assign({}, games[gameHash[id]]);
      let players = game.players.slice(0);
      let creatingNewGame = false;
      if (type != null) {
        game.type = type;
      }
      else if (name != null) {
        game.name = name;
      }
      else if (player != null) {
        players = [{
          name: player,
          admin: true
        }]
        game.me = 0;
        this.createGame({
          name: game.name,
          type: game.type,
          player: player
        });
        creatingNewGame = true;
      }
      else if (join != null) {
        players.push({
          name: join,
          admin: false
        })
        this.joinGame(join);
      }
      game.players = players;
      games[gameHash[id]] = game;
      return ({
        games: games,
        creatingNewGame: creatingNewGame
      });
    })
  }
  /* ---------- render -------------------------------------------------------*/
  render() {
    let games = [];
    let alternate = 1;
    if (this.state.animation == 2) {
      alternate = 2;
    }
    let hadTarget = this.hasTarget(this.state.target);
    let hasTarget = this.hasTarget(this.props.params.game);
    let target = hasTarget ? (this.props.params.game) : null;
    for (let i=0; i < this.state.games.length; i++) {
      let game = this.state.games[i];
      if (game.isVisible) {
        games.push(this.game(i));
      }
    }
    let backClass = cx(
      'back',
      {
        off: (
          !this.hasTarget(this.props.params.game) ||
          this.state.loading ||
          this.state.leaving ||
          this.state.games.length == 0
        )
      }
    )
    let children = this.props.children;
    if (
      this.state.loading ||
      !this.props.auth.online ||
      this.state.leaving || (
        this.props.params.game != 'new' &&
        !this.hasTarget()
      )
    ) {
      children = null;
    }
    if (children) {
      let game = this.state.games[this.state.gameHash[this.props.params.game]];
      if (game == null) {
        game = {
          id: 'new',
          name: null,
          type: null,
          maxPlayers: null,
          players: [],
          me: null
        }
      }
      children = React.cloneElement(children, {
        key: 'game',
        auth: this.props.auth,
        updateGame: this.handleUpdateGameDetails.bind(this),
        game: {
          id: game.id,
          name: game.name,
          type: game.type,
          maxPlayers: game.maxPlayers,
          players: game.players,
          me: game.me
        }
      });
    }
    return (
      <div id='games'>
        <HoverWiggle className={backClass}>
          <Link to='/games' className='home-button'>&lt;</Link>
        </HoverWiggle>
        <ReactTransitionGroup component='div'>
          {games}
        </ReactTransitionGroup>
        <ReactTransitionGroup component='div' className='children'>
          {children}
        </ReactTransitionGroup>
      </div>
    );
  }
}

export default Games;
