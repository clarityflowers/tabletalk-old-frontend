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
    // this.setState({players: this.props.game.players});

  }
  componentWillUpdate (nextProps, nextState) {
    if (this.state.players.length != nextState.players.length) {
      // this.updatePlayerHash(nextState.players);
    }
  }
  /* ---------- handlers -----------------------------------------------------*/
  handleTalk(message) {
    if (this.state.perform != null) {
      this.perform("talk", {message: message, request: 0});
    }
  }
  processEvent(data) {
    if (data.action == ACTIONS.TALK) {
      let chat = {
        id: data.id,
        action: ACTIONS.TALK,
        player: this.state.players[data.player],
        message: data.message,
        date: new Date(data.timestamp)
      }
      this.logEvent(chat)
    }
    if (data.action == ACTIONS.JOIN) {
      let players = Object.assign({}, this.state.players);
      players[data.id] = {
        id: data.id,
        name: data.name,
        admin: data.admin
      }
      this.setState({players: players});
    }
  }
  logEvent(event) {
    let index = null;
    if (event.id in this.eventHash) {
      index = this.eventHash[event.id];
    }
    if (index != null) {
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
          this.eventHash[event.id] = events.length -1;
        }
        else {
          let i = events.length - 1;
          while(i > 0 && event.date < events[i-1].date) {
            i--;
          }
          events.splice(i, 0, event);
          this.updateEventHash(events);
        }
        return {events: events};
      })
    }
  }
  handleLoad({players, me}) {
    const ids = Object.keys(players);
    let hash = {};
    for (let i=0; i < ids.length; i++) {
      const id = ids[i];
      hash[id] = players[id];
      if (id == me) {
        hash.me = players[id];
      }
    }
    this.setState({players: hash});
  }
  handleConnect(perform) {
    this.setState({perform: perform});
  }
  perform(action, data) {
    const key = Math.floor(Math.random() * (1000000000));
    data.key = key;
    this.state.perform(action, data);
    return key;
  }
  /* ---------- hash ---------------------------------------------------------*/
  updateEventHash(events) {
    let eventHash = {};
    for (let i=0; i < events.length; i++) {
      let event = events[i];
      eventHash[event.id] = i;
    }
    this.eventHash = eventHash;
  }
  /* ---------- render -------------------------------------------------------*/
  render() {
    let result = null;
    if (this.props.go) {
      let gameType = GameTypes[this.props.game.type];
      if (gameType)
      {
        let props = {
          options: this.props.options,
          route: this.props.route,
          auth: this.props.auth,
          game: this.props.game,
          events: this.state.events,
          players: this.state.players,
          eventHash: this.eventHash,
          perform: this.perform.bind(this),
          logEvent: this.logEvent.bind(this),
          processEvent: this.processEvent.bind(this),
          onLoad: this.handleLoad.bind(this),
          onConnect: this.handleConnect.bind(this),
          onTalk: this.handleTalk.bind(this)
        }
        if (gameType.name == 'World of Adventure')
        {
          result = (
            <WorldOfAdventure {...props}/>
          )
        }
        else if (gameType.name == 'Blades in the Dark')
        {
          result = (
            <BladesInTheDark  {...props}/>
          )
        }
      }

    }
    return result
  }
}

export default GameStore;
