import React from 'react';
import WorldOfAdventure from './world-of-adventure/app.js';
import BladesInTheDark from './blades-in-the-dark/app.js';
import { GameTypes } from 'utils/enums.js';
import { ACTIONS } from 'games/common/enums.js';

class GameStore extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      players: [],
      events: [],
      perform: null
    };
    this.playerHash = {},
    this.eventHash = {};
  }
  /* ---------- lifecycle ----------------------------------------------------*/
  componentDidMount() {
    this.setState({players: this.props.game.players});

  }
  componentWillUpdate (nextProps, nextState) {
    if (this.state.players.length != nextState.players.length) {
      this.updatePlayerHash(nextState.players);
    }
  }
  /* ---------- handlers -----------------------------------------------------*/
  handleTalk(message) {
    if (this.state.perform != null) {
      this.state.perform("talk", {message: message, request: 0});
    }
  }
  processEvent(data) {
    if (data.action == ACTIONS.TALK) {
      let chat = {
        id: data.id,
        action: ACTIONS.TALK,
        player: this.playerHash[data.player],
        message: data.message,
        date: new Date(data.timestamp)
      }
      this.logEvent(chat)
    }
    if (data.action == ACTIONS.JOIN) {
      let players = this.state.players.slice(0);
      players.push({
        id: data.id,
        name: data.name,
        admin: data.admin
      });
      this.setState({players: players});
    }
  }
  logEvent(event) {
    let index = null;
    if (event.id in this.eventHash) {
      index = this.eventHash[event.id];
    }
    if (index) {
      this.setState((state) => {
        let events = state.events.slice(0);
        events[index] = event;
        return {events: events};
      })
    }
    else {
      this.setState((state) => {
        let events = state.events.slice(0);
        if (events.length && event.date >= events[events.length -1].date) {
          events.push(event);
        }
        else {
          let i = events.length - 1;
          while(i > 0 && event.date < events[i-1].date) {
            i--;
          }
          events.splice(i, 0, event);
        }
        return {events: events};
      })
    }
  }
  handleLoad(players) {
    this.setState({players: players});
  }
  handleConnect(perform) {
    this.setState({perform: perform});
  }
  /* ---------- players ------------------------------------------------------*/
  updatePlayerHash(players) {
    let playerHash = {}
    for (let i=0; i < players.length; i++) {
      let player = players[i]
      playerHash[player.id] = player;
      if (player.me) {
        playerHash.me = player;
      }
    }
    this.playerHash = playerHash;
  }
  /* ---------- render -------------------------------------------------------*/
  render() {
    let result = null;
    if (this.props.go) {
      let gameType = GameTypes[this.props.game.type];
      if (gameType)
      {
        if (gameType.name == 'World of Adventure')
        {
          result = (
            <WorldOfAdventure options={this.props.options}
                              auth={this.props.auth}
                              game={this.props.game}
                              events={this.state.events}
                              players={this.state.players}
                              eventHash={this.eventHash}
                              playerHash={this.playerHash}
                              logEvent={this.logEvent.bind(this)}
                              processEvent={this.processEvent.bind(this)}
                              onLoad={this.handleLoad.bind(this)}
                              onConnect={this.handleConnect.bind(this)}
                              perform={this.state.perform}
                              onTalk={this.handleTalk.bind(this)}/>
          )
        }
        else if (gameType.name == 'Blades in the Dark')
        {
          result = (
            <BladesInTheDark  options={this.props.options}
                              auth={this.props.auth}
                              game={this.props.game}
                              events={this.state.events}
                              players={this.state.players}
                              eventHash={this.eventHash}
                              playerHash={this.playerHash}
                              logEvent={this.logEvent.bind(this)}
                              processEvent={this.processEvent.bind(this)}
                              onLoad={this.handleLoad.bind(this)}
                              onConnect={this.handleConnect.bind(this)}
                              perform={this.state.perform}
                              onTalk={this.handleTalk.bind(this)}/>
          )
        }
      }

    }
    return result
  }
}

export default GameStore;
